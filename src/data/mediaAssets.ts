import cropsSoilImg from '../assets/images/moquegua_crops_soil_1794758157308.jpg';
import dripIrrigationImg from '../assets/images/moquegua_drip_irrigation_1794758156330.jpg';
import elNinoImg from '../assets/images/moquegua_elnino_climate_1794758157912.jpg';
import plantingCalendarImg from '../assets/images/moquegua_planting_calendar_1794758156773.jpg';
import valleySatelliteImg from '../assets/images/moquegua_valley_satellite_1794758156744.jpg';
import earthObsImg from '../assets/images/nasa_earth_observation_1794758158093.jpg';

export type MediaAssetKey = 'valley' | 'irrigation' | 'calendar' | 'crops' | 'crisis' | 'satellite';

export const MEDIA_ASSETS: Record<
  MediaAssetKey,
  {src: string; altEs: string; altEn: string}
> = {
  valley: {
    src: valleySatelliteImg,
    altEs: 'Vista satelital de valles agrícolas en terrazas en Moquegua, Perú',
    altEn: 'Satellite view of terraced agricultural valleys in Moquegua, Peru',
  },
  irrigation: {
    src: dripIrrigationImg,
    altEs: 'Riego por goteo en árboles de palto Hass en los valles de Moquegua',
    altEn: 'Drip irrigation lines watering Hass avocado trees in Moquegua valleys',
  },
  calendar: {
    src: plantingCalendarImg,
    altEs: 'Andenería andina con cultivos de quinua y maíz al amanecer',
    altEn: 'Andean terraces planted with quinoa and corn at sunrise',
  },
  crops: {
    src: cropsSoilImg,
    altEs: 'Palto Hass, aceitunas de Ilo, quinua, orégano y muestras de suelos agrícolas',
    altEn: 'Hass avocados, Ilo olives, quinoa, oregano, and agricultural soil samples',
  },
  crisis: {
    src: elNinoImg,
    altEs: 'Suelo agrícola agrietado por sequía frente a nubes de tormenta sobre los Andes',
    altEn: 'Cracked drought-stressed farm soil beneath storm clouds over the Andes',
  },
  satellite: {
    src: earthObsImg,
    altEs: 'Satélite de observación terrestre de la NASA sobre la costa del Pacífico y los Andes',
    altEn: 'NASA Earth observation satellite orbiting over the South American Pacific coast and Andes',
  },
};
