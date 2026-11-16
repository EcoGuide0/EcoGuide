import {OFFLINE_PROVINCE_BASELINES} from '../data/moqueguaData';
import type {MonthlyClimatePoint, NasaClimateData, ProvinceKey} from '../types/agro';

const CACHE_KEY = 'fieldshift_nasa_power_cache_v1';
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

interface CachedRecord {
  key: string;
  data: NasaClimateData;
  savedAtMs: number;
}

function getCacheStore(): Record<string, CachedRecord> {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, CachedRecord>;
  } catch {
    return {};
  }
}

function saveToCache(coordKey: string, provinceKey: ProvinceKey, data: NasaClimateData) {
  try {
    const store = getCacheStore();
    const record: CachedRecord = {key: coordKey, data, savedAtMs: Date.now()};
    store[coordKey] = record;
    store[`prov:${provinceKey}`] = record;
    // Keep cache compact (max 25 entries)
    const keys = Object.keys(store);
    if (keys.length > 25) {
      const oldest = keys
        .filter((k) => !k.startsWith('prov:'))
        .sort((a, b) => store[a].savedAtMs - store[b].savedAtMs)[0];
      if (oldest) delete store[oldest];
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(store));
  } catch {
    // Ignore storage quota errors cleanly
  }
}

export function getCachedNasaData(lat: number, lon: number, provinceKey: ProvinceKey): NasaClimateData {
  const coordKey = `${lat.toFixed(2)},${lon.toFixed(2)}`;
  const store = getCacheStore();
  const cached = store[coordKey] || store[`prov:${provinceKey}`];
  if (cached) {
    return {
      ...cached.data,
      source: 'cache',
    };
  }
  return {
    ...OFFLINE_PROVINCE_BASELINES[provinceKey],
    lat,
    lon,
  };
}

function cleanVal(val: number | undefined, fallback: number): number {
  if (typeof val !== 'number' || Number.isNaN(val) || val <= -900) return fallback;
  return val;
}

export async function fetchNasaPowerMonthly(
  lat: number,
  lon: number,
  provinceKey: ProvinceKey
): Promise<NasaClimateData> {
  const coordKey = `${lat.toFixed(2)},${lon.toFixed(2)}`;
  const fallbackBaseline = OFFLINE_PROVINCE_BASELINES[provinceKey];

  const url =
    `https://power.larc.nasa.gov/api/temporal/monthly/point` +
    `?parameters=T2M,T2M_MIN,T2M_MAX,PRECTOTCORR,RH2M,ALLSKY_SFC_SW_DWN,GWETTOP` +
    `&community=AG&longitude=${lon.toFixed(4)}&latitude=${lat.toFixed(4)}` +
    `&start=2024&end=2025&format=JSON`;

  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 9000);
    const res = await fetch(url, {signal: controller.signal});
    window.clearTimeout(timer);

    if (!res.ok) {
      throw new Error(`NASA POWER HTTP ${res.status}`);
    }

    const json = await res.json();
    const params = json?.properties?.parameter;
    if (!params || !params.T2M) {
      throw new Error('Malformed NASA POWER response');
    }

    // Prefer 2025 months when valid; fall back to 2024 month if a recent month is -999
    const monthly: MonthlyClimatePoint[] = Array.from({length: 12}, (_, m) => {
      const mm = String(m + 1).padStart(2, '0');
      const k25 = `2025${mm}`;
      const k24 = `2024${mm}`;
      const base = fallbackBaseline.monthly[m];

      const pick = (series: Record<string, number> | undefined, fb: number): number => {
        if (!series) return fb;
        const v25 = series[k25];
        if (typeof v25 === 'number' && v25 > -900) return v25;
        const v24 = series[k24];
        if (typeof v24 === 'number' && v24 > -900) return v24;
        return fb;
      };

      const t2m = Number(pick(params.T2M, base.t2m).toFixed(1));
      const t2mMin = Number(pick(params.T2M_MIN, base.t2mMin).toFixed(1));
      const t2mMax = Number(pick(params.T2M_MAX, base.t2mMax).toFixed(1));
      const precipMmDay = Number(Math.max(0, pick(params.PRECTOTCORR, base.precipMmDay)).toFixed(2));
      const precipMmMonth = Number((precipMmDay * DAYS_IN_MONTH[m]).toFixed(1));
      const rh2m = Number(Math.min(100, Math.max(5, pick(params.RH2M, base.rh2m))).toFixed(1));
      const solarMj = Number(Math.max(1, pick(params.ALLSKY_SFC_SW_DWN, base.solarMj)).toFixed(2));
      const solarKwh = Number((solarMj / 3.6).toFixed(2));
      const soilWetness = Number(Math.min(1, Math.max(0.02, pick(params.GWETTOP, base.soilWetness))).toFixed(2));

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

    const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
    const precipMmYear = Number(monthly.reduce((acc, m) => acc + m.precipMmMonth, 0).toFixed(0));

    const result: NasaClimateData = {
      lat,
      lon,
      yearLabel: '2024–2025',
      fetchedAt: new Date().toISOString(),
      source: 'live',
      annual: {
        avgTemp: Number(cleanVal(avg(monthly.map((m) => m.t2m)), fallbackBaseline.annual.avgTemp).toFixed(1)),
        minTemp: Number(Math.min(...monthly.map((m) => m.t2mMin)).toFixed(1)),
        maxTemp: Number(Math.max(...monthly.map((m) => m.t2mMax)).toFixed(1)),
        precipMmDay: Number(avg(monthly.map((m) => m.precipMmDay)).toFixed(2)),
        precipMmYear,
        avgHumidity: Number(avg(monthly.map((m) => m.rh2m)).toFixed(1)),
        avgSolarMj: Number(avg(monthly.map((m) => m.solarMj)).toFixed(1)),
        avgSolarKwh: Number(avg(monthly.map((m) => m.solarKwh)).toFixed(1)),
        avgSoilWetness: Number(avg(monthly.map((m) => m.soilWetness)).toFixed(2)),
      },
      monthly,
    };

    saveToCache(coordKey, provinceKey, result);
    return result;
  } catch {
    return getCachedNasaData(lat, lon, provinceKey);
  }
}
