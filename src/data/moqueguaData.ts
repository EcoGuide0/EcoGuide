import type {
  CalendarPhase,
  CrisisActionPlan,
  CropSpec,
  GalleryCropProfile,
  Lang,
  LocalizedText,
  MonthlyClimatePoint,
  NasaClimateData,
  OpenDataSourceItem,
  ProvinceInfo,
  ProvinceKey,
  SoilKey,
  SoilSpec,
  ValleyWaypoint,
} from '../types/agro';

export const MOQUEGUA_PROVINCES: Record<ProvinceKey, ProvinceInfo> = {
  mariscal_nieto: {
    key: 'mariscal_nieto',
    lat: -17.1934,
    lon: -70.9356,
    zoom: 10,
    shortName: 'Mariscal Nieto',
    districts: 'Moquegua · Samegua · Torata · Carumas',
    altitude: {
      es: '1,410 – 3,100 m s. n. m.',
      en: '1,410 – 3,100 m a.s.l.',
    },
    title: {
      es: 'Provincia de Mariscal Nieto',
      en: 'Mariscal Nieto Province',
    },
    stressLabel: {
      es: 'Alto (Déficit estacional de cuenca)',
      en: 'High (Seasonal basin deficit)',
    },
    crops: {
      es: 'Palto Hass y Fuerte, vid pisquera, orégano (Torata/Carumas), alfalfa y maíz amiláceo.',
      en: 'Hass & Fuerte avocado, grapes, oregano (Torata/Carumas), alfalfa, and starchy corn.',
    },
    elNinoImpact: {
      es: 'El calentamiento nocturno altera la acumulación de horas-frío en palto y reduce las lluvias estivales que recargan la represa Pasto Grande.',
      en: 'Nighttime warming disrupts avocado chilling hours and reduces summer rainfall feeding Pasto Grande reservoir.',
    },
    lowCostTip: {
      es: 'Aplica cobertura vegetal seca (mulching) de 8 cm alrededor del cuello del palto y riega por pulsos antes de las 7:00 a. m. para reducir evaporación hasta 35%.',
      en: 'Apply 8 cm of dry organic mulch around avocado trunks and pulse-irrigate before 7:00 AM to cut soil evaporation by up to 35%.',
    },
    polygon: [
      [-16.72, -71.15],
      [-16.68, -70.48],
      [-16.95, -70.25],
      [-17.36, -70.52],
      [-17.45, -71.05],
      [-17.18, -71.22],
    ],
  },
  ilo: {
    key: 'ilo',
    lat: -17.6112,
    lon: -71.2815,
    zoom: 11,
    shortName: 'Ilo',
    districts: 'Ilo · El Algarrobal · Pacocha',
    altitude: {
      es: '15 – 220 m s. n. m.',
      en: '15 – 220 m a.s.l.',
    },
    title: {
      es: 'Provincia de Ilo (El Algarrobal)',
      en: 'Ilo Province (El Algarrobal)',
    },
    stressLabel: {
      es: 'Muy Alto (Aridez costera y salinidad)',
      en: 'Very High (Coastal aridity & salinity)',
    },
    crops: {
      es: 'Olivo (aceituna de mesa), hortalizas costeras, sandía y frutales tolerantes a salinidad.',
      en: 'Table olives, coastal vegetables, watermelon, and salt-tolerant fruit crops.',
    },
    elNinoImpact: {
      es: 'El Niño Costero eleva la temperatura mínima invernal por encima de 15 °C, inhibiendo la inducción floral del olivo y acelerando la salinización del suelo.',
      en: 'Coastal El Niño keeps winter minimum temperatures above 15 °C, inhibiting olive flower induction and accelerating soil salinization.',
    },
    lowCostTip: {
      es: 'Realiza lavados ligeros de sales al amanecer en suelos arenosos e intercala leguminosas o cobertura viva para frenar la evaporación capilar.',
      en: 'Run light dawn salinity-leaching irrigations on sandy soils and intercrop hardy legumes to reduce capillary evaporation.',
    },
    polygon: [
      [-17.40, -71.44],
      [-17.39, -71.08],
      [-17.78, -71.10],
      [-17.76, -71.40],
    ],
  },
  sanchez_cerro: {
    key: 'sanchez_cerro',
    lat: -16.6736,
    lon: -70.9722,
    zoom: 10,
    shortName: 'Gral. Sánchez Cerro',
    districts: 'Omate · Puquina · Ubinas · Ichuña',
    altitude: {
      es: '2,160 – 3,850 m s. n. m.',
      en: '2,160 – 3,850 m a.s.l.',
    },
    title: {
      es: 'Gral. Sánchez Cerro (Omate)',
      en: 'Gral. Sánchez Cerro (Omate)',
    },
    stressLabel: {
      es: 'Moderado a Alto (Heladas y veranillos)',
      en: 'Moderate to High (Frost & dry spells)',
    },
    crops: {
      es: 'Tuna y cochinilla, palto de altura, lima/cítricos de Omate, papa nativa, quinua y haba.',
      en: 'Prickly pear & cochineal, highland avocado, Omate lime, native potato, quinoa, and fava beans.',
    },
    elNinoImpact: {
      es: 'Provoca veranillos secos entre enero y marzo seguidos de descensos bruscos bajo 2 °C entre mayo y agosto en Puquina, Ubinas e Ichuña.',
      en: 'Triggers dry spells between Jan–Mar followed by sharp drops below 2 °C from May–Aug in Puquina, Ubinas, and Ichuña.',
    },
    lowCostTip: {
      es: 'Rota papa o maíz con quinua o haba para fijar nitrógeno sin costo en fertilizantes, y usa riego de reserva nocturno ante alertas de helada.',
      en: 'Rotate potato or corn with quinoa or fava beans to fix free nitrogen, and use protective evening watering when frost alerts occur.',
    },
    polygon: [
      [-16.05, -71.25],
      [-16.08, -70.35],
      [-16.72, -70.42],
      [-16.82, -71.16],
    ],
  },
};

export const VALLEY_WAYPOINTS: ValleyWaypoint[] = [
  {
    id: 'moquegua_samegua',
    provinceKey: 'mariscal_nieto',
    name: 'Valle Moquegua / Samegua',
    lat: -17.1934,
    lon: -70.9356,
    altitudeM: 1410,
    note: {
      es: 'Zona frutícola principal de palto Hass y vid.',
      en: 'Core fruit belt for Hass avocado and table/pisco grapes.',
    },
  },
  {
    id: 'torata',
    provinceKey: 'mariscal_nieto',
    name: 'Torata',
    lat: -17.0764,
    lon: -70.8442,
    altitudeM: 2207,
    note: {
      es: 'Andenería de palto de altura, orégano y maíz.',
      en: 'Terraced highland valley with avocado, oregano, and corn.',
    },
  },
  {
    id: 'pasto_grande',
    provinceKey: 'mariscal_nieto',
    name: 'Cabecera Pasto Grande',
    lat: -16.745,
    lon: -70.265,
    altitudeM: 4540,
    note: {
      es: 'Fuente hídrica clave para el valle de Moquegua e Ilo.',
      en: 'Main highland reservoir feeding Moquegua and Ilo valleys.',
    },
  },
  {
    id: 'el_algarrobal',
    provinceKey: 'ilo',
    name: 'Valle El Algarrobal (Ilo)',
    lat: -17.6112,
    lon: -71.2815,
    altitudeM: 95,
    note: {
      es: 'Principal valle olivarero costero con suelos franco-arenosos.',
      en: 'Coastal olive valley with sandy soils and high salinity risk.',
    },
  },
  {
    id: 'omate',
    provinceKey: 'sanchez_cerro',
    name: 'Valle de Omate',
    lat: -16.6736,
    lon: -70.9722,
    altitudeM: 2166,
    note: {
      es: 'Microclima templado de frutales, palto, tuna y vid.',
      en: 'Temperate inter-Andean microclimate for avocado, lime, and prickly pear.',
    },
  },
  {
    id: 'puquina',
    provinceKey: 'sanchez_cerro',
    name: 'Puquina / La Capilla',
    lat: -16.625,
    lon: -71.186,
    altitudeM: 3120,
    note: {
      es: 'Zona altoandina de orégano, papa, haba y quinua.',
      en: 'High-Andean zone suited for oregano, potato, fava, and quinoa.',
    },
  },
];

export const CROPS: Record<string, CropSpec> = {
  alfalfa: {
    key: 'alfalfa',
    category: 'current',
    name: {es: 'Alfalfa (Alto consumo hídrico)', en: 'Alfalfa (High water demand)'},
    kcInitial: 0.45,
    kcMid: 0.98,
    rootDepthM: 1.1,
    frostToleranceC: -2,
    heatToleranceC: 33,
    nitrogenFixer: true,
    waterNote: {
      es: 'Demanda riego continuo todo el año; muy vulnerable a recortes en Pasto Grande.',
      en: 'Needs year-round irrigation; highly exposed to Pasto Grande allocation cuts.',
    },
    calendarByProvince: {
      mariscal_nieto: ['peak', 'peak', 'peak', 'peak', 'harvest', 'harvest', 'peak', 'peak', 'peak', 'peak', 'peak', 'peak'],
      ilo: ['peak', 'peak', 'peak', 'peak', 'peak', 'harvest', 'harvest', 'peak', 'peak', 'peak', 'peak', 'peak'],
      sanchez_cerro: ['sow', 'sow', 'peak', 'harvest', 'rest', 'rest', 'rest', 'sow', 'peak', 'peak', 'harvest', 'peak'],
    },
  },
  palto: {
    key: 'palto',
    category: 'current',
    name: {es: 'Palto Hass / Fuerte', en: 'Hass / Fuerte Avocado'},
    kcInitial: 0.6,
    kcMid: 0.85,
    rootDepthM: 0.8,
    frostToleranceC: 1,
    heatToleranceC: 31,
    waterNote: {
      es: 'Raíz superficial sensible a déficit en floración y cuajado (agosto–diciembre).',
      en: 'Shallow roots sensitive to drought during bloom & fruit set (Aug–Dec).',
    },
    calendarByProvince: {
      mariscal_nieto: ['peak', 'peak', 'harvest', 'harvest', 'harvest', 'rest', 'rest', 'peak', 'peak', 'peak', 'peak', 'peak'],
      ilo: ['peak', 'peak', 'harvest', 'harvest', 'rest', 'rest', 'peak', 'peak', 'peak', 'peak', 'peak', 'peak'],
      sanchez_cerro: ['peak', 'harvest', 'harvest', 'harvest', 'rest', 'rest', 'rest', 'sow', 'peak', 'peak', 'peak', 'peak'],
    },
  },
  maiz: {
    key: 'maiz',
    category: 'current',
    name: {es: 'Maíz amiláceo / chala', en: 'Starchy Corn / Fodder'},
    kcInitial: 0.4,
    kcMid: 1.08,
    rootDepthM: 0.9,
    frostToleranceC: 2,
    heatToleranceC: 34,
    waterNote: {
      es: 'Pico crítico en floración y llenado de grano; sufre pérdidas severas con estrés.',
      en: 'Sharp water peak during tasseling & grain fill; high yield loss under deficit.',
    },
    calendarByProvince: {
      mariscal_nieto: ['peak', 'peak', 'harvest', 'harvest', 'rest', 'rest', 'sow', 'sow', 'peak', 'peak', 'peak', 'peak'],
      ilo: ['peak', 'harvest', 'harvest', 'rest', 'rest', 'sow', 'sow', 'peak', 'peak', 'peak', 'harvest', 'rest'],
      sanchez_cerro: ['peak', 'peak', 'harvest', 'harvest', 'rest', 'rest', 'rest', 'sow', 'sow', 'peak', 'peak', 'peak'],
    },
  },
  olivo: {
    key: 'olivo',
    category: 'current',
    name: {es: 'Olivo (Valle de Ilo / Costa)', en: 'Olive (Ilo Coastal Valley)'},
    kcInitial: 0.5,
    kcMid: 0.65,
    rootDepthM: 1.2,
    frostToleranceC: -3,
    heatToleranceC: 36,
    waterNote: {
      es: 'Tolerante a sequía moderada, pero requiere control de salinidad y frío invernal.',
      en: 'Moderate drought tolerance, yet needs salinity flushing and winter chill.',
    },
    calendarByProvince: {
      mariscal_nieto: ['peak', 'peak', 'harvest', 'harvest', 'harvest', 'rest', 'rest', 'sow', 'peak', 'peak', 'peak', 'peak'],
      ilo: ['peak', 'peak', 'harvest', 'harvest', 'harvest', 'rest', 'rest', 'rest', 'peak', 'peak', 'peak', 'peak'],
      sanchez_cerro: ['peak', 'harvest', 'harvest', 'rest', 'rest', 'rest', 'rest', 'sow', 'peak', 'peak', 'peak', 'peak'],
    },
  },
  vid: {
    key: 'vid',
    category: 'current',
    name: {es: 'Vid pisquera / mesa', en: 'Pisco & Table Grapes'},
    kcInitial: 0.4,
    kcMid: 0.72,
    rootDepthM: 1.3,
    frostToleranceC: -1,
    heatToleranceC: 35,
    waterNote: {
      es: 'Admite riego deficitario controlado post-envero para concentrar grados Brix.',
      en: 'Supports regulated deficit irrigation after veraison to concentrate sugars.',
    },
    calendarByProvince: {
      mariscal_nieto: ['harvest', 'harvest', 'harvest', 'rest', 'rest', 'rest', 'sow', 'peak', 'peak', 'peak', 'peak', 'harvest'],
      ilo: ['harvest', 'harvest', 'rest', 'rest', 'rest', 'sow', 'peak', 'peak', 'peak', 'peak', 'harvest', 'harvest'],
      sanchez_cerro: ['harvest', 'harvest', 'harvest', 'rest', 'rest', 'rest', 'rest', 'sow', 'peak', 'peak', 'peak', 'peak'],
    },
  },
  quinua: {
    key: 'quinua',
    category: 'rotation',
    name: {es: 'Quinua / Kiwicha (Resiliente)', en: 'Quinoa / Kiwicha (Drought-Resilient)'},
    kcInitial: 0.35,
    kcMid: 0.56,
    rootDepthM: 0.9,
    frostToleranceC: -4,
    heatToleranceC: 32,
    waterNote: {
      es: 'Consume 35–45% menos agua que maíz o alfalfa y tolera heladas y suelos salinos.',
      en: 'Uses 35–45% less water than corn/alfalfa and tolerates frost and salinity.',
    },
    calendarByProvince: {
      mariscal_nieto: ['peak', 'harvest', 'harvest', 'rest', 'rest', 'sow', 'sow', 'peak', 'peak', 'harvest', 'rest', 'sow'],
      ilo: ['harvest', 'rest', 'sow', 'sow', 'peak', 'peak', 'harvest', 'harvest', 'rest', 'sow', 'peak', 'peak'],
      sanchez_cerro: ['peak', 'peak', 'harvest', 'harvest', 'rest', 'rest', 'rest', 'rest', 'sow', 'sow', 'peak', 'peak'],
    },
  },
  frijol: {
    key: 'frijol',
    category: 'rotation',
    name: {es: 'Frijol / Haba (Fija nitrógeno)', en: 'Beans / Fava (Nitrogen-Fixing)'},
    kcInitial: 0.4,
    kcMid: 0.62,
    rootDepthM: 0.7,
    frostToleranceC: -1,
    heatToleranceC: 30,
    nitrogenFixer: true,
    waterNote: {
      es: 'Ciclo corto (90–120 días) que aporta 40–70 kg/ha de nitrógeno natural al siguiente cultivo.',
      en: 'Short 90–120 day cycle adding 40–70 kg/ha natural nitrogen for the next crop.',
    },
    calendarByProvince: {
      mariscal_nieto: ['harvest', 'rest', 'sow', 'sow', 'peak', 'harvest', 'rest', 'sow', 'sow', 'peak', 'harvest', 'rest'],
      ilo: ['rest', 'sow', 'sow', 'peak', 'peak', 'harvest', 'rest', 'sow', 'peak', 'harvest', 'rest', 'rest'],
      sanchez_cerro: ['peak', 'harvest', 'harvest', 'rest', 'rest', 'rest', 'rest', 'sow', 'sow', 'peak', 'peak', 'harvest'],
    },
  },
  tuna: {
    key: 'tuna',
    category: 'rotation',
    name: {es: 'Tuna / Cochinilla / Pitahaya', en: 'Prickly Pear / Pitahaya'},
    kcInitial: 0.25,
    kcMid: 0.36,
    rootDepthM: 0.6,
    frostToleranceC: -2,
    heatToleranceC: 38,
    waterNote: {
      es: 'Metabolismo CAM: abre estomas de noche y reduce la demanda hídrica hasta en 60%.',
      en: 'CAM photosynthesis: opens stomata at night, cutting irrigation demand by up to 60%.',
    },
    calendarByProvince: {
      mariscal_nieto: ['harvest', 'harvest', 'harvest', 'rest', 'rest', 'sow', 'sow', 'peak', 'peak', 'peak', 'harvest', 'harvest'],
      ilo: ['harvest', 'harvest', 'rest', 'sow', 'sow', 'peak', 'peak', 'peak', 'harvest', 'harvest', 'harvest', 'rest'],
      sanchez_cerro: ['harvest', 'harvest', 'harvest', 'harvest', 'rest', 'rest', 'rest', 'sow', 'sow', 'peak', 'peak', 'harvest'],
    },
  },
  oregano: {
    key: 'oregano',
    category: 'rotation',
    name: {es: 'Orégano de altura (Torata / Omate)', en: 'Highland Oregano (Torata / Omate)'},
    kcInitial: 0.35,
    kcMid: 0.54,
    rootDepthM: 0.55,
    frostToleranceC: -3,
    heatToleranceC: 33,
    waterNote: {
      es: 'Cultivo comercial de alto valor en Moquegua con riegos espaciados y alta tolerancia seca.',
      en: 'High-value regional cash crop in Moquegua with wide irrigation intervals and drought resilience.',
    },
    calendarByProvince: {
      mariscal_nieto: ['peak', 'harvest', 'harvest', 'sow', 'sow', 'peak', 'harvest', 'harvest', 'sow', 'peak', 'peak', 'harvest'],
      ilo: ['harvest', 'rest', 'sow', 'sow', 'peak', 'harvest', 'harvest', 'sow', 'peak', 'harvest', 'rest', 'rest'],
      sanchez_cerro: ['peak', 'harvest', 'harvest', 'sow', 'rest', 'rest', 'rest', 'sow', 'peak', 'peak', 'harvest', 'harvest'],
    },
  },
};

export const SOILS: Record<SoilKey, SoilSpec> = {
  franco: {
    key: 'franco',
    name: {es: 'Franco (Valle medio · equilibrado)', en: 'Loam (Mid-valley · balanced)'},
    availableWaterMmPerM: 145,
    infiltrationNote: {
      es: 'Buena retención de humedad y aireación radicular.',
      en: 'Balanced moisture retention and root aeration.',
    },
    stressPenalty: 0,
  },
  arenoso: {
    key: 'arenoso',
    name: {es: 'Arenoso (Costa / Ilo · drenaje rápido)', en: 'Sandy (Coast / Ilo · fast drainage)'},
    availableWaterMmPerM: 75,
    infiltrationNote: {
      es: 'Pierde agua rápido por percolación; exige riegos más cortos y frecuentes.',
      en: 'Drains rapidly; requires shorter, more frequent irrigation pulses.',
    },
    stressPenalty: 12,
  },
  arcilloso: {
    key: 'arcilloso',
    name: {es: 'Arcilloso / Pedregoso (Zona alta)', en: 'Clay / Rocky (Highland terraces)'},
    availableWaterMmPerM: 125,
    infiltrationNote: {
      es: 'Retiene humedad pero se compacta; evitar encharcamiento en raíces.',
      en: 'Holds moisture well but compacts easily; avoid root waterlogging.',
    },
    stressPenalty: 5,
  },
};

export function getCalendarCellJustification(params: {
  crop: CropSpec;
  provinceKey: ProvinceKey;
  monthIndex: number;
  phase: CalendarPhase;
  climatePoint: MonthlyClimatePoint | undefined;
  lang: Lang;
}): string {
  const {crop, provinceKey, monthIndex, phase, climatePoint, lang} = params;
  const prov = MOQUEGUA_PROVINCES[provinceKey];
  const tMin = climatePoint ? climatePoint.t2mMin.toFixed(1) : '10.0';
  const tMax = climatePoint ? climatePoint.t2mMax.toFixed(1) : '24.0';
  const rain = climatePoint ? climatePoint.precipMmMonth.toFixed(1) : '8.0';
  const solar = climatePoint ? climatePoint.solarKwh.toFixed(1) : '6.0';
  const gwet = climatePoint ? (climatePoint.soilWetness * 100).toFixed(0) : '25';
  const cropShort = crop.name[lang].split('(')[0].trim();

  if (lang === 'es') {
    if (phase === 'peak') {
      return `Riego Crítico (Rojo) para ${cropShort} en ${prov.shortName}: la radiación solar alcanza ${solar} kWh/m²/día con máxima de ${tMax} °C y lluvia de apenas ${rain} mm/mes (humedad de suelo ${gwet}%). Coincide con la etapa de mayor demanda hídrica (Kc ${crop.kcMid.toFixed(2)}: floración o llenado), por lo que un déficit aquí reduce directamente la producción.`;
    }
    if (phase === 'sow') {
      return `Ventana de Siembra / Brotación (Amarillo) para ${cropShort} en ${prov.shortName}: la temperatura mínima mensual (${tMin} °C) y la radiación (${solar} kWh/m²) favorecen germinación o establecimiento radicular sin estrés extremo, aprovechando suelo mullido y humedad inicial de ${gwet}%.`;
    }
    if (phase === 'harvest') {
      return `Cosecha (Verde) para ${cropShort} en ${prov.shortName}: madurez fisiológica con menor exigencia de agua (${rain} mm de lluvia natural y mínima de ${tMin} °C), ideal para concentrar calidad, reducir láminas de riego previas al corte y recolectar sin exceso de humedad.`;
    }
    return `Descanso / Rotación (Blanco) para ${cropShort} en ${prov.shortName}: periodo de menor temperatura mínima (${tMin} °C) o pausa post-cosecha. Conviene incorporar rastrojo o rotar con leguminosas/quinua para recuperar nitrógeno y estructura del suelo antes de la próxima campaña.`;
  }

  if (phase === 'peak') {
    return `Critical Irrigation (Red) for ${cropShort} in ${prov.shortName}: solar radiation reaches ${solar} kWh/m²/day with ${tMax} °C daytime highs and only ${rain} mm/month rainfall (topsoil moisture ${gwet}%). This aligns with peak water demand (Kc ${crop.kcMid.toFixed(2)}: flowering or fruit fill), where deficit causes immediate yield loss.`;
  }
  if (phase === 'sow') {
    return `Sowing / Sprouting Window (Yellow) for ${cropShort} in ${prov.shortName}: monthly low (${tMin} °C) and irradiance (${solar} kWh/m²) support emergence and root establishment without severe heat or frost shock, leveraging ${gwet}% topsoil moisture.`;
  }
  if (phase === 'harvest') {
    return `Harvest Window (Green) for ${cropShort} in ${prov.shortName}: physiological maturity with reduced irrigation pressure (${rain} mm rain, ${tMin} °C low), ideal for dry-down quality and cutting water before picking.`;
  }
  return `Rest / Rotation (White) for ${cropShort} in ${prov.shortName}: cooler period (${tMin} °C low) or post-harvest pause. Best used to incorporate mulch or rotate with nitrogen-fixing legumes/quinoa to rebuild soil fertility.`;
}

function buildBaselineMonthly(
  tBase: number,
  tAmp: number,
  precipPeak: number,
  rhBase: number,
  solarBase: number,
  soilBase: number
): MonthlyClimatePoint[] {
  const weights = [1.0, 1.0, 0.85, 0.3, 0.1, 0.05, 0.05, 0.1, 0.15, 0.25, 0.4, 0.75];
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return Array.from({length: 12}, (_, m) => {
    const seasonal = Math.cos(((m - 1) / 12) * 2 * Math.PI);
    const t2m = Number((tBase + seasonal * tAmp).toFixed(1));
    const t2mMin = Number((t2m - (5.8 + (1 - rhBase / 100) * 4)).toFixed(1));
    const t2mMax = Number((t2m + (6.8 + (1 - rhBase / 100) * 3.5)).toFixed(1));
    const precipMmDay = Number((precipPeak * weights[m]).toFixed(2));
    const precipMmMonth = Number((precipMmDay * days[m]).toFixed(1));
    const rh2m = Number(Math.min(88, Math.max(25, rhBase + seasonal * 8)).toFixed(1));
    const solarMj = Number((solarBase + seasonal * 3.6).toFixed(2));
    const solarKwh = Number((solarMj / 3.6).toFixed(2));
    const soilWetness = Number(Math.min(0.65, Math.max(0.1, soilBase + weights[m] * 0.16)).toFixed(2));
    return {
      monthIndex: m,
      t2m,
      t2mMin,
      t2mMax,
      precipMmDay,
      precipMmMonth,
      rh2m,
      solarMj,
      solarKwh,
      soilWetness,
    };
  });
}

export const OFFLINE_PROVINCE_BASELINES: Record<ProvinceKey, NasaClimateData> = {
  mariscal_nieto: (() => {
    const monthly = buildBaselineMonthly(16.8, 2.4, 1.1, 49, 22.8, 0.2);
    return {
      lat: -17.1934,
      lon: -70.9356,
      yearLabel: '2025 (Offline)',
      fetchedAt: 'Baseline',
      source: 'baseline',
      annual: {
        avgTemp: 16.8,
        minTemp: 10.2,
        maxTemp: 24.4,
        precipMmDay: 0.45,
        precipMmYear: 164,
        avgHumidity: 49,
        avgSolarMj: 22.8,
        avgSolarKwh: 6.3,
        avgSoilWetness: 0.26,
      },
      monthly,
    };
  })(),
  ilo: (() => {
    const monthly = buildBaselineMonthly(19.6, 3.3, 0.18, 72, 20.4, 0.14);
    return {
      lat: -17.6112,
      lon: -71.2815,
      yearLabel: '2025 (Offline)',
      fetchedAt: 'Baseline',
      source: 'baseline',
      annual: {
        avgTemp: 19.6,
        minTemp: 15.1,
        maxTemp: 25.0,
        precipMmDay: 0.07,
        precipMmYear: 26,
        avgHumidity: 72,
        avgSolarMj: 20.4,
        avgSolarKwh: 5.7,
        avgSoilWetness: 0.18,
      },
      monthly,
    };
  })(),
  sanchez_cerro: (() => {
    const monthly = buildBaselineMonthly(13.2, 2.9, 2.2, 46, 23.4, 0.25);
    return {
      lat: -16.6736,
      lon: -70.9722,
      yearLabel: '2025 (Offline)',
      fetchedAt: 'Baseline',
      source: 'baseline',
      annual: {
        avgTemp: 13.2,
        minTemp: 5.1,
        maxTemp: 21.4,
        precipMmDay: 0.9,
        precipMmYear: 328,
        avgHumidity: 46,
        avgSolarMj: 23.4,
        avgSolarKwh: 6.5,
        avgSoilWetness: 0.31,
      },
      monthly,
    };
  })(),
};

export const GALLERY_CROPS: GalleryCropProfile[] = [
  {
    id: 'palto_hass',
    name: {es: 'Palto Hass y Fuerte', en: 'Hass & Fuerte Avocado'},
    province: {es: 'Mariscal Nieto · Omate', en: 'Mariscal Nieto · Omate'},
    altitude: '1,200 – 2,300 m',
    idealPh: '6.0 – 7.0',
    waterDemand: {es: 'Media-Alta (sensible en floración)', en: 'Medium-High (bloom-sensitive)'},
    bestSeason: {es: 'Floración: Ago–Nov · Cosecha: Mar–May', en: 'Bloom: Aug–Nov · Harvest: Mar–May'},
    summary: {
      es: 'Principal cultivo agroexportador de Moquegua. Requiere suelos aireados sin encharcamiento ni exceso de sales.',
      en: 'Moquegua’s flagship export fruit. Needs well-aerated soils free of waterlogging and excess salts.',
    },
  },
  {
    id: 'olivo_ilo',
    name: {es: 'Olivo de Mesa (Sevillana)', en: 'Coastal Table Olive'},
    province: {es: 'Ilo (El Algarrobal)', en: 'Ilo (El Algarrobal)'},
    altitude: '15 – 350 m',
    idealPh: '6.5 – 8.0',
    waterDemand: {es: 'Baja-Media (tolerante a aridez)', en: 'Low-Medium (drought tolerant)'},
    bestSeason: {es: 'Reposo frío: Jun–Ago · Cosecha: Mar–May', en: 'Chill rest: Jun–Aug · Harvest: Mar–May'},
    summary: {
      es: 'Símbolo del valle de Ilo. Tolera suelos ligeramente alcalinos y salinos, pero depende de noches frescas en invierno para florecer.',
      en: 'Signature Ilo valley crop. Tolerates mildly alkaline and saline soils, yet needs cool winter nights to trigger bloom.',
    },
  },
  {
    id: 'oregano_torata',
    name: {es: 'Orégano de Altura', en: 'Highland Oregano'},
    province: {es: 'Torata · Carumas · Puquina', en: 'Torata · Carumas · Puquina'},
    altitude: '2,100 – 3,300 m',
    idealPh: '6.2 – 7.8',
    waterDemand: {es: 'Baja (riego espaciado)', en: 'Low (spaced irrigation)'},
    bestSeason: {es: 'Siembra: Abr–May / Sep · 2–3 cortes/año', en: 'Sow: Apr–May / Sep · 2–3 cuts/year'},
    summary: {
      es: 'Aromática de alta rentabilidad por metro cúbico de agua invertido; muy resistente a veranillos secos andinos.',
      en: 'High economic return per cubic meter of water; resilient to dry Andean spells.',
    },
  },
  {
    id: 'quinua_resiliente',
    name: {es: 'Quinua y Kiwicha', en: 'Quinoa & Kiwicha'},
    province: {es: 'Gral. Sánchez Cerro · Torata', en: 'Gral. Sánchez Cerro · Torata'},
    altitude: '1,800 – 3,800 m',
    idealPh: '5.5 – 8.2',
    waterDemand: {es: 'Muy Baja (ahorra hasta 45% de agua)', en: 'Very Low (saves up to 45% water)'},
    bestSeason: {es: 'Siembra: Sep–Oct · Cosecha: Feb–Abr', en: 'Sow: Sep–Oct · Harvest: Feb–Apr'},
    summary: {
      es: 'Grano andino campeón de resiliencia: soporta suelos salinos, heladas ligeras y sequías prolongadas.',
      en: 'Resilience champion among Andean grains: handles salinity, mild frost, and prolonged dry spells.',
    },
  },
  {
    id: 'vid_moquegua',
    name: {es: 'Vid Pisquera y de Mesa', en: 'Pisco & Table Grapes'},
    province: {es: 'Mariscal Nieto · Omate', en: 'Mariscal Nieto · Omate'},
    altitude: '1,100 – 2,200 m',
    idealPh: '6.0 – 7.5',
    waterDemand: {es: 'Media (tolera déficit controlado)', en: 'Medium (controlled deficit tolerant)'},
    bestSeason: {es: 'Brotación: Ago–Sep · Vendimia: Ene–Mar', en: 'Budbreak: Aug–Sep · Harvest: Jan–Mar'},
    summary: {
      es: 'Aprovecha la altísima radiación solar de Moquegua para lograr mostos dulces con menor consumo hídrico que la alfalfa.',
      en: 'Converts Moquegua’s intense solar radiation into high-sugar grapes using far less water than alfalfa.',
    },
  },
  {
    id: 'tuna_cochinilla',
    name: {es: 'Tuna y Pitahaya (CAM)', en: 'Prickly Pear & Pitahaya'},
    province: {es: 'Omate · Samegua · Laderas secas', en: 'Omate · Samegua · Dry slopes'},
    altitude: '400 – 2,600 m',
    idealPh: '6.0 – 8.0',
    waterDemand: {es: 'Extrema eficiencia (hasta −60% agua)', en: 'Extreme efficiency (up to −60% water)'},
    bestSeason: {es: 'Cosecha principal: Dic–Abr', en: 'Main harvest: Dec–Apr'},
    summary: {
      es: 'Ideal para laderas con poca dotación de riego; abre sus poros de noche para evitar perder agua bajo el sol.',
      en: 'Ideal for water-scarce slopes; opens leaf pores at night to prevent daytime water loss.',
    },
  },
];

export const MOQUEGUA_SEASONS: {id: string; name: LocalizedText; months: string; desc: LocalizedText}[] = [
  {
    id: 'summer',
    name: {es: 'Verano Húmedo (Lluvias en sierra)', en: 'Wet Summer (Highland Rains)'},
    months: 'Ene – Mar / Jan – Mar',
    desc: {
      es: 'Máxima radiación solar y lluvias estivales en cuenca alta. Vendimia de vid, cosecha de tuna y llenado de grano.',
      en: 'Peak solar irradiance and upper-watershed rains. Grape harvest, prickly pear picking, and grain filling.',
    },
  },
  {
    id: 'autumn',
    name: {es: 'Otoño Templado (Cosecha Frutícola)', en: 'Mild Autumn (Fruit Harvest)'},
    months: 'Abr – Jun / Apr – Jun',
    desc: {
      es: 'Clima seco y estable en valle medio y costa. Cosecha fuerte de palto Hass y aceituna en Ilo; siembra de orégano y haba.',
      en: 'Dry, steady weather in mid-valleys and coast. Peak Hass avocado and Ilo olive harvest; oregano & fava sowing.',
    },
  },
  {
    id: 'winter',
    name: {es: 'Invierno Seco y Frío (Heladas)', en: 'Dry Cool Winter (Frost Risk)'},
    months: 'Jul – Ago / Jul – Aug',
    desc: {
      es: 'Noches frías necesarias para el olivo en Ilo, pero riesgo de heladas bajo 2 °C en Puquina/Ubinas. Época de descanso y abonado.',
      en: 'Cool nights vital for Ilo olive flowering, yet frost risk below 2 °C in Puquina/Ubinas. Ideal for soil rest & composting.',
    },
  },
  {
    id: 'spring',
    name: {es: 'Primavera de Floración y Demanda', en: 'Spring Bloom & High Water Demand'},
    months: 'Sep – Dic / Sep – Dec',
    desc: {
      es: 'Sube la temperatura sin lluvias aún. Floración crítica de palto, vid y siembra grande de quinua y maíz. Máxima vigilancia del riego.',
      en: 'Temperatures rise before rains arrive. Critical avocado/grape bloom and main quinoa/corn sowing. Peak irrigation watch.',
    },
  },
];

export const CRISIS_BY_PROVINCE: Record<
  ProvinceKey,
  {
    headline: LocalizedText;
    plainSummary: LocalizedText;
    symptoms: LocalizedText[];
    glossary: {term: LocalizedText; meaning: LocalizedText}[];
    phases: CrisisActionPlan[];
  }
> = {
  mariscal_nieto: {
    headline: {
      es: 'Alerta El Niño en Mariscal Nieto: menos agua en Pasto Grande y calor en floración',
      en: 'El Niño Alert in Mariscal Nieto: lower Pasto Grande recharge & bloom heat stress',
    },
    plainSummary: {
      es: 'Cuando el océano Pacífico se calienta (El Niño), suelen disminuir las lluvias de verano en la parte alta de Moquegua. Eso deja menos agua guardada en la represa Pasto Grande para los meses secos, mientras el aire más tibio seca más rápido la tierra de tus paltos y vides.',
      en: 'When the Pacific warms (El Niño), summer rains in upper Moquegua often shrink. Less water reaches Pasto Grande Reservoir for dry months, while warmer air dries avocado and grape soils faster.',
    },
    symptoms: [
      {
        es: 'Caída prematura de flores y frutos pequeños de palto por noches cálidas y aire muy seco.',
        en: 'Early flower and young avocado drop driven by warm nights and dry valley air.',
      },
      {
        es: 'Turnos de riego más espaciados por recorte de caudal desde Pasto Grande entre agosto y diciembre.',
        en: 'Longer waits between irrigation turns as Pasto Grande allocations tighten from August to December.',
      },
      {
        es: 'Posibles lluvias cortas e intensas fuera de temporada (como las observadas por NASA GPM en el sur en 2026) que arrastran sedimentos en canales.',
        en: 'Sudden out-of-season cloudbursts (tracked by NASA GPM in southern latitudes in 2026) washing sediment into canals.',
      },
    ],
    glossary: [
      {
        term: {es: 'Evapotranspiración (ET)', en: 'Evapotranspiration (ET)'},
        meaning: {
          es: 'Es toda el agua que pierde tu chacra sumando la que se evapora del suelo y la que "transpiran" las hojas bajo el sol.',
          en: 'Total water leaving your plot through soil evaporation plus leaf transpiration under sunlight.',
        },
      },
      {
        term: {es: 'Mulching (Cobertura seca)', en: 'Organic Mulching'},
        meaning: {
          es: 'Cubrir el pie del árbol con paja, hojas secas o rastrojo picado para darle sombra a la tierra y guardar humedad.',
          en: 'Covering soil around tree trunks with dry straw or leaf litter to shade roots and lock in moisture.',
        },
      },
    ],
    phases: [
      {
        phase: {es: 'Antes del golpe seco', en: 'Before the dry peak'},
        items: [
          {
            es: 'Limpia canales y acequias, y coloca 8 cm de cobertura seca (mulching) bajo la copa del palto.',
            en: 'Clear irrigation canals and spread 8 cm of dry mulch beneath avocado canopies.',
          },
          {
            es: 'Cambia parte del área de alfalfa o maíz de alta demanda hacia orégano o quinua.',
            en: 'Shift part of high-demand alfalfa or corn acreage toward oregano or quinoa.',
          },
        ],
      },
      {
        phase: {es: 'Durante el estrés', en: 'During active stress'},
        items: [
          {
            es: 'Riega antes de las 7:00 a. m. o al caer la tarde para evitar que el sol evapore hasta un tercio del agua.',
            en: 'Irrigate before 7:00 AM or at dusk so midday sun does not evaporate up to a third of your water.',
          },
          {
            es: 'Prioriza el agua disponible en frutales en floración antes que en pastos de corte.',
            en: 'Prioritize available water for flowering fruit trees ahead of fodder grasses.',
          },
        ],
      },
      {
        phase: {es: 'Después / Recuperación', en: 'After / Recovery'},
        items: [
          {
            es: 'Incorpora compost o estiércol maduro para devolver esponjosidad y retención de agua al suelo.',
            en: 'Mix in mature compost or manure to restore soil porosity and water-holding capacity.',
          },
        ],
      },
    ],
  },
  ilo: {
    headline: {
      es: 'Alerta El Niño Costero en Ilo: invierno sin frío para el olivo y sales en el suelo',
      en: 'Coastal El Niño Alert in Ilo: lack of winter chill for olives & salt buildup',
    },
    plainSummary: {
      es: 'En la costa de Ilo (El Algarrobal), El Niño calienta directamente el aire nocturno del invierno. El olivo necesita pasar horas de frío para producir flores; si no enfría lo suficiente, da poca aceituna y el suelo arenoso acumula más sales al evaporarse el agua.',
      en: 'On the Ilo coast (El Algarrobal), El Niño warms winter nights directly. Olive trees require cool hours to set flowers; without enough chill, yields drop and sandy soils accumulate salts as water evaporates.',
    },
    symptoms: [
      {
        es: 'Baja floración en olivo cuando la temperatura mínima invernal no baja de 14–15 °C.',
        en: 'Weak olive flowering when winter night lows fail to drop below 14–15 °C.',
      },
      {
        es: 'Aumento de costras blanquecinas de sal en surcos arenosos por evaporación rápida.',
        en: 'White salt crusts forming in sandy furrows due to accelerated evaporation.',
      },
    ],
    glossary: [
      {
        term: {es: 'Horas-frío', en: 'Chilling hours'},
        meaning: {
          es: 'Cantidad de horas frescas en invierno que el olivo o frutales necesitan para "despertar" y florecer bien en primavera.',
          en: 'Cumulative cool winter hours that olive and fruit trees need to break dormancy and bloom evenly.',
        },
      },
      {
        term: {es: 'Lavado de sales', en: 'Salinity leaching'},
        meaning: {
          es: 'Aplicar un riego lento al amanecer para empujar las sales acumuladas debajo de donde crecen las raíces.',
          en: 'Applying a slow dawn irrigation to push accumulated salts below the active root zone.',
        },
      },
    ],
    phases: [
      {
        phase: {es: 'Antes del evento', en: 'Before onset'},
        items: [
          {
            es: 'Incorpora materia orgánica y yeso agrícola si el suelo muestra costras salinas.',
            en: 'Add organic matter and agricultural gypsum where white salt crusts appear.',
          },
          {
            es: 'Poda ligeramente para ventilar copas sin exponer troncos al sol fuerte.',
            en: 'Prune lightly to improve canopy airflow without exposing bark to harsh sunburn.',
          },
        ],
      },
      {
        phase: {es: 'Durante el calentamiento', en: 'During warming'},
        items: [
          {
            es: 'Aplica riegos más cortos pero frecuentes en suelo arenoso para no perder agua en profundidad.',
            en: 'Use shorter, more frequent irrigations on sandy ground to prevent deep percolation loss.',
          },
          {
            es: 'Intercala cobertura viva o frijol tolerante entre hileras para dar sombra al suelo.',
            en: 'Intercrop hardy groundcover or beans between rows to shade exposed sand.',
          },
        ],
      },
      {
        phase: {es: 'Después / Ajuste', en: 'After / Adjustment'},
        items: [
          {
            es: 'Mide pH y conductividad eléctrica en laboratorio local (INIA) antes de fertilizar.',
            en: 'Check soil pH and salinity via local INIA testing before applying fertilizers.',
          },
        ],
      },
    ],
  },
  sanchez_cerro: {
    headline: {
      es: 'Alerta El Niño en Gral. Sánchez Cerro: veranillos secos y heladas repentinas',
      en: 'El Niño Alert in Gral. Sánchez Cerro: mid-rain dry spells & sudden frosts',
    },
    plainSummary: {
      es: 'En las zonas altas y valles de Omate, Puquina y Ubinas, El Niño desordena las lluvias de verano: puede dejar semanas secas en plena campaña ("veranillos") y luego noches despejadas muy heladas que queman brotes de papa, maíz o palto.',
      en: 'Across Omate, Puquina, and Ubinas, El Niño disrupts summer rains: leaving multi-week dry spells mid-season followed by clear, freezing nights that scorch young potato, corn, or avocado shoots.',
    },
    symptoms: [
      {
        es: 'Veranillos secos de 2 a 4 semanas en enero–marzo seguidos de lluvias intensas que erosionan andenes.',
        en: '2–4 week dry spells in Jan–Mar followed by heavy bursts that erode stone terraces.',
      },
      {
        es: 'Heladas nocturnas bajo 2 °C entre mayo y agosto en distritos altos como Puquina e Ichuña.',
        en: 'Nighttime frosts below 2 °C between May and August in high districts like Puquina and Ichuña.',
      },
    ],
    glossary: [
      {
        term: {es: 'Veranillo', en: 'Mid-season dry spell'},
        meaning: {
          es: 'Pausa inesperada de varios días o semanas sin lluvia y con sol fuerte en plena temporada húmeda.',
          en: 'Unexpected multi-week gap of dry, sunny weather right inside the rainy season.',
        },
      },
      {
        term: {es: 'Riego antihelada', en: 'Frost-buffer watering'},
        meaning: {
          es: 'Humedecer el suelo al caer la tarde antes de una noche helada; el agua guarda calor y frena el enfriamiento brusco.',
          en: 'Moistening soil in late afternoon before a frost; damp soil releases heat slowly overnight.',
        },
      },
    ],
    phases: [
      {
        phase: {es: 'Antes de campaña', en: 'Before planting'},
        items: [
          {
            es: 'Escoge variedades rústicas de quinua, haba u orégano en parcelas expuestas a heladas.',
            en: 'Choose hardy quinoa, fava bean, or oregano on frost-exposed terraces.',
          },
          {
            es: 'Revisa reservorios comunales o qochas de arcilla antes de diciembre.',
            en: 'Inspect community micro-reservoirs and clay ponds before December.',
          },
        ],
      },
      {
        phase: {es: 'Durante veranillo / helada', en: 'During dry spell / frost'},
        items: [
          {
            es: 'Aplica riego ligero vespertino cuando SENAMHI o NASA indiquen mínimas cercanas a 3 °C.',
            en: 'Apply a light evening watering when SENAMHI or NASA lows approach 3 °C.',
          },
          {
            es: 'Mantén cobertura de piedra o rastrojo en bordes de andén para frenar escorrentía.',
            en: 'Keep stone edging and crop residue on terrace borders to slow storm runoff.',
          },
        ],
      },
      {
        phase: {es: 'Después / Suelo', en: 'After / Soil care'},
        items: [
          {
            es: 'Rota con haba o tarwi para reponer nitrógeno sin costo químico.',
            en: 'Rotate with fava beans or lupin to replenish soil nitrogen naturally.',
          },
        ],
      },
    ],
  },
};

export const OPEN_DATA_SOURCES: OpenDataSourceItem[] = [
  {
    id: 'gpm_rain',
    imageKey: 'satellite',
    gap: {
      es: 'Lluvias intensas cada 30 min en cabeceras de cuenca (> 4,200 m) y monitoreo en tiempo casi real de El Niño 2026–27.',
      en: '30-minute heavy rainfall tracking in upper watersheds (> 4,200 m) and near-real-time 2026–27 El Niño monitoring.',
    },
    nasaSource: {
      name: 'NASA GPM (Global Precipitation Measurement)',
      detail: {
        es: 'Misión de constelación satelital IMERG para lluvia global y actualización oficial NASA GPM sobre El Niño (Sep 2026).',
        en: 'IMERG satellite constellation for global rain accumulation and the NASA GPM El Niño update (Sep 2026).',
      },
      url: 'https://gpm.nasa.gov/',
      extraUrls: [
        {label: 'Misión GPM (Science)', url: 'https://science.nasa.gov/mission/gpm/'},
        {label: 'GSFC Hydro GPM', url: 'https://earth.gsfc.nasa.gov/hydro/missions/global-precipitation-measurement-gpm'},
        {label: 'Constelación GPM', url: 'https://gpm.nasa.gov/missions/GPM/constellation'},
        {label: 'FAQ GPM', url: 'https://gpm.nasa.gov/resources/faq'},
        {label: 'El Niño Sep 2026', url: 'https://gpm.nasa.gov/data/articles/El-Nino-Sep-2026-update'},
      ],
    },
    peruSource: {
      name: 'ANA Observatorio Nacional de Recursos Hídricos (ONRH)',
      detail: {
        es: 'Reportes oficiales de embalses (incluyendo Represa Pasto Grande), caudales en ríos y disponibilidad hídrica en Moquegua.',
        en: 'Official reservoir reports (including Pasto Grande Reservoir), river flow stations, and Moquegua basin water bulletins.',
      },
      url: 'https://snirh.ana.gob.pe/onrh/',
    },
  },
  {
    id: 'ecostress_et',
    imageKey: 'irrigation',
    gap: {
      es: 'Evapotranspiración y estrés térmico por parcela a 70 metros de resolución (NASA POWER trabaja en celdas de ~50 km).',
      en: 'Plot-scale evapotranspiration and plant thermal stress at 70 m resolution (NASA POWER averages ~50 km cells).',
    },
    nasaSource: {
      name: 'NASA ECOSTRESS (Estación Espacial Internacional)',
      detail: {
        es: 'Radiómetro térmico a bordo de la EEI que mide temperatura foliar, estrés hídrico y eficiencia de uso del agua en cultivos.',
        en: 'ISS thermal radiometer measuring plant canopy temperature, water stress, and agricultural water-use efficiency.',
      },
      url: 'https://ecostress.jpl.nasa.gov/',
      extraUrls: [
        {label: 'ECOSTRESS Science', url: 'https://science.nasa.gov/mission/ecostress/'},
        {label: 'JPL ECOSTRESS', url: 'https://www.jpl.nasa.gov/missions/ecosystem-spaceborne-thermal-radiometer-experiment-on-space-station-ecostress/'},
        {label: 'Aplicaciones Agrícolas', url: 'https://ecostress.jpl.nasa.gov/apps'},
        {label: 'ESSP Pathfinder', url: 'https://essp.nasa.gov/earth-pathfinder-quests/projects/ecostress/'},
      ],
    },
    peruSource: {
      name: 'MIDAGRI · SIEA Estadística Agraria',
      detail: {
        es: 'Series departamentales de superficie sembrada, rendimientos por cultivo y precios en chacra de Moquegua.',
        en: 'Regional crop acreage, yield benchmarks, and farmgate price bulletins for Moquegua.',
      },
      url: 'https://siea.midagri.gob.pe/',
    },
  },
  {
    id: 'smap_soil',
    imageKey: 'crops',
    gap: {
      es: 'Humedad superficial y radicular de suelos más análisis físico-químicos (pH y salinidad) en valles costeros y andinos.',
      en: 'Root-zone soil moisture combined with laboratory pH and salinity measurements across coastal and Andean valleys.',
    },
    nasaSource: {
      name: 'NASA SMAP (Soil Moisture Active Passive)',
      detail: {
        es: 'Observatorio orbital de humedad en los primeros 5 cm del suelo y monitoreo global del ciclo hidrológico.',
        en: 'Orbital mission measuring moisture in the top 5 cm of soil and tracking global water cycles.',
      },
      url: 'https://smap.jpl.nasa.gov/',
      extraUrls: [
        {label: 'SMAP Science NASA', url: 'https://science.nasa.gov/mission/smap/'},
        {label: 'GSFC SMAP Hydro', url: 'https://earth.gsfc.nasa.gov/hydro/missions/soil-moisture-active-passive-smap-mission'},
        {label: '10 años de SMAP', url: 'https://science.nasa.gov/science-research/earth-science/a-decade-of-global-water-cycle-monitoring-nasa-soil-moisture-active-passive-mission/'},
        {label: 'Publicación NTRS 2026', url: 'https://ntrs.nasa.gov/citations/20260007170'},
      ],
    },
    peruSource: {
      name: 'SENAMHI Perú (Avisos Meteorológicos)',
      detail: {
        es: 'Alertas locales de heladas nocturnas a 48–72 h en Omate, Puquina y Ubinas y comunicados ENFEN El Niño.',
        en: '48–72h local frost warnings in Omate, Puquina, and Ubinas plus official ENFEN El Niño bulletins.',
      },
      url: 'https://www.senamhi.gob.pe/?p=aviso-meteorologico',
    },
  },
  {
    id: 'open_cadastre',
    imageKey: 'valley',
    gap: {
      es: 'Límites políticos distritales exactos, estaciones locales descargables y catastro de juntas de regantes.',
      en: 'Exact district borders, local weather station downloads, and water-user board registries.',
    },
    nasaSource: {
      name: 'NASA AppEEARS & Earthdata Search',
      detail: {
        es: 'Descarga gratuita por polígono de series SMAP, ECOSTRESS y MODIS NDVI listas para análisis SIG.',
        en: 'Free polygon extraction of SMAP, ECOSTRESS, and MODIS NDVI time series ready for GIS.',
      },
      url: 'https://appeears.earthdatacloud.nasa.gov/',
    },
    peruSource: {
      name: 'Plataforma Nacional de Datos Abiertos Perú',
      detail: {
        es: 'Capas GeoJSON/Shapefile oficiales, padrones agrarios e hidrometría abierta del Estado peruano.',
        en: 'Official Peruvian GeoJSON/Shapefile boundaries, farmer registries, and open hydrometric records.',
      },
      url: 'https://www.datosabiertos.gob.pe/',
    },
  },
];
