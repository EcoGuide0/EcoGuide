import type {Lang, SectionId} from '../types/agro';

export const SECTION_META: Record<
  SectionId,
  {
    number: string;
    title: Record<Lang, string>;
    shortLabel: Record<Lang, string>;
    summary: Record<Lang, string>;
  }
> = {
  inicio: {
    number: '00',
    title: {es: 'Inicio', en: 'Home'},
    shortLabel: {es: 'Inicio', en: 'Home'},
    summary: {
      es: 'Portada principal con acceso semicircular a los seis módulos agrícolas.',
      en: 'Main hub with radial semicircle access to all six agricultural tools.',
    },
  },
  mapa: {
    number: '01',
    title: {es: 'Mapa Satelital', en: 'Satellite Map'},
    shortLabel: {es: 'Mapa Satelital', en: 'Satellite Map'},
    summary: {
      es: 'Explora parcelas, capas NASA GIBS (NDVI, temperatura, humedad) y clima mensual NASA POWER.',
      en: 'Explore farm plots, NASA GIBS layers (NDVI, surface temp, moisture), and NASA POWER monthly data.',
    },
  },
  simulador: {
    number: '02',
    title: {es: 'Simulador Hídrico', en: 'Water Simulator'},
    shortLabel: {es: 'Simulador Hídrico', en: 'Water Simulator'},
    summary: {
      es: 'Calcula litros semanales de riego, frecuencia y ahorro de agua al rotar cultivos.',
      en: 'Estimate weekly irrigation volume, schedule days, and annual water savings via rotation.',
    },
  },
  calendario: {
    number: '03',
    title: {es: 'Calendario Agrícola', en: 'Crop Calendar'},
    shortLabel: {es: 'Calendario', en: 'Calendar'},
    summary: {
      es: 'Semáforo de 12 meses (siembra, riego crítico, cosecha y descanso) con explicación por mes.',
      en: '12-month traffic-light schedule (sow, critical irrigation, harvest, rest) with hover reasons.',
    },
  },
  galeria: {
    number: '04',
    title: {es: 'Galería Inteligente', en: 'Smart Gallery'},
    shortLabel: {es: 'Galería Inteligente', en: 'Smart Gallery'},
    summary: {
      es: 'Cultivos, tipos de suelo, escala interactiva de pH y mejores estaciones en Moquegua.',
      en: 'Moquegua crops, soil types, interactive pH scale, and optimal growing seasons.',
    },
  },
  crisis: {
    number: '05',
    title: {es: 'Crisis El Niño', en: 'El Niño Crisis'},
    shortLabel: {es: 'Crisis', en: 'Crisis'},
    summary: {
      es: 'Impacto real del Fenómeno El Niño en tu valle y plan práctico antes, durante y después.',
      en: 'Practical guide to El Niño impacts in your valley with before, during, and after actions.',
    },
  },
  datos: {
    number: '06',
    title: {es: 'Datos Abiertos', en: 'Open Data'},
    shortLabel: {es: 'Datos Abiertos', en: 'Open Data'},
    summary: {
      es: 'Misiones oficiales NASA (GPM, ECOSTRESS, SMAP) y portales agrarios del Perú.',
      en: 'Official NASA missions (GPM, ECOSTRESS, SMAP) and Peruvian government portals.',
    },
  },
};

export const UI_TEXT: Record<
  Lang,
  {
    brandName: string;
    backToHome: string;
    btnInstallApp: string;
    btnInstallShort: string;
    btnSunMode: string;
    btnSunModeActive: string;
    btnLangSwitch: string;
    statusOnline: string;
    statusOffline: string;
    statusCache: string;
    statusBaseline: string;
    statusLoading: string;
    homeEyebrow: string;
    homeHeadline: string;
    homeSub: string;
    homeInstruction: string;
    homeHubTag: string;
    homeOpenSection: string;
    selectProvinceLabel: string;
    quickValleysLabel: string;
    mapIntroTitle: string;
    mapIntroBody: string;
    cardSubtitle: string;
    lblHumidityNasa: string;
    lblSoilWetness: string;
    lblStressLevel: string;
    lblCrops: string;
    lblElNino: string;
    lblTip: string;
    mapHeading: string;
    mapSubheading: string;
    mapBaseOpenLabel: string;
    gibsLayerLabel: string;
    gibsNone: string;
    gibsTrueColor: string;
    gibsNdvi: string;
    gibsLst: string;
    gibsSmap: string;
    gibsOpacity: string;
    gibsLegendNdvi: string;
    gibsLegendLst: string;
    gibsLegendSmap: string;
    gibsLegendTrueColor: string;
    lblCoords: string;
    mapHint: string;
    popupSelected: string;
    metricTemp: string;
    metricPrecip: string;
    metricHumidity: string;
    metricSolar: string;
    metricSoilMoisture: string;
    monthlyChartTitle: string;
    monthlyChartSub: string;
    legendTemp: string;
    legendPrecip: string;
    simEyebrow: string;
    simHeading: string;
    simIntroTitle: string;
    simSteps: string[];
    simImg1Caption: string;
    simImg2Caption: string;
    lblCurrentCrop: string;
    lblRotationCrop: string;
    lblSoilType: string;
    lblAreaHa: string;
    btnRecalculate: string;
    riskLow: string;
    riskModerate: string;
    riskHigh: string;
    thermalFrost: string;
    thermalHeat: string;
    thermalNormal: string;
    kpiWeeklyWater: string;
    kpiInterval: string;
    kpiSavings: string;
    kpiThermalWatch: string;
    everyDays: string;
    perWeek: string;
    perYear: string;
    simChartTitle: string;
    simChartSub: string;
    simChartCurrent: string;
    simChartRotation: string;
    calEyebrow: string;
    calHeading: string;
    calSub: string;
    calHoverHint: string;
    calJustificationTitle: string;
    phasePeak: string;
    phaseSow: string;
    phaseHarvest: string;
    phaseRest: string;
    galEyebrow: string;
    galHeading: string;
    galIntro: string;
    galCropsTitle: string;
    galSoilsTitle: string;
    galPhTitle: string;
    galPhSub: string;
    galPhAcid: string;
    galPhNeutral: string;
    galPhAlkaline: string;
    galSeasonsTitle: string;
    crisisEyebrow: string;
    crisisHeading: string;
    crisisGpmTitle: string;
    crisisGpmBody: string;
    crisisSymptomsTitle: string;
    crisisGlossaryTitle: string;
    crisisPlanTitle: string;
    dataEyebrow: string;
    dataHeading: string;
    dataDesc: string;
    colGap: string;
    colNasa: string;
    colPeru: string;
    visitPortal: string;
    audioBarTitle: string;
    audioPlay: string;
    audioStop: string;
    audioRateSlow: string;
    audioRateNormal: string;
    commentsTitle: string;
    commentsSub: string;
    commentNamePlaceholder: string;
    commentZonePlaceholder: string;
    commentKindQuestion: string;
    commentKindFeedback: string;
    commentMessagePlaceholder: string;
    commentSubmit: string;
    commentExportCsv: string;
    commentExportJson: string;
    commentEmpty: string;
    commentSavedToast: string;
    footerTitle: string;
    footerDesc: string;
    offlineBanner: string;
    iosModalTitle: string;
    iosStep1: string;
    iosStep2: string;
    desktopInstallHint: string;
    close: string;
    monthsShort: string[];
    monthsFull: string[];
  }
> = {
  es: {
    brandName: 'ECOGUIDE',
    backToHome: 'Volver a Inicio',
    btnInstallApp: 'Instalar App',
    btnInstallShort: 'Instalar',
    btnSunMode: 'Modo Sol',
    btnSunModeActive: 'Modo Sol Activo',
    btnLangSwitch: 'English',
    statusOnline: 'NASA En Línea',
    statusOffline: 'Modo Offline (Caché)',
    statusCache: 'Caché Local',
    statusBaseline: 'Referencia Offline',
    statusLoading: 'Consultando NASA...',
    homeEyebrow: 'Moquegua · NASA Space Apps · Agricultura Resiliente',
    homeHeadline: 'Tu guía agrícola inteligente para cuidar el agua y tus cosechas',
    homeSub:
      'Explora seis herramientas independientes diseñadas para los valles de Mariscal Nieto, Ilo y General Sánchez Cerro con datos reales de satélites de la NASA.',
    homeInstruction: 'Haz clic en cualquier división del semicírculo para abrir su apartado único:',
    homeHubTag: 'Plataforma Agrícola Moquegua',
    homeOpenSection: 'Abrir apartado',
    selectProvinceLabel: 'Selecciona tu provincia en Moquegua',
    quickValleysLabel: 'Valles de acceso rápido:',
    mapIntroTitle: '¿Cómo funciona este mapa satelital?',
    mapIntroBody:
      'Toca tu provincia, elige un valle o arrastra el pin azul sobre tu chacra. El sistema consulta series mensuales de NASA POWER (temperatura, lluvia, radiación y humedad del suelo) y te permite superponer mapas reales NASA GIBS para ver vigor vegetal (NDVI) o calor superficial.',
    cardSubtitle: 'Perfil Agronómico Regional',
    lblHumidityNasa: 'Humedad relativa media',
    lblSoilWetness: 'Humedad superficial del suelo',
    lblStressLevel: 'Nivel de estrés hídrico',
    lblCrops: 'Cultivos clave (MIDAGRI)',
    lblElNino: 'Impacto Fenómeno El Niño',
    lblTip: 'Acción de bajo costo recomendada',
    mapHeading: 'Visor Satelital Interactivo NASA GIBS — Moquegua',
    mapSubheading:
      'Haz clic en cualquier punto agrícola o mueve el marcador azul para actualizar datos satelitales.',
    mapBaseOpenLabel: 'Mapa base: OpenStreetMap · Capas satelitales: NASA GIBS',
    gibsLayerLabel: 'Capa NASA GIBS:',
    gibsNone: 'Solo mapa base',
    gibsTrueColor: 'MODIS Color Verdadero',
    gibsNdvi: 'MODIS NDVI (Vegetación)',
    gibsLst: 'MODIS Temp. Superficial',
    gibsSmap: 'SMAP Humedad de Suelo',
    gibsOpacity: 'Opacidad NASA',
    gibsLegendNdvi:
      'NDVI 8 días: verde intenso indica cultivo vigoroso; tonos tierra/ocre indican menor vegetación o estrés hídrico.',
    gibsLegendLst:
      'Temperatura superficial MODIS: tonos ámbar/rojo señalan mayor calentamiento del suelo durante el día.',
    gibsLegendSmap:
      'Humedad SMAP L4: tonos azules señalan mayor humedad disponible en los primeros 5 cm del suelo.',
    gibsLegendTrueColor:
      'Reflectancia MODIS Terra: imagen óptica real reciente de cobertura nubosa y valles.',
    lblCoords: 'Coordenadas activas',
    mapHint: 'Toca un valle o arrastra el pin azul',
    popupSelected: 'Parcela seleccionada en Moquegua',
    metricTemp: 'Temp. Media (T2M)',
    metricPrecip: 'Lluvia Anual Est.',
    metricHumidity: 'Humedad Relativa',
    metricSolar: 'Radiación Solar',
    metricSoilMoisture: 'Humedad Suelo (GWET)',
    monthlyChartTitle: 'Ciclo Climático Mensual NASA POWER',
    monthlyChartSub:
      'Temperatura media (°C), lluvia mensual (mm) y humedad del suelo (%) para esta coordenada.',
    legendTemp: 'Temp. media (°C)',
    legendPrecip: 'Lluvia mensual (mm)',
    simEyebrow: 'Cálculo Hidrológico Guiado FAO-56 + NASA POWER',
    simHeading: 'Simulador Hídrico y Rotación Inteligente',
    simIntroTitle: 'Guía rápida en 3 pasos para evitar sobrecarga de datos',
    simSteps: [
      '1. Elige el cultivo que tienes hoy en tu chacra y compáralo con una rotación resistente a sequía.',
      '2. Indica tu tipo de suelo (franco, arenoso de costa o arcilloso de sierra) y cuántas hectáreas riegas.',
      '3. Revisa cuántos metros cúbicos por semana ahorras y cada cuántos días te conviene regar.',
    ],
    simImg1Caption: 'Riego localizado y cobertura seca alrededor del palto en valles de Moquegua.',
    simImg2Caption: 'Rotación con granos andinos y aromáticas que reducen el consumo de agua.',
    lblCurrentCrop: 'Cultivo actual en tu chacra',
    lblRotationCrop: 'Alternativa de rotación inteligente',
    lblSoilType: 'Tipo de suelo predominante',
    lblAreaHa: 'Superficie de parcela (hectáreas)',
    btnRecalculate: 'Recalcular con Datos NASA',
    riskLow: 'RIESGO BAJO · CONDICIÓN ÓPTIMA',
    riskModerate: 'PRECAUCIÓN HÍDRICA · AJUSTAR RIEGO',
    riskHigh: 'ALERTA ESTRÉS HÍDRICO / EL NIÑO',
    thermalFrost: 'Alerta heladas nocturnas (< 4 °C)',
    thermalHeat: 'Estrés térmico diurno (> 29 °C)',
    thermalNormal: 'Rango térmico estable',
    kpiWeeklyWater: 'Riego semanal estimado',
    kpiInterval: 'Frecuencia sugerida',
    kpiSavings: 'Ahorro anual con rotación',
    kpiThermalWatch: 'Vigilancia térmica NASA',
    everyDays: 'Cada {d} días',
    perWeek: 'm³/semana',
    perYear: 'm³/año ahorrados',
    simChartTitle: 'Demanda Mensual de Agua de Riego (m³/ha)',
    simChartSub: 'Comparación mes a mes entre tu cultivo actual y la rotación recomendada.',
    simChartCurrent: 'Cultivo actual (m³/ha)',
    simChartRotation: 'Rotación inteligente (m³/ha)',
    calEyebrow: 'Semáforo Estacional de Moquegua',
    calHeading: 'Calendario Agrícola Inteligente',
    calSub:
      'Posa el cursor o toca cualquier recuadro de mes para leer la justificación agronómica basada en temperatura mínima, lluvia y evapotranspiración de la NASA.',
    calHoverHint: 'Posa el cursor o toca cualquier celda para ver el porqué del mes',
    calJustificationTitle: 'Justificación técnica del mes seleccionado',
    phasePeak: 'Riego crítico',
    phaseSow: 'Siembra',
    phaseHarvest: 'Cosecha',
    phaseRest: 'Descanso',
    galEyebrow: 'Conocimiento Visual del Valle',
    galHeading: 'Galería Inteligente de Cultivos, Suelos y pH',
    galIntro:
      'Aprende de forma visual qué cultivos rinden mejor según la altura de Moquegua, cómo retiene el agua cada tipo de suelo y qué significa realmente el nivel de pH de tu tierra.',
    galCropsTitle: '1. Cultivos emblemáticos de Moquegua',
    galSoilsTitle: '2. Tipos de suelo y capacidad para guardar agua',
    galPhTitle: '3. Escala Interactiva de pH del Suelo (4.0 – 9.0)',
    galPhSub:
      'El pH mide qué tan ácida o alcalina es tu tierra. Si está fuera del rango ideal, la planta no puede absorber el abono aunque fertilices.',
    galPhAcid: 'Suelo Ácido (ej. zonas volcánicas altas)',
    galPhNeutral: 'Suelo Neutro (ideal valles medios)',
    galPhAlkaline: 'Suelo Alcalino / Salino (costa Ilo)',
    galSeasonsTitle: '4. Mejores estaciones del año en Moquegua',
    crisisEyebrow: 'Preparación Climática para el Agricultor',
    crisisHeading: 'Crisis: Impacto del Fenómeno El Niño en tu Zona',
    crisisGpmTitle: '¿Qué muestran los satélites de la NASA sobre El Niño 2026–2027?',
    crisisGpmBody:
      'Según la misión NASA GPM (actualización de septiembre 2026), el evento El Niño 2026–27 presenta anomalías más amplias que eventos moderados previos: lluvias intensas sobre el Pacífico central (+500 mm) y alteraciones extremas que incluso provocaron lluvias atípicas de hasta +150% en el desierto sur vecino, mientras la sierra sur enfrenta pausas secas ("veranillos") seguidas de heladas.',
    crisisSymptomsTitle: 'Cómo afecta directamente a tu provincia',
    crisisGlossaryTitle: 'Palabras técnicas explicadas en sencillo',
    crisisPlanTitle: 'Plan de acción práctico para tu chacra',
    dataEyebrow: 'Repositorios Científicos Libres',
    dataHeading: 'Datos Abiertos de la NASA y Portales del Perú',
    dataDesc:
      'Aquí encuentras las misiones oficiales de la NASA usadas o complementarias para Moquegua junto con las plataformas del Estado peruano para datos de campo a nivel de parcela:',
    colGap: 'Limitación o dato requerido',
    colNasa: 'Misión / Repositorio NASA',
    colPeru: 'Portal Gubernamental Perú',
    visitPortal: 'Abrir enlace oficial',
    audioBarTitle: 'Lectura por Voz (Accesibilidad)',
    audioPlay: 'Escuchar este apartado',
    audioStop: 'Detener lectura',
    audioRateSlow: 'Voz Pausada',
    audioRateNormal: 'Voz Normal',
    commentsTitle: 'Preguntas y Comentarios de este Apartado',
    commentsSub:
      '¿Tienes alguna duda sobre tu parcela o sugerencia para ECOGUIDE? Escríbela aquí; se guarda en tu dispositivo y puedes exportarla.',
    commentNamePlaceholder: 'Tu nombre (opcional)',
    commentZonePlaceholder: 'Distrito o valle (ej. Torata)',
    commentKindQuestion: 'Pregunta técnica',
    commentKindFeedback: 'Comentario / Feedback',
    commentMessagePlaceholder: 'Escribe tu pregunta o comentario sobre esta sección...',
    commentSubmit: 'Publicar en este apartado',
    commentExportCsv: 'Exportar CSV',
    commentExportJson: 'Exportar JSON',
    commentEmpty: 'Aún no hay preguntas ni comentarios en este apartado. Sé el primero en participar.',
    commentSavedToast: 'Guardado localmente en este apartado.',
    footerTitle: 'ECOGUIDE — Moquegua · NASA Space Apps',
    footerDesc:
      'Telemetría abierta NASA POWER, GIBS, GPM, ECOSTRESS y SMAP · Referencia MIDAGRI, ANA Pasto Grande y SENAMHI Perú · PWA Offline-First.',
    offlineBanner:
      'Sin conexión a internet: mostrando los últimos datos satelitales guardados en este dispositivo.',
    iosModalTitle: 'Instalar ECOGUIDE en tu celular o navegador',
    iosStep1: 'En Safari (iPhone/iPad), toca el botón Compartir en la barra inferior.',
    iosStep2: 'Elige "Agregar a pantalla de inicio" para usar ECOGUIDE sin señal en el campo.',
    desktopInstallHint:
      'En Chrome o Edge, haz clic en el ícono de instalación en la barra de direcciones o abre la web en su propia ventana para instalarla como aplicación.',
    close: 'Cerrar',
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    monthsFull: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
  },
  en: {
    brandName: 'ECOGUIDE',
    backToHome: 'Back to Home',
    btnInstallApp: 'Install App',
    btnInstallShort: 'Install',
    btnSunMode: 'Sun Mode',
    btnSunModeActive: 'Sun Mode On',
    btnLangSwitch: 'Español',
    statusOnline: 'NASA Live Online',
    statusOffline: 'Offline Mode (Cache)',
    statusCache: 'Local Cache',
    statusBaseline: 'Offline Baseline',
    statusLoading: 'Querying NASA...',
    homeEyebrow: 'Moquegua · NASA Space Apps · Resilient Farming',
    homeHeadline: 'Your smart farming guide to save water and protect harvests',
    homeSub:
      'Explore six dedicated, clutter-free tools tailored for Mariscal Nieto, Ilo, and General Sánchez Cerro using open NASA Earth observation data.',
    homeInstruction: 'Click any wedge in the semicircle to open its dedicated section:',
    homeHubTag: 'Moquegua Smart Agro Hub',
    homeOpenSection: 'Open section',
    selectProvinceLabel: 'Select your province in Moquegua',
    quickValleysLabel: 'Quick-access valleys:',
    mapIntroTitle: 'How does this satellite map work?',
    mapIntroBody:
      'Pick your province, tap a valley, or drag the blue pin onto your farm plot. ECOGUIDE fetches monthly NASA POWER series (temperature, rainfall, irradiance, topsoil moisture) and overlays real NASA GIBS satellite layers (NDVI vegetation health, surface heat, SMAP moisture).',
    cardSubtitle: 'Regional Agronomic Profile',
    lblHumidityNasa: 'Mean relative humidity',
    lblSoilWetness: 'Topsoil wetness index',
    lblStressLevel: 'Water stress level',
    lblCrops: 'Key crops (MIDAGRI)',
    lblElNino: 'El Niño impact',
    lblTip: 'Recommended low-cost field action',
    mapHeading: 'NASA GIBS Interactive Satellite Viewer — Moquegua',
    mapSubheading: 'Click any farm plot or drag the blue pin to refresh satellite measurements.',
    mapBaseOpenLabel: 'Base map: OpenStreetMap · Satellite layers: NASA GIBS',
    gibsLayerLabel: 'NASA GIBS Layer:',
    gibsNone: 'Base map only',
    gibsTrueColor: 'MODIS True Color',
    gibsNdvi: 'MODIS NDVI (Vegetation)',
    gibsLst: 'MODIS Surface Temp',
    gibsSmap: 'SMAP Soil Moisture',
    gibsOpacity: 'NASA Opacity',
    gibsLegendNdvi:
      '8-day NDVI: deep green marks vigorous vegetation; tan/ochre marks arid ground or stress.',
    gibsLegendLst:
      'MODIS Daytime Land Surface Temp: amber/red hues signal elevated ground surface heating.',
    gibsLegendSmap:
      'SMAP L4 Soil Moisture: blue tones indicate higher moisture in the top 5 cm of soil.',
    gibsLegendTrueColor:
      'MODIS Terra Corrected Reflectance: recent natural-color view of clouds and valley terrain.',
    lblCoords: 'Active coordinates',
    mapHint: 'Tap a valley or drag the blue pin',
    popupSelected: 'Selected plot in Moquegua',
    metricTemp: 'Mean Temp (T2M)',
    metricPrecip: 'Est. Annual Rain',
    metricHumidity: 'Relative Humidity',
    metricSolar: 'Solar Irradiance',
    metricSoilMoisture: 'Soil Wetness (GWET)',
    monthlyChartTitle: 'NASA POWER Monthly Climate Cycle',
    monthlyChartSub:
      'Mean temperature (°C), monthly rainfall (mm), and soil wetness (%) for this coordinate.',
    legendTemp: 'Mean temp (°C)',
    legendPrecip: 'Monthly rain (mm)',
    simEyebrow: 'Guided FAO-56 Hydrology + NASA POWER',
    simHeading: 'Water Simulator & Smart Rotation',
    simIntroTitle: 'Quick 3-step guide so numbers stay simple',
    simSteps: [
      '1. Pick the crop currently growing on your plot and test a drought-resilient rotation crop.',
      '2. Choose your soil type (loam, coastal sandy, or highland clay) and farm size in hectares.',
      '3. Read your estimated weekly water demand, irrigation interval in days, and annual savings.',
    ],
    simImg1Caption: 'Drip lines and dry organic mulch protecting avocado roots in Moquegua.',
    simImg2Caption: 'Rotating with resilient Andean grains and herbs cuts annual irrigation demand.',
    lblCurrentCrop: 'Current crop on your plot',
    lblRotationCrop: 'Smart rotation alternative',
    lblSoilType: 'Predominant soil type',
    lblAreaHa: 'Plot area (hectares)',
    btnRecalculate: 'Recalculate with NASA Data',
    riskLow: 'LOW RISK · OPTIMAL CONDITION',
    riskModerate: 'WATER CAUTION · ADJUST IRRIGATION',
    riskHigh: 'HIGH WATER STRESS / EL NIÑO ALERT',
    thermalFrost: 'Nighttime frost alert (< 4 °C)',
    thermalHeat: 'Daytime heat stress (> 29 °C)',
    thermalNormal: 'Stable thermal window',
    kpiWeeklyWater: 'Estimated weekly irrigation',
    kpiInterval: 'Suggested interval',
    kpiSavings: 'Annual rotation savings',
    kpiThermalWatch: 'NASA thermal watch',
    everyDays: 'Every {d} days',
    perWeek: 'm³/week',
    perYear: 'm³/year saved',
    simChartTitle: 'Monthly Irrigation Water Demand (m³/ha)',
    simChartSub: 'Month-by-month comparison between your current crop and smart rotation.',
    simChartCurrent: 'Current crop (m³/ha)',
    simChartRotation: 'Smart rotation (m³/ha)',
    calEyebrow: 'Moquegua Traffic-Light Schedule',
    calHeading: 'Smart Agricultural Calendar',
    calSub:
      'Hover over or tap any month cell to read its solid agronomic justification driven by NASA minimum temperature, rainfall, and evapotranspiration.',
    calHoverHint: 'Hover or tap any month box to see why it is flagged',
    calJustificationTitle: 'Agronomic justification for the selected month',
    phasePeak: 'Critical irrigation',
    phaseSow: 'Sowing',
    phaseHarvest: 'Harvest',
    phaseRest: 'Rest',
    galEyebrow: 'Visual Valley Knowledge',
    galHeading: 'Smart Gallery of Moquegua Crops, Soils & pH',
    galIntro:
      'Explore visually which crops thrive at each Moquegua altitude, how each soil holds water, and what soil pH actually means for your fertilizer uptake.',
    galCropsTitle: '1. Signature crops across Moquegua',
    galSoilsTitle: '2. Soil types & water-holding capacity',
    galPhTitle: '3. Interactive Soil pH Scale (4.0 – 9.0)',
    galPhSub:
      'pH measures how acidic or alkaline your soil is. Outside the ideal range, plants lock up nutrients even when you fertilize.',
    galPhAcid: 'Acidic Soil (high volcanic zones)',
    galPhNeutral: 'Neutral Soil (ideal mid-valleys)',
    galPhAlkaline: 'Alkaline / Saline Soil (Ilo coast)',
    galSeasonsTitle: '4. Best growing seasons in Moquegua',
    crisisEyebrow: 'Farmer Climate Preparedness',
    crisisHeading: 'Crisis: El Niño Impact in Your Valley',
    crisisGpmTitle: 'What do NASA satellites show for the 2026–2027 El Niño?',
    crisisGpmBody:
      'According to NASA GPM mission analysis (September 2026 update), the 2026–27 El Niño shows a wider anomaly footprint than past moderate events: heavy excess rain over the Central Pacific (+500 mm) and extreme shifts including unexpected +150% rain bursts in nearby southern desert regions, while southern Andean valleys face mid-season dry spells followed by sharp frosts.',
    crisisSymptomsTitle: 'How it impacts your province directly',
    crisisGlossaryTitle: 'Technical terms in plain language',
    crisisPlanTitle: 'Practical farm action plan',
    dataEyebrow: 'Open Scientific Repositories',
    dataHeading: 'NASA Open Data & Peruvian Government Portals',
    dataDesc:
      'Official NASA missions powering or complementing Moquegua decisions alongside Peruvian public platforms for parcel-level field records:',
    colGap: 'Missing data / Limitation',
    colNasa: 'NASA Mission / Repository',
    colPeru: 'Peruvian Government Portal',
    visitPortal: 'Open official portal',
    audioBarTitle: 'Voice Narration (Accessibility)',
    audioPlay: 'Listen to this section',
    audioStop: 'Stop reading',
    audioRateSlow: 'Slower Voice',
    audioRateNormal: 'Normal Speed',
    commentsTitle: 'Questions & Feedback for this Section',
    commentsSub:
      'Have a question about your farm or feedback for ECOGUIDE? Post it here—saved locally on your device with CSV/JSON export.',
    commentNamePlaceholder: 'Your name (optional)',
    commentZonePlaceholder: 'District or valley (e.g. Torata)',
    commentKindQuestion: 'Technical question',
    commentKindFeedback: 'Comment / Feedback',
    commentMessagePlaceholder: 'Write your question or feedback about this section...',
    commentSubmit: 'Post to this section',
    commentExportCsv: 'Export CSV',
    commentExportJson: 'Export JSON',
    commentEmpty: 'No questions or comments here yet. Be the first to contribute.',
    commentSavedToast: 'Saved locally to this section.',
    footerTitle: 'ECOGUIDE — Moquegua · NASA Space Apps',
    footerDesc:
      'Open telemetry from NASA POWER, GIBS, GPM, ECOSTRESS & SMAP · Reference: MIDAGRI, ANA Pasto Grande & SENAMHI Peru · Offline-First PWA.',
    offlineBanner:
      'You are offline: displaying the latest NASA satellite data saved on this device.',
    iosModalTitle: 'Install ECOGUIDE on your phone or browser',
    iosStep1: 'In Safari (iPhone/iPad), tap the Share button in the bottom bar.',
    iosStep2: 'Choose "Add to Home Screen" to use ECOGUIDE offline in the field.',
    desktopInstallHint:
      'In Chrome or Edge, click the install icon in the address bar or open the app outside the preview frame to install it.',
    close: 'Close',
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    monthsFull: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
};
