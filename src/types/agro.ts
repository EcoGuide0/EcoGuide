export type Lang = 'es' | 'en';

export type SectionId =
  | 'inicio'
  | 'mapa'
  | 'simulador'
  | 'calendario'
  | 'galeria'
  | 'crisis'
  | 'datos';

export type ProvinceKey = 'mariscal_nieto' | 'ilo' | 'sanchez_cerro';

export type SoilKey = 'franco' | 'arenoso' | 'arcilloso';

export type NasaGibsLayerKey = 'none' | 'truecolor' | 'ndvi' | 'lst' | 'smap';

export interface LocalizedText {
  es: string;
  en: string;
}

export interface MonthlyClimatePoint {
  monthIndex: number;
  t2m: number;
  t2mMin: number;
  t2mMax: number;
  precipMmDay: number;
  precipMmMonth: number;
  rh2m: number;
  solarMj: number;
  solarKwh: number;
  soilWetness: number;
}

export interface NasaClimateData {
  lat: number;
  lon: number;
  yearLabel: string;
  fetchedAt: string;
  source: 'live' | 'cache' | 'baseline';
  annual: {
    avgTemp: number;
    minTemp: number;
    maxTemp: number;
    precipMmDay: number;
    precipMmYear: number;
    avgHumidity: number;
    avgSolarMj: number;
    avgSolarKwh: number;
    avgSoilWetness: number;
  };
  monthly: MonthlyClimatePoint[];
}

export interface ProvinceInfo {
  key: ProvinceKey;
  lat: number;
  lon: number;
  zoom: number;
  polygon: [number, number][];
  altitude: LocalizedText;
  title: LocalizedText;
  shortName: string;
  districts: string;
  stressLabel: LocalizedText;
  crops: LocalizedText;
  elNinoImpact: LocalizedText;
  lowCostTip: LocalizedText;
}

export interface ValleyWaypoint {
  id: string;
  provinceKey: ProvinceKey;
  name: string;
  lat: number;
  lon: number;
  altitudeM: number;
  note: LocalizedText;
}

export type CalendarPhase = 'sow' | 'peak' | 'harvest' | 'rest';

export interface CropSpec {
  key: string;
  category: 'current' | 'rotation' | 'both';
  name: LocalizedText;
  kcMid: number;
  kcInitial: number;
  rootDepthM: number;
  frostToleranceC: number;
  heatToleranceC: number;
  nitrogenFixer?: boolean;
  waterNote: LocalizedText;
  calendarByProvince: Record<ProvinceKey, CalendarPhase[]>;
}

export interface SoilSpec {
  key: SoilKey;
  name: LocalizedText;
  availableWaterMmPerM: number;
  infiltrationNote: LocalizedText;
  stressPenalty: number;
}

export interface MonthlySimulationPoint {
  monthIndex: number;
  et0Mm: number;
  currentNeedMm: number;
  rotationNeedMm: number;
  currentNeedM3Ha: number;
  rotationNeedM3Ha: number;
}

export interface SimulationResult {
  riskScore: number;
  improvedRiskScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  thermalAlert: 'none' | 'frost' | 'heat';
  weeklyIrrigationCurrentM3: number;
  weeklyIrrigationRotationM3: number;
  irrigationIntervalCurrentDays: number;
  irrigationIntervalRotationDays: number;
  annualSavingsPercent: number;
  annualSavingsM3: number;
  monthlySeries: MonthlySimulationPoint[];
  spokenDiagnosis: string;
}

export interface OpenDataSourceItem {
  id: string;
  imageKey: 'valley' | 'irrigation' | 'calendar' | 'crops' | 'crisis' | 'satellite';
  gap: LocalizedText;
  nasaSource: {
    name: string;
    detail: LocalizedText;
    url: string;
    extraUrls?: {label: string; url: string}[];
  };
  peruSource: {
    name: string;
    detail: LocalizedText;
    url: string;
  };
}

export interface SectionComment {
  id: string;
  sectionId: SectionId;
  author: string;
  zone: string;
  kind: 'question' | 'feedback';
  message: string;
  createdAt: string;
}

export interface GalleryCropProfile {
  id: string;
  name: LocalizedText;
  province: LocalizedText;
  altitude: string;
  idealPh: string;
  waterDemand: LocalizedText;
  bestSeason: LocalizedText;
  summary: LocalizedText;
}

export interface CrisisActionPlan {
  phase: LocalizedText;
  items: LocalizedText[];
}
