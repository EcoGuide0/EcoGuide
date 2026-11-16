import {CROPS, MOQUEGUA_PROVINCES, SOILS} from '../data/moqueguaData';
import type {Lang, MonthlySimulationPoint, NasaClimateData, ProvinceKey, SimulationResult, SoilKey} from '../types/agro';

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Calcula evapotranspiración de referencia (ET0 en mm/día) usando
 * Hargreaves-Samani acoplado a radiación solar real NASA POWER (MJ/m²/día).
 */
function computeDailyEt0(tMean: number, tMin: number, tMax: number, solarMj: number): number {
  const deltaT = Math.max(2.0, tMax - tMin);
  // Conversión de radiación solar global (Rs) a equivalente evaporativo (1 MJ/m²/día ≈ 0.408 mm/día)
  const et0 = 0.0135 * (tMean + 17.78) * (solarMj * 0.408) * Math.pow(deltaT / 14, 0.22);
  return Math.min(8.2, Math.max(1.8, et0));
}

export function runAgronomicSimulation(params: {
  climate: NasaClimateData;
  provinceKey: ProvinceKey;
  currentCropKey: string;
  rotationCropKey: string;
  soilKey: SoilKey;
  areaHectares: number;
  lang: Lang;
}): SimulationResult {
  const {climate, provinceKey, currentCropKey, rotationCropKey, soilKey, areaHectares, lang} = params;
  const currentCrop = CROPS[currentCropKey] ?? CROPS.alfalfa;
  const rotationCrop = CROPS[rotationCropKey] ?? CROPS.quinua;
  const soil = SOILS[soilKey] ?? SOILS.franco;
  const province = MOQUEGUA_PROVINCES[provinceKey];

  const area = Math.min(50, Math.max(0.1, areaHectares));
  const irrigationEfficiency = soilKey === 'arenoso' ? 0.72 : 0.78;

  const monthlySeries: MonthlySimulationPoint[] = climate.monthly.map((m) => {
    const days = DAYS_IN_MONTH[m.monthIndex];
    const et0Day = computeDailyEt0(m.t2m, m.t2mMin, m.t2mMax, m.solarMj);
    const et0Mm = Number((et0Day * days).toFixed(1));

    // Coeficiente estacional Kc según fase aproximada en la provincia
    const curPhase = currentCrop.calendarByProvince[provinceKey][m.monthIndex];
    const rotPhase = rotationCrop.calendarByProvince[provinceKey][m.monthIndex];

    const phaseFactor = (phase: string, kcInit: number, kcMid: number) => {
      if (phase === 'peak') return kcMid;
      if (phase === 'sow') return kcInit;
      if (phase === 'harvest') return (kcInit + kcMid) * 0.52;
      return kcInit * 0.45;
    };

    const kcCur = phaseFactor(curPhase, currentCrop.kcInitial, currentCrop.kcMid);
    const kcRot = phaseFactor(rotPhase, rotationCrop.kcInitial, rotationCrop.kcMid);

    // Precipitación efectiva aproximada (75% útil en valles áridos)
    const pEff = m.precipMmMonth * 0.75;

    const netCurMm = Math.max(0, et0Mm * kcCur - pEff) / irrigationEfficiency;
    const netRotMm = Math.max(0, et0Mm * kcRot - pEff) / irrigationEfficiency;

    // 1 mm sobre 1 ha = 10 m³
    return {
      monthIndex: m.monthIndex,
      et0Mm,
      currentNeedMm: Number(netCurMm.toFixed(1)),
      rotationNeedMm: Number(netRotMm.toFixed(1)),
      currentNeedM3Ha: Math.round(netCurMm * 10),
      rotationNeedM3Ha: Math.round(netRotMm * 10),
    };
  });

  const annualCurM3Ha = monthlySeries.reduce((s, x) => s + x.currentNeedM3Ha, 0);
  const annualRotM3Ha = monthlySeries.reduce((s, x) => s + x.rotationNeedM3Ha, 0);
  const savedM3Ha = Math.max(0, annualCurM3Ha - annualRotM3Ha);
  const annualSavingsM3 = Math.round(savedM3Ha * area);
  const annualSavingsPercent =
    annualCurM3Ha > 0 ? Math.max(0, Math.min(72, Math.round((savedM3Ha / annualCurM3Ha) * 100))) : 0;

  // Demanda semanal promedio en campaña pico
  const peakCurMmDay = Math.max(...monthlySeries.map((x, idx) => x.currentNeedMm / DAYS_IN_MONTH[idx]));
  const peakRotMmDay = Math.max(...monthlySeries.map((x, idx) => x.rotationNeedMm / DAYS_IN_MONTH[idx]));

  const weeklyIrrigationCurrentM3 = Math.round(peakCurMmDay * 7 * 10 * area);
  const weeklyIrrigationRotationM3 = Math.round(peakRotMmDay * 7 * 10 * area);

  // Agua fácilmente aprovechable (RAW ≈ 45% de capacidad de agua disponible * profundidad radicular)
  const rawCurMm = soil.availableWaterMmPerM * currentCrop.rootDepthM * 0.45;
  const rawRotMm = soil.availableWaterMmPerM * rotationCrop.rootDepthM * 0.45;
  const irrigationIntervalCurrentDays = Math.max(2, Math.min(18, Math.round(rawCurMm / Math.max(1.5, peakCurMmDay))));
  const irrigationIntervalRotationDays = Math.max(3, Math.min(24, Math.round(rawRotMm / Math.max(1.5, peakRotMmDay))));

  // Índice de estrés hídrico + térmico basado en NASA POWER
  let risk = 32;
  if (climate.annual.precipMmYear < 120) risk += 22;
  else if (climate.annual.precipMmYear < 260) risk += 12;

  if (climate.annual.avgHumidity < 52) risk += 12;
  if (climate.annual.avgSoilWetness < 0.25) risk += 14;
  if (currentCrop.kcMid >= 0.85) risk += 12;
  risk += soil.stressPenalty;

  const riskScore = Math.min(96, Math.max(20, Math.round(risk)));
  const reductionFactor = Math.max(12, Math.round(annualSavingsPercent * 0.65 + (rotationCrop.nitrogenFixer ? 6 : 0)));
  const improvedRiskScore = Math.max(14, riskScore - reductionFactor);

  const riskLevel: SimulationResult['riskLevel'] =
    riskScore >= 72 ? 'high' : riskScore >= 46 ? 'moderate' : 'low';

  const thermalAlert: SimulationResult['thermalAlert'] =
    climate.annual.minTemp < 4.0 ? 'frost' : climate.annual.maxTemp > 29.0 ? 'heat' : 'none';

  const provName = province.title[lang];
  const curName = currentCrop.name[lang];
  const rotName = rotationCrop.name[lang];
  const soilName = soil.name[lang];

  const spokenDiagnosis =
    lang === 'es'
      ? `Diagnóstico satelital para ${provName}. Temperatura media ${climate.annual.avgTemp} grados, lluvia anual estimada ${climate.annual.precipMmYear} milímetros y humedad superficial del suelo ${(climate.annual.avgSoilWetness * 100).toFixed(0)} por ciento. Para tu parcela de ${area} hectáreas en suelo ${soilName}, mantener ${curName} requiere cerca de ${weeklyIrrigationCurrentM3} metros cúbicos por semana cada ${irrigationIntervalCurrentDays} días, con un índice de estrés hídrico de ${riskScore} por ciento. Al rotar o intercalar con ${rotName}, el estrés baja a ${improvedRiskScore} por ciento, el riego se espacia a cada ${irrigationIntervalRotationDays} días y ahorras aproximadamente ${annualSavingsM3} metros cúbicos al año, un ${annualSavingsPercent} por ciento menos de agua. Recomendación práctica: ${province.lowCostTip.es}`
      : `Satellite diagnosis for ${provName}. Mean temperature ${climate.annual.avgTemp} degrees Celsius, estimated annual rainfall ${climate.annual.precipMmYear} millimeters, and topsoil wetness ${(climate.annual.avgSoilWetness * 100).toFixed(0)} percent. For your ${area} hectare plot on ${soilName} soil, keeping ${curName} requires about ${weeklyIrrigationCurrentM3} cubic meters per week every ${irrigationIntervalCurrentDays} days, with a ${riskScore} percent water stress index. Rotating or intercropping with ${rotName} reduces stress to ${improvedRiskScore} percent, extends irrigation intervals to every ${irrigationIntervalRotationDays} days, and saves around ${annualSavingsM3} cubic meters per year, a ${annualSavingsPercent} percent water reduction. Field action: ${province.lowCostTip.en}`;

  return {
    riskScore,
    improvedRiskScore,
    riskLevel,
    thermalAlert,
    weeklyIrrigationCurrentM3,
    weeklyIrrigationRotationM3,
    irrigationIntervalCurrentDays,
    irrigationIntervalRotationDays,
    annualSavingsPercent,
    annualSavingsM3,
    monthlySeries,
    spokenDiagnosis,
  };
}
