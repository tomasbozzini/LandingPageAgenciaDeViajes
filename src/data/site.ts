/* ============================================================
   CONTENIDO DEL SITIO
   Todo lo editable vive acá. No hay base de datos ni backend:
   se cambia este archivo, se vuelve a buildear y listo.
   Los campos marcados con  // <-- REEMPLAZAR  son de ejemplo.

   FOTOS: están en /public/fotos y son placeholders de Wikimedia
   Commons (ver public/fotos/CREDITOS.md). Hay que cambiarlas por
   fotos propias del cliente antes de publicar.
   ============================================================ */

export type Escena =
  | 'glaciar' | 'montana' | 'bosque' | 'selva' | 'puna' | 'costa' | 'ciudad';

/* ---------- Datos de la agencia ---------- */

export const agencia = {
  nombre: 'Elisa Medici Viajes',
  descriptor: 'Agencia de viajes',
  legajo: 'Legajo EVT 17.482',                 // <-- REEMPLAZAR
  desde: 2009,
  whatsapp: '5492494567890',                   // <-- REEMPLAZAR (internacional, sin + ni espacios)
  telefonoVisible: '+54 249 456-7890',         // <-- REEMPLAZAR
  email: 'hola@meridianosur.com.ar',           // <-- REEMPLAZAR
  direccion: 'Rodríguez 480, planta alta',     // <-- REEMPLAZAR
  ciudad: 'Tandil, Buenos Aires',              // <-- REEMPLAZAR
  horarios: 'Lunes a viernes de 9 a 18 h. Sábados de 9 a 13 h.',
  guardia: 'Guardia por WhatsApp las 24 h mientras estás de viaje.',
  instagram: '@meridianosur.viajes',           // <-- REEMPLAZAR
  instagramUrl: 'https://instagram.com/',      // <-- REEMPLAZAR
};

/** Arma un link de WhatsApp con el mensaje ya escrito. */
export function linkWhatsapp(mensaje: string): string {
  return `https://wa.me/${agencia.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export const mensajes = {
  general: `Hola ${agencia.nombre}, vi la web y quiero que me armen un viaje. Les cuento qué tengo en mente:`,
  hero: `Hola ${agencia.nombre}, quiero empezar a armar un viaje. ¿Me pasan una cotización?`,
  paquete: (nombre: string) =>
    `Hola ${agencia.nombre}, me interesa el paquete "${nombre}". ¿Me pasan disponibilidad y el desglose de precios?`,
  aMedida: `Hola ${agencia.nombre}, ninguno de los paquetes es exactamente lo que busco. ¿Podemos armar uno a medida?`,
};

/* ---------- Navegación ---------- */

export const secciones = [
  { id: 'inicio', rotulo: 'Inicio' },
  { id: 'paquetes', rotulo: 'Paquetes' },
  { id: 'nosotros', rotulo: 'Cómo trabajamos' },
  { id: 'contacto', rotulo: 'Contacto' },
];

/* ---------- Hero: destinos que rotan en el panel ----------
   No es un solo lugar: la agencia manda a todos lados y el panel
   tiene que decir eso solo, sin una bajada que lo explique. */

export const destinosHero = [
  { escena: 'montana' as Escena, foto: '/fotos/machu-picchu.webp', lugar: 'Machu Picchu', zona: 'Cusco, Perú', coordenadas: ['13°10′ S', '72°33′ O'] },
  { escena: 'costa' as Escena, foto: '/fotos/santorini.webp', lugar: 'Santorini', zona: 'Cícladas, Grecia', coordenadas: ['36°24′ N', '25°28′ E'] },
  { escena: 'ciudad' as Escena, foto: '/fotos/nueva-york.webp', lugar: 'Nueva York', zona: 'Estados Unidos', coordenadas: ['40°43′ N', '74°00′ O'] },
  { escena: 'selva' as Escena, foto: '/fotos/iguazu.webp', lugar: 'Cataratas del Iguazú', zona: 'Misiones, Argentina', coordenadas: ['25°42′ S', '54°26′ O'] },
  { escena: 'glaciar' as Escena, foto: '/fotos/perito-moreno.webp', lugar: 'Perito Moreno', zona: 'Santa Cruz, Argentina', coordenadas: ['50°30′ S', '73°08′ O'] },
];

/* `datosHero` se define más abajo: sale contado de `paquetes`, así que
   no puede vivir acá arriba. */

/* ---------- Paquetes ---------- */

export type Paquete = {
  id: string;
  nombre: string;
  destino: string;
  region: string;
  escena: Escena;
  noches: number;
  desde: number;
  salidas: string;
  coordenadas: string;
  gancho: string;
  resumen: string;
  incluye: string[];
  noIncluye: string[];
  itinerario: { dia: string; titulo: string; detalle: string }[];
  destacado?: boolean;
  nota?: string;
  /** Foto del destino. Si se saca, queda la ilustración vectorial de fondo. */
  foto?: string;
};

export const regiones = [
  { id: 'todos', rotulo: 'Todos' },
  { id: 'patagonia', rotulo: 'Patagonia' },
  { id: 'norte', rotulo: 'Norte y Cuyo' },
  { id: 'centro', rotulo: 'Litoral y Centro' },
  { id: 'sudamerica', rotulo: 'Sudamérica' },
  { id: 'norteamerica', rotulo: 'Norteamérica y Caribe' },
  { id: 'europa', rotulo: 'Europa' },
  { id: 'asia', rotulo: 'Asia' },
  { id: 'africa', rotulo: 'África y Medio Oriente' },
];

export const paquetes: Paquete[] = [
  /* ---------------- Patagonia ---------------- */
  {
    id: 'calafate-chalten',
    nombre: 'El Calafate y El Chaltén',
    destino: 'Santa Cruz, Argentina',
    region: 'patagonia',
    escena: 'glaciar',
    foto: '/fotos/perito-moreno.webp',
    noches: 7,
    desde: 1180,
    salidas: 'Salidas semanales de octubre a abril',
    coordenadas: '50°20′ S 72°16′ O',
    destacado: true,
    gancho: 'Ver el frente del glaciar romperse y, cuatro días después, amanecer frente al Fitz Roy.',
    resumen:
      'Siete noches partidas entre las dos bases de la estepa: El Calafate para el hielo y El Chaltén para caminar. Vamos con la navegación de la cara sur del Perito Moreno, que es la única que te deja a treinta metros del frente, y dejamos dos días libres en Chaltén porque el viento manda: la Laguna de los Tres se camina cuando el clima abre, no cuando lo dice un itinerario.',
    incluye: [
      'Aéreo Buenos Aires — El Calafate ida y vuelta con equipaje despachado',
      '4 noches en El Calafate y 3 en El Chaltén, hoteles 3 estrellas con desayuno',
      'Traslados de aeropuerto y bus El Calafate — El Chaltén ida y vuelta',
      'Excursión al Perito Moreno con pasarelas y navegación de la cara sur',
      'Entrada al Parque Nacional Los Glaciares por los dos accesos',
      'Trekking guiado a Laguna Capri con guía de montaña matriculado',
    ],
    noIncluye: [
      'Almuerzos y cenas, salvo los indicados',
      'Minitrekking sobre el hielo (se puede sumar, USD 190 por persona)',
      'Tasas de embarque',
    ],
    itinerario: [
      { dia: 'Días 1 y 2', titulo: 'Llegada a El Calafate', detalle: 'Vuelo de mañana, traslado y tarde libre sobre la costanera del lago Argentino. Al día siguiente, día completo en el glaciar: pasarelas por la mañana y navegación a la cara sur después del mediodía, que es cuando mejor cae la luz.' },
      { dia: 'Días 3 y 4', titulo: 'Estepa y ruta 40', detalle: 'Día libre en El Calafate o excursión opcional a Estancia Cristina. Al otro día salimos temprano hacia El Chaltén: son tres horas de ruta con la parada obligada en el mirador donde aparece el Fitz Roy.' },
      { dia: 'Días 5 a 7', titulo: 'El Chaltén a pie', detalle: 'Trekking guiado a Laguna Capri y dos días abiertos para Laguna de los Tres o Loma del Pliegue Tumbado, según el viento. Te pasamos el parte meteorológico cada mañana por WhatsApp.' },
      { dia: 'Día 8', titulo: 'Vuelta', detalle: 'Bus a El Calafate y vuelo de la tarde a Buenos Aires.' },
    ],
    nota: 'La cara sur del glaciar no navega con viento de más de 45 km/h. Si se cancela, se reprograma o se devuelve.',
  },
  {
    id: 'ushuaia',
    nombre: 'Ushuaia, fin del mundo',
    destino: 'Tierra del Fuego, Argentina',
    region: 'patagonia',
    escena: 'costa',
    foto: '/fotos/ushuaia.webp',
    noches: 5,
    desde: 890,
    salidas: 'Todo el año. De junio a septiembre, con nieve.',
    coordenadas: '54°48′ S 68°18′ O',
    gancho: 'El canal de Beagle a las once de la noche, cuando en enero todavía hay luz.',
    resumen:
      'Cinco noches en la ciudad más austral del país. Metemos la navegación por el canal de Beagle hasta el faro Les Éclaireurs y el Parque Nacional Tierra del Fuego con el tren del Fin del Mundo, pero dejamos dos días libres a propósito: Ushuaia se disfruta caminando el puerto sin apuro.',
    incluye: [
      'Aéreo Buenos Aires — Ushuaia ida y vuelta con equipaje despachado',
      '5 noches en hotel 4 estrellas con vista al canal y desayuno',
      'Traslados aeropuerto — hotel',
      'Navegación por el canal de Beagle con desembarco en isla Bridges',
      'Parque Nacional Tierra del Fuego con tren del Fin del Mundo',
      'Entrada al Museo del Presidio',
    ],
    noIncluye: ['Comidas', 'Excursión a la laguna Esmeralda (opcional, USD 75)', 'Tasas de embarque'],
    itinerario: [
      { dia: 'Día 1', titulo: 'Llegada', detalle: 'Traslado y tarde libre. Recomendamos subir al mirador del glaciar Martial para ubicarse en la ciudad desde arriba.' },
      { dia: 'Día 2', titulo: 'Canal de Beagle', detalle: 'Navegación de media jornada hasta el faro Les Éclaireurs con desembarco en isla Bridges, entre lobos y cormoranes.' },
      { dia: 'Día 3', titulo: 'Parque Nacional', detalle: 'Día completo en Tierra del Fuego con el tren del Fin del Mundo y caminata por la senda costera.' },
      { dia: 'Días 4 y 5', titulo: 'Libres', detalle: 'Dos días abiertos para la laguna Esmeralda, canopy en el valle o simplemente el puerto y los restaurantes de centolla.' },
    ],
  },
  {
    id: 'bariloche',
    nombre: 'Bariloche y Siete Lagos',
    destino: 'Río Negro y Neuquén',
    region: 'patagonia',
    escena: 'bosque',
    foto: '/fotos/bariloche.webp',
    noches: 6,
    desde: 780,
    salidas: 'Todo el año. Julio y agosto, con nieve en el Catedral.',
    coordenadas: '41°08′ S 71°18′ O',
    gancho: 'La ruta de los Siete Lagos manejando vos, con los desvíos que valen la pena marcados en el mapa.',
    resumen:
      'Seis noches con auto alquilado incluido, porque el sur de Neuquén se arruina viajándolo en micro. Te dejamos el circuito armado con las paradas que la mayoría se pierde: el mirador de Bahía Mansa, la bajada a Villa Traful y la llegada a Arrayanes antes de que atraque el catamarán del mediodía.',
    incluye: [
      'Aéreo Buenos Aires — Bariloche ida y vuelta con equipaje despachado',
      '4 noches en Bariloche y 2 en Villa La Angostura, con desayuno',
      'Auto de alquiler categoría compacto por 5 días, con seguro y kilometraje libre',
      'Circuito Chico y cerro Campanario',
      'Navegación a la isla Victoria y el bosque de Arrayanes',
      'Mapa de ruta anotado por nosotros con paradas, tiempos y dónde cargar nafta',
    ],
    noIncluye: ['Comidas', 'Combustible', 'Cerro Tronador (opcional, USD 85)'],
    itinerario: [
      { dia: 'Días 1 y 2', titulo: 'Bariloche', detalle: 'Llegada, retiro del auto y Circuito Chico completo con subida al Campanario para la panorámica.' },
      { dia: 'Día 3', titulo: 'Isla Victoria', detalle: 'Navegación de día completo desde Puerto Pañuelo a la isla y el bosque de Arrayanes.' },
      { dia: 'Días 4 y 5', titulo: 'Siete Lagos', detalle: 'Ruta 40 hasta Villa La Angostura y de ahí a San Martín de los Andes, con desvío a Villa Traful.' },
      { dia: 'Días 6 y 7', titulo: 'Vuelta', detalle: 'Regreso relajado a Bariloche, tarde de chocolates en Mitre y vuelo del día siguiente.' },
    ],
  },
  {
    id: 'peninsula-valdes',
    nombre: 'Península Valdés y ballenas',
    destino: 'Chubut, Argentina',
    region: 'patagonia',
    escena: 'costa',
    foto: '/fotos/peninsula-valdes.webp',
    noches: 6,
    desde: 830,
    salidas: 'Ballenas de junio a diciembre. Pingüinos de septiembre a marzo.',
    coordenadas: '42°30′ S 64°00′ O',
    gancho: 'Una ballena franca de quince metros apoyada al lado del gomón, sin hacer nada.',
    resumen:
      'Seis noches en Puerto Madryn con el avistaje embarcado desde Puerto Pirámides y la colonia de Punta Tombo. Programamos las salidas al agua sobre el final de la mañana, que es cuando el viento del golfo todavía no levantó, y dejamos un día de reserva por si el mar no da: la ballena no se agenda.',
    incluye: [
      'Aéreo Buenos Aires — Trelew ida y vuelta con equipaje despachado',
      '6 noches en hotel 4 estrellas en Puerto Madryn con desayuno',
      'Traslados aeropuerto — hotel',
      'Avistaje embarcado de ballenas desde Puerto Pirámides, con día de reserva',
      'Día completo en Península Valdés: Caleta Valdés, Punta Norte y Puerto Pirámides',
      'Excursión a Punta Tombo con guía de fauna',
    ],
    noIncluye: ['Comidas', 'Buceo bautismo (opcional, USD 90)', 'Entrada al área natural protegida'],
    itinerario: [
      { dia: 'Día 1', titulo: 'Llegada a Madryn', detalle: 'Traslado desde Trelew y tarde en El Doradillo, la playa donde las ballenas se acercan a treinta metros de la orilla sin necesidad de barco.' },
      { dia: 'Día 2', titulo: 'Avistaje embarcado', detalle: 'Salida a Puerto Pirámides, navegación de una hora y media entre madres y crías, y tarde libre en el pueblo.' },
      { dia: 'Días 3 y 4', titulo: 'La península entera', detalle: 'Día completo por Caleta Valdés y Punta Norte, con elefantes marinos y, si es marzo, orcas atacando en la restinga. Al otro día, Punta Tombo.' },
      { dia: 'Días 5 a 7', titulo: 'Golfo Nuevo', detalle: 'Días libres para buceo, kayak o el Museo Oceanográfico, más el día de reserva por si el mar cerró antes.' },
    ],
    nota: 'Si la salida embarcada se cae por viento los dos días, se devuelve el importe de la excursión completo.',
  },
  {
    id: 'antartida',
    nombre: 'Antártida: cruce del Drake',
    destino: 'Península Antártica',
    region: 'patagonia',
    escena: 'glaciar',
    foto: '/fotos/antartida.webp',
    noches: 11,
    desde: 9700,
    salidas: 'Cupos de noviembre a marzo. Se reserva con 8 meses de anticipación.',
    coordenadas: '64°00′ S 62°00′ O',
    gancho: 'El viaje más caro que vendemos y el único que nadie nos discutió después.',
    resumen:
      'Once noches: dos en Ushuaia y nueve a bordo, con dos días de cruce del pasaje de Drake en cada sentido y cinco jornadas de desembarcos en la península. Es un viaje serio y caro, así que lo cotizamos con la letra chica arriba de la mesa: qué categoría de camarote, qué pasa si el clima corta desembarcos y cómo funciona el seguro de evacuación obligatorio.',
    incluye: [
      'Aéreo Buenos Aires — Ushuaia ida y vuelta con equipaje despachado',
      '2 noches en Ushuaia, una antes del embarque y una después',
      '9 noches a bordo en camarote exterior con pensión completa',
      'Todos los desembarcos en zodiac con guías y personal de expedición',
      'Botas de goma, campera de expedición y charlas de a bordo',
      'Seguro de evacuación médica antártica, obligatorio para embarcar',
    ],
    noIncluye: ['Bebidas a bordo', 'Kayak y camping antártico (opcionales)', 'Propinas de tripulación'],
    itinerario: [
      { dia: 'Días 1 y 2', titulo: 'Ushuaia', detalle: 'Llegada, noche en la ciudad y embarque al mediodía del segundo día por el canal de Beagle.' },
      { dia: 'Días 3 y 4', titulo: 'Pasaje de Drake', detalle: 'Dos días de navegación con charlas de fauna y glaciología. El Drake es lo que es: se viaja con pastillas y se duerme mucho.' },
      { dia: 'Días 5 a 9', titulo: 'Península Antártica', detalle: 'Cinco jornadas con dos desembarcos diarios según hielo y clima: bahía Paraíso, isla Decepción, canal Lemaire y colonias de pingüinos papúa y adelia.' },
      { dia: 'Días 10 a 12', titulo: 'Regreso', detalle: 'Vuelta por el Drake, desembarco en Ushuaia, última noche y vuelo a Buenos Aires.' },
    ],
    nota: 'El itinerario a bordo lo define el capitán según hielo y viento. Ninguna salida antártica garantiza desembarcos específicos, y quien te diga lo contrario te está mintiendo.',
  },

  /* ---------------- Norte y Cuyo ---------------- */
  {
    id: 'salta-jujuy',
    nombre: 'Salta, Jujuy y la Puna',
    destino: 'Noroeste argentino',
    region: 'norte',
    escena: 'puna',
    foto: '/fotos/humahuaca.webp',
    noches: 8,
    desde: 1040,
    salidas: 'De abril a noviembre. Enero y febrero, con riesgo de cortes por lluvia.',
    coordenadas: '23°37′ S 65°21′ O',
    gancho: 'Ocho noches para hacer la Puna despacio, que es la única forma de hacerla.',
    resumen:
      'La Quebrada de Humahuaca, Purmamarca, las Salinas Grandes y el tramo largo hasta Tolar Grande, con dos noches en San Antonio de los Cobres para aclimatar bien. No lo comprimimos en cinco días: a 4.000 metros el apuro se paga con dolor de cabeza.',
    incluye: [
      'Aéreo Buenos Aires — Salta ida y vuelta con equipaje despachado',
      '8 noches: 3 en Salta, 2 en Purmamarca, 2 en San Antonio de los Cobres y 1 en Cachi',
      'Camioneta 4x4 con chofer y guía de la zona durante todo el circuito',
      'Quebrada de Humahuaca, Purmamarca y Salinas Grandes',
      'Cuesta del Obispo, Parque Nacional Los Cardones y Cachi',
      'Desayunos y 4 almuerzos en ruta',
    ],
    noIncluye: ['Cenas', 'Tren a las Nubes (opcional, USD 110)', 'Bodegas de Cafayate (opcional)'],
    itinerario: [
      { dia: 'Días 1 a 3', titulo: 'Salta y valle de Lerma', detalle: 'Llegada, ciudad, teleférico al San Bernardo y un día completo por la Cuesta del Obispo hasta Cachi por el recto del Tin Tin.' },
      { dia: 'Días 4 y 5', titulo: 'Quebrada de Humahuaca', detalle: 'Purmamarca, Tilcara y el Pucará, Humahuaca y la Serranía del Hornocal a última hora de la tarde, que es cuando se pone naranja.' },
      { dia: 'Días 6 y 7', titulo: 'Puna', detalle: 'Salinas Grandes al amanecer, ascenso a San Antonio de los Cobres y día completo hacia el desierto del Diablo y Tolar Grande.' },
      { dia: 'Días 8 y 9', titulo: 'Bajada', detalle: 'Regreso a Salta por la ruta 51, última noche en la ciudad y vuelo de la tarde.' },
    ],
    nota: 'Arriba de 3.500 metros llevamos oxígeno en la camioneta y el guía tiene formación en primeros auxilios de altura.',
  },
  {
    id: 'mendoza',
    nombre: 'Mendoza, alta montaña y bodegas',
    destino: 'Mendoza, Argentina',
    region: 'norte',
    escena: 'montana',
    foto: '/fotos/aconcagua.webp',
    noches: 4,
    desde: 560,
    salidas: 'Todo el año. Vendimia en marzo, con cupo limitado.',
    coordenadas: '32°53′ S 68°50′ O',
    gancho: 'Tres bodegas elegidas por lo que hacen, no por cuánta comisión pagan.',
    resumen:
      'Cuatro noches con el día completo de alta montaña hasta Puente del Inca y el mirador del Aconcagua, y dos jornadas de bodegas en Luján de Cuyo y el Valle de Uco. Las tres bodegas las elegimos nosotros y son chicas: se visita con el enólogo, no con un guion.',
    incluye: [
      'Aéreo Buenos Aires — Mendoza ida y vuelta con equipaje despachado',
      '4 noches en hotel boutique del centro con desayuno',
      'Alta montaña: Uspallata, Puente del Inca y mirador del Aconcagua',
      'Día de bodegas en Luján de Cuyo con dos degustaciones y almuerzo',
      'Día en el Valle de Uco con degustación y almuerzo de pasos',
      'Traslados y remises entre bodegas (nadie maneja después de catar)',
    ],
    noIncluye: ['Cenas', 'Rafting en el río Mendoza (opcional, USD 55)'],
    itinerario: [
      { dia: 'Día 1', titulo: 'Llegada', detalle: 'Traslado y tarde libre por el Parque San Martín y la peatonal Sarmiento.' },
      { dia: 'Día 2', titulo: 'Alta montaña', detalle: 'Día completo por la ruta 7 hasta Las Cuevas: Uspallata, Puente del Inca y el mirador del Aconcagua.' },
      { dia: 'Día 3', titulo: 'Luján de Cuyo', detalle: 'Dos bodegas familiares con almuerzo entre viñedos.' },
      { dia: 'Días 4 y 5', titulo: 'Valle de Uco', detalle: 'Degustación vertical de malbec de altura y almuerzo de pasos con vista a los Andes. Vuelo del día siguiente.' },
    ],
  },
  {
    id: 'talampaya',
    nombre: 'Talampaya e Ischigualasto',
    destino: 'La Rioja y San Juan',
    region: 'norte',
    escena: 'puna',
    foto: '/fotos/talampaya.webp',
    noches: 6,
    desde: 690,
    salidas: 'De marzo a noviembre. Diciembre a febrero pasa los 40 °C al mediodía.',
    coordenadas: '29°47′ S 67°50′ O',
    gancho: 'Doscientos millones de años de sedimento en dos parques que se visitan el mismo día.',
    resumen:
      'Seis noches recorriendo el corredor de los cañones: Talampaya con sus paredones de 150 metros, el Valle de la Luna con las formaciones que todos vieron en foto, y la Cuesta de Miranda de por medio. Es un circuito de auto y ruta, así que lo hacemos con vehículo propio y guía, no con excursiones sueltas.',
    incluye: [
      'Aéreo Buenos Aires — La Rioja ida y vuelta con equipaje despachado',
      '6 noches entre Villa Unión, San Agustín de Valle Fértil y La Rioja, con desayuno',
      'Vehículo con chofer y guía durante todo el circuito',
      'Excursión al Cañón de Talampaya en vehículo autorizado del parque',
      'Ischigualasto en circuito tradicional, con salida de última hora',
      'Cuesta de Miranda y Laguna Brava',
    ],
    noIncluye: ['Comidas', 'Ischigualasto de luna llena (opcional, según calendario)', 'Entradas a los parques'],
    itinerario: [
      { dia: 'Días 1 y 2', titulo: 'La Rioja y Villa Unión', detalle: 'Llegada, ciudad y traslado por la ruta 40 hasta Villa Unión, base para los dos parques.' },
      { dia: 'Día 3', titulo: 'Talampaya', detalle: 'Cañón completo por la mañana, con el jardín botánico y los petroglifos, y tarde en la Ciudad Perdida.' },
      { dia: 'Días 4 y 5', titulo: 'Ischigualasto', detalle: 'Cruce a San Agustín y Valle de la Luna en el último turno del día: el Submarino y el Hongo con luz rasante.' },
      { dia: 'Días 6 y 7', titulo: 'Laguna Brava y vuelta', detalle: 'Subida a la reserva de Laguna Brava entre vicuñas, última noche en La Rioja y vuelo del día siguiente.' },
    ],
  },

  /* ---------------- Litoral y Centro ---------------- */
  {
    id: 'iguazu',
    nombre: 'Cataratas del Iguazú',
    destino: 'Misiones, Argentina',
    region: 'centro',
    escena: 'selva',
    foto: '/fotos/iguazu.webp',
    noches: 4,
    desde: 620,
    salidas: 'Todo el año. Mejor caudal de enero a marzo.',
    coordenadas: '25°41′ S 54°26′ O',
    destacado: true,
    gancho: 'Dos días de entrada al lado argentino: el primero te marea, el segundo lo entendés.',
    resumen:
      'Cuatro noches con las dos entradas al parque argentino incluidas, que es la única forma de ver la Garganta del Diablo temprano y sin fila. Sumamos el lado brasilero, que es donde se toma la panorámica, y la Gran Aventura en gomón para los que quieren mojarse en serio.',
    incluye: [
      'Aéreo Buenos Aires — Puerto Iguazú ida y vuelta con equipaje despachado',
      '4 noches en hotel 4 estrellas con desayuno y pileta',
      'Traslados aeropuerto — hotel',
      'Dos días de entrada al Parque Nacional Iguazú, lado argentino',
      'Excursión al lado brasilero con trámite migratorio asistido',
      'Gran Aventura: paseo náutico bajo los saltos',
    ],
    noIncluye: ['Comidas', 'Tasa de reciprocidad brasilera si corresponde', 'Ruinas de San Ignacio (opcional, USD 60)'],
    itinerario: [
      { dia: 'Día 1', titulo: 'Llegada', detalle: 'Traslado y tarde libre. Si llegás temprano se puede hacer el Hito Tres Fronteras al atardecer.' },
      { dia: 'Día 2', titulo: 'Lado argentino, primera vuelta', detalle: 'Entrada a las 8, tren a la Garganta del Diablo antes que el grueso de la gente, y circuito superior.' },
      { dia: 'Día 3', titulo: 'Brasil y gomón', detalle: 'Por la mañana, el lado brasilero para la vista panorámica. Por la tarde, la Gran Aventura.' },
      { dia: 'Día 4', titulo: 'Lado argentino, segunda vuelta', detalle: 'Circuito inferior y sendero Macuco, con la entrada del día anterior revalidada al 50%.' },
    ],
    nota: 'Las dos entradas al parque argentino salen de nuestro bolsillo, no del tuyo: es la única manera de no correr.',
  },
  {
    id: 'ibera',
    nombre: 'Esteros del Iberá',
    destino: 'Corrientes, Argentina',
    region: 'centro',
    escena: 'selva',
    foto: '/fotos/ibera.webp',
    noches: 5,
    desde: 740,
    salidas: 'Todo el año. De mayo a septiembre, sin mosquitos y con mejor avistaje.',
    coordenadas: '28°32′ S 57°09′ O',
    gancho: 'El segundo humedal más grande de Sudamérica, y ahí adentro hay yaguaretés otra vez.',
    resumen:
      'Cinco noches en Colonia Carlos Pellegrini, sobre la laguna Iberá, con salidas en lancha al amanecer y al atardecer, que es cuando la fauna se mueve. Sumamos el portal San Nicolás para ver el trabajo de reintroducción de especies: yaguareté, oso hormiguero, guacamayo rojo y venado de las pampas.',
    incluye: [
      'Aéreo Buenos Aires — Posadas ida y vuelta con equipaje despachado',
      'Traslado terrestre Posadas — Colonia Carlos Pellegrini ida y vuelta',
      '5 noches en posada con pensión completa (en el Iberá no hay dónde comer afuera)',
      'Dos salidas diarias en lancha con guía de naturaleza',
      'Safari nocturno y caminata por el sendero de los monos carayá',
      'Visita al portal San Nicolás y al centro de reintroducción',
    ],
    noIncluye: ['Bebidas', 'Cabalgata (opcional, USD 40)', 'Binoculares'],
    itinerario: [
      { dia: 'Días 1 y 2', titulo: 'Llegada a los esteros', detalle: 'Vuelo a Posadas y cuatro horas de ruta, las últimas de tierra. Primera salida en lancha al atardecer entre yacarés y ciervos de los pantanos.' },
      { dia: 'Días 3 y 4', titulo: 'Laguna y monte', detalle: 'Salidas al amanecer, caminatas por el monte de espinal y safari nocturno con linterna para ver aguará guazú.' },
      { dia: 'Día 5', titulo: 'Portal San Nicolás', detalle: 'Día completo en la zona de reintroducción, con los corrales de yaguareté y los pastizales del venado.' },
      { dia: 'Día 6', titulo: 'Vuelta', detalle: 'Regreso a Posadas y vuelo de la tarde.' },
    ],
    nota: 'Se viaja liviano y con ropa clara. La posada no tiene aire acondicionado central y en enero eso se nota.',
  },
  {
    id: 'cordoba',
    nombre: 'Sierras de Córdoba y Traslasierra',
    destino: 'Córdoba, Argentina',
    region: 'centro',
    escena: 'montana',
    foto: '/fotos/cordoba.webp',
    noches: 5,
    desde: 480,
    salidas: 'Todo el año. Los cóndores del Condorito vuelan mejor de septiembre a abril.',
    coordenadas: '31°38′ S 64°45′ O',
    gancho: 'El fin de semana largo que hacés en auto, pero hecho bien y con cinco noches.',
    resumen:
      'Cinco noches partidas entre el Valle de Punilla y Traslasierra, cruzando por el Camino de las Altas Cumbres. Metemos la caminata al balcón norte de la Quebrada del Condorito, que es donde se ven los cóndores volando debajo tuyo, y dos noches en Nono o Mina Clavero para bajar el ritmo.',
    incluye: [
      'Aéreo Buenos Aires — Córdoba ida y vuelta con equipaje despachado',
      '3 noches en Villa Carlos Paz o La Cumbre y 2 en Traslasierra, con desayuno',
      'Auto de alquiler categoría compacto por 5 días, con seguro',
      'Caminata guiada al balcón norte de la Quebrada del Condorito',
      'Entrada al Parque Nacional y a la Reserva Hídrica de Achala',
      'Mapa de ruta con las paradas del Camino de las Altas Cumbres',
    ],
    noIncluye: ['Comidas', 'Combustible', 'Estancias jesuíticas (opcional, USD 45)'],
    itinerario: [
      { dia: 'Días 1 y 2', titulo: 'Punilla', detalle: 'Llegada, retiro del auto y dos días entre La Cumbre, Los Cocos y el Cerro Uritorco, con parada en Capilla del Monte.' },
      { dia: 'Día 3', titulo: 'Condorito', detalle: 'Salida temprano por las Altas Cumbres, caminata de tres horas ida y vuelta hasta el balcón norte y bajada a Traslasierra.' },
      { dia: 'Días 4 y 5', titulo: 'Traslasierra', detalle: 'Mina Clavero, Nono y los ríos de la zona. Tarde libre y museo Rocsen si el día se pone feo.' },
      { dia: 'Día 6', titulo: 'Vuelta', detalle: 'Regreso a Córdoba capital por Villa Dolores y vuelo de la tarde.' },
    ],
  },

  /* ---------------- Sudamérica ---------------- */
  {
    id: 'machu-picchu',
    nombre: 'Cusco, Valle Sagrado y Machu Picchu',
    destino: 'Perú',
    region: 'sudamerica',
    escena: 'montana',
    foto: '/fotos/machu-picchu.webp',
    noches: 8,
    desde: 1690,
    salidas: 'Todo el año. Enero a marzo es temporada de lluvias.',
    coordenadas: '13°09′ S 72°32′ O',
    destacado: true,
    gancho: 'Dos noches en el Valle Sagrado antes de Cusco, que es lo que evita que te agarre la altura.',
    resumen:
      'Ocho noches con la subida a Machu Picchu en tren y bus, entradas con horario y circuito asignado desde acá. Lo importante es el orden: dormimos primero en el Valle Sagrado, a 2.800 metros, y recién después subimos a Cusco, que está a 3.400. La mitad de la gente que la pasa mal en Cusco es porque llegó del aeropuerto directo al hotel del centro.',
    incluye: [
      'Aéreo Buenos Aires — Lima — Cusco ida y vuelta con equipaje despachado',
      '2 noches en Lima, 3 en el Valle Sagrado, 2 en Cusco y 1 en Aguas Calientes',
      'Tren a Aguas Calientes ida y vuelta en servicio panorámico',
      'Entrada a Machu Picchu con circuito y horario asignado, más bus de subida',
      'Valle Sagrado completo: Pisac, Ollantaytambo, Chinchero y Moray',
      'Traslados y guía de habla hispana en todas las excursiones',
    ],
    noIncluye: ['Comidas, salvo desayunos', 'Montaña Huayna Picchu (opcional, cupo limitado)', 'Tasas de embarque'],
    itinerario: [
      { dia: 'Días 1 y 2', titulo: 'Lima', detalle: 'Llegada, Miraflores y Barranco, centro histórico y una noche de comida peruana que justifica el viaje sola.' },
      { dia: 'Días 3 a 5', titulo: 'Valle Sagrado', detalle: 'Vuelo a Cusco y traslado directo al valle, sin quedarse en la ciudad. Pisac, las salineras de Maras, Moray y Ollantaytambo.' },
      { dia: 'Días 6 y 7', titulo: 'Machu Picchu', detalle: 'Tren desde Ollantaytambo, noche en Aguas Calientes y subida en el primer bus del día. Circuito clásico con guía.' },
      { dia: 'Días 8 y 9', titulo: 'Cusco', detalle: 'Ciudad, Sacsayhuamán, San Blas y el Qorikancha, ya aclimatados. Vuelo de regreso vía Lima.' },
    ],
    nota: 'Las entradas a Machu Picchu tienen cupo diario y se agotan con meses de anticipación. Sin fecha confirmada no reservamos nada más.',
  },
  {
    id: 'rio',
    nombre: 'Río de Janeiro',
    destino: 'Brasil',
    region: 'sudamerica',
    escena: 'costa',
    foto: '/fotos/rio.webp',
    noches: 5,
    desde: 740,
    salidas: 'Todo el año. Carnaval, con cupo y precio aparte.',
    coordenadas: '22°54′ S 43°10′ O',
    gancho: 'Hotel a dos cuadras de Copacabana, del lado en el que se camina de noche.',
    resumen:
      'Cinco noches en Zona Sur con Cristo Redentor y Pan de Azúcar resueltos con entrada anticipada. Elegimos hoteles entre las calles Bolívar y Santa Clara: es la franja de Copacabana que sigue teniendo vida a las once de la noche y queda cerca del metro.',
    incluye: [
      'Aéreo Buenos Aires — Río de Janeiro ida y vuelta con equipaje despachado',
      '5 noches en hotel 4 estrellas en Copacabana con desayuno',
      'Traslados aeropuerto — hotel',
      'Cristo Redentor con tren del Corcovado y entrada anticipada',
      'Pan de Azúcar con los dos tramos de teleférico',
      'City tour por Santa Teresa, Lapa y la escalera de Selarón',
    ],
    noIncluye: ['Comidas', 'Asistencia al viajero (obligatoria, la cotizamos aparte)', 'Favela tour'],
    itinerario: [
      { dia: 'Día 1', titulo: 'Llegada', detalle: 'Traslado y tarde de playa para entrar en clima.' },
      { dia: 'Día 2', titulo: 'Corcovado', detalle: 'Cristo Redentor temprano, cuando todavía no se llenó, y tarde libre en Ipanema.' },
      { dia: 'Día 3', titulo: 'Pan de Azúcar', detalle: 'Subida en teleférico al atardecer, que es el momento en que vale.' },
      { dia: 'Días 4 y 5', titulo: 'Ciudad y playa', detalle: 'Santa Teresa, Lapa y Selarón por la mañana. Último día libre.' },
    ],
  },
  {
    id: 'atacama',
    nombre: 'San Pedro de Atacama',
    destino: 'Chile',
    region: 'sudamerica',
    escena: 'puna',
    foto: '/fotos/atacama.webp',
    noches: 5,
    desde: 1290,
    salidas: 'Todo el año. Julio y agosto, con noches de −5 °C.',
    coordenadas: '22°54′ S 68°12′ O',
    gancho: 'El desierto más seco del planeta y, de noche, el mejor cielo del hemisferio sur.',
    resumen:
      'Cinco noches en San Pedro con los géiseres del Tatio al amanecer, las lagunas altiplánicas y el Valle de la Luna al atardecer. Sumamos una salida astronómica con telescopio, que es la razón por la que medio mundo va hasta ahí: a 2.400 metros, sin humedad y sin luz artificial, la Vía Láctea se ve como en las fotos.',
    incluye: [
      'Aéreo Buenos Aires — Calama vía Santiago, ida y vuelta con equipaje',
      'Traslado Calama — San Pedro de Atacama ida y vuelta',
      '5 noches en hotel con desayuno en San Pedro',
      'Géiseres del Tatio con desayuno en altura',
      'Lagunas Altiplánicas, Piedras Rojas y Salar de Atacama',
      'Valle de la Luna al atardecer y tour astronómico con telescopio',
    ],
    noIncluye: ['Almuerzos y cenas', 'Sandboard (opcional, USD 35)', 'Ingreso a áreas protegidas'],
    itinerario: [
      { dia: 'Días 1 y 2', titulo: 'Llegada y aclimatación', detalle: 'Vuelo vía Santiago, traslado y primera tarde suave: Valle de la Luna y Valle de la Muerte al atardecer.' },
      { dia: 'Día 3', titulo: 'Tatio', detalle: 'Salida a las 4:30 para llegar a los géiseres con la primera luz, que es cuando las fumarolas se ven. Regreso al mediodía y tarde libre.' },
      { dia: 'Día 4', titulo: 'Altiplano', detalle: 'Día completo por Toconao, el salar, las lagunas Miscanti y Miñiques y Piedras Rojas, arriba de 4.000 metros.' },
      { dia: 'Días 5 y 6', titulo: 'Cielo y vuelta', detalle: 'Lagunas Baltinache por la mañana, tour astronómico a la noche y regreso al día siguiente.' },
    ],
    nota: 'El tour astronómico no sale con luna llena. Si tus fechas caen ahí, lo avisamos antes de reservar.',
  },

  /* ---------------- Norteamérica y Caribe ---------------- */
  {
    id: 'cancun',
    nombre: 'Cancún y Riviera Maya',
    destino: 'Quintana Roo, México',
    region: 'norteamerica',
    escena: 'costa',
    foto: '/fotos/chichen-itza.webp',
    noches: 7,
    desde: 1620,
    salidas: 'Todo el año. Septiembre y octubre son temporada de huracanes.',
    coordenadas: '21°09′ N 86°50′ O',
    destacado: true,
    gancho: 'All inclusive de verdad, con la lista de lo que el hotel cobra aparte por escrito.',
    resumen:
      'Siete noches en un all inclusive de la zona hotelera, con excursión a Chichén Itzá y un día de cenotes. Antes de reservar te pasamos por escrito qué cobra aparte cada hotel que te cotizamos: los restaurantes à la carte, el wifi de la habitación y el traslado al aeropuerto son las tres letras chicas de siempre.',
    incluye: [
      'Aéreo Buenos Aires — Cancún ida y vuelta con equipaje despachado',
      '7 noches en resort all inclusive frente al mar',
      'Traslados aeropuerto — hotel en van privada',
      'Excursión a Chichén Itzá con guía y almuerzo',
      'Día de cenotes en la ruta de Valladolid',
      'Asistencia al viajero por los días del viaje',
    ],
    noIncluye: ['Impuestos de salida de México', 'Tour a Isla Mujeres (opcional, USD 95)', 'Propinas'],
    itinerario: [
      { dia: 'Días 1 a 3', titulo: 'Aterrizar y no hacer nada', detalle: 'Llegada, traslado y tres días de playa y resort sin agenda.' },
      { dia: 'Día 4', titulo: 'Chichén Itzá', detalle: 'Salida temprano, la pirámide de Kukulkán con guía y almuerzo en Valladolid.' },
      { dia: 'Día 5', titulo: 'Cenotes', detalle: 'Dos cenotes, uno abierto y uno de caverna, en la ruta de los pueblos mayas.' },
      { dia: 'Días 6 a 8', titulo: 'Cierre', detalle: 'Días libres en el resort y traslado al aeropuerto.' },
    ],
  },
  {
    id: 'punta-cana',
    nombre: 'Punta Cana',
    destino: 'República Dominicana',
    region: 'norteamerica',
    escena: 'costa',
    foto: '/fotos/punta-cana.webp',
    noches: 7,
    desde: 1490,
    salidas: 'Todo el año. De agosto a octubre, temporada de huracanes.',
    coordenadas: '18°34′ N 68°22′ O',
    gancho: 'Bávaro o Uvero Alto: te explicamos la diferencia antes de que elijas, no después.',
    resumen:
      'Siete noches all inclusive en la costa este dominicana. La decisión que importa no es la categoría del hotel sino la playa: Bávaro tiene todo cerca y mucha gente, Uvero Alto es más tranquila pero quedás a cuarenta minutos de todo. Te mostramos los dos con precios y elegís vos.',
    incluye: [
      'Aéreo Buenos Aires — Punta Cana ida y vuelta con equipaje despachado',
      '7 noches en resort all inclusive con todas las comidas y bebidas',
      'Traslados aeropuerto — hotel',
      'Excursión a Isla Saona en catamarán y lancha rápida, con almuerzo',
      'Asistencia al viajero por los días del viaje',
      'Tarjeta de turista dominicana',
    ],
    noIncluye: ['Excursión a Santo Domingo (opcional, USD 80)', 'Buceo', 'Propinas'],
    itinerario: [
      { dia: 'Días 1 a 3', titulo: 'Instalarse', detalle: 'Llegada, traslado y tres días de playa, pileta y resort.' },
      { dia: 'Día 4', titulo: 'Isla Saona', detalle: 'Día completo con piscina natural, almuerzo en la isla y vuelta en catamarán.' },
      { dia: 'Días 5 a 8', titulo: 'Libres', detalle: 'Días abiertos para snorkel, buggies o directamente nada, más el traslado de regreso.' },
    ],
  },
  {
    id: 'nueva-york',
    nombre: 'Nueva York',
    destino: 'Estados Unidos',
    region: 'norteamerica',
    escena: 'ciudad',
    foto: '/fotos/nueva-york.webp',
    noches: 6,
    desde: 1980,
    salidas: 'Todo el año. Diciembre con precios de temporada alta.',
    coordenadas: '40°42′ N 74°00′ O',
    gancho: 'Hotel en Midtown y metro ilimitado: en Nueva York, dormir lejos se paga en horas.',
    resumen:
      'Seis noches en Manhattan con la MetroCard cargada y las entradas caras compradas de antemano. Elegimos hoteles entre la 30 y la 50, que no son los más lindos pero te ahorran cuarenta minutos de viaje por día. Las entradas a los observatorios y museos van con fecha y hora, que es la única manera de no perder medio día en fila.',
    incluye: [
      'Aéreo Buenos Aires — Nueva York ida y vuelta con equipaje despachado',
      '6 noches en hotel 3 estrellas superior en Midtown Manhattan',
      'Traslados aeropuerto — hotel',
      'MetroCard de 7 días con viajes ilimitados',
      'Entradas con horario al Top of the Rock, al MoMA y al Memorial del 11-S',
      'Ferry a la Estatua de la Libertad con acceso al pedestal',
    ],
    noIncluye: ['Comidas', 'Visa estadounidense y su trámite', 'Musicales de Broadway (los conseguimos aparte)'],
    itinerario: [
      { dia: 'Días 1 y 2', titulo: 'Midtown', detalle: 'Llegada, Times Square, la Quinta Avenida, Bryant Park y Top of the Rock al atardecer, que es cuando se ve el Empire y el parque a la vez.' },
      { dia: 'Día 3', titulo: 'Downtown', detalle: 'Memorial del 11-S, Wall Street, ferry a la Estatua de la Libertad y vuelta caminando por el puente de Brooklyn.' },
      { dia: 'Día 4', titulo: 'Central Park y museos', detalle: 'Mañana en el parque, tarde en el MoMA o el Met según el clima.' },
      { dia: 'Días 5 a 7', titulo: 'Brooklyn y libres', detalle: 'Dumbo, Williamsburg, el High Line y Chelsea Market. Últimos días abiertos para compras.' },
    ],
    nota: 'Sin visa vigente no se reserva. El turno en la embajada puede demorar meses, así que ese es el primer paso, no el último.',
  },
  {
    id: 'orlando',
    nombre: 'Orlando: Disney y Universal',
    destino: 'Florida, Estados Unidos',
    region: 'norteamerica',
    escena: 'ciudad',
    foto: '/fotos/orlando.webp',
    noches: 9,
    desde: 2450,
    salidas: 'Todo el año. Enero y febrero, con menos filas y mejor clima.',
    coordenadas: '28°32′ N 81°23′ O',
    gancho: 'Nueve noches, siete días de parque y dos de descanso en el medio. Los que van de corrido vuelven odiándolo.',
    resumen:
      'El viaje familiar clásico, armado con el calendario en la mano. Metemos cuatro días de Disney, tres de Universal y dejamos dos días libres intercalados, porque hacer siete parques seguidos con chicos termina mal. Te explicamos cómo funcionan las reservas de atracciones y qué conviene pagar aparte y qué no.',
    incluye: [
      'Aéreo Buenos Aires — Orlando ida y vuelta con equipaje despachado',
      '9 noches en hotel con desayuno y traslado a los parques',
      'Auto de alquiler categoría intermedia por 9 días, con seguro',
      'Entrada de 4 días a los parques de Walt Disney World',
      'Entrada de 3 días con Park to Park a Universal Studios e Islands of Adventure',
      'Asistencia al viajero y sillita de auto para menores si hace falta',
    ],
    noIncluye: ['Comidas', 'Visa estadounidense y su trámite', 'Genie+ y accesos rápidos de los parques'],
    itinerario: [
      { dia: 'Días 1 a 4', titulo: 'Disney', detalle: 'Llegada y arranque por Magic Kingdom, después Epcot, Hollywood Studios y Animal Kingdom, con un día de descanso intercalado.' },
      { dia: 'Día 5', titulo: 'Día libre', detalle: 'Outlets, pileta del hotel o Disney Springs. Sirve para lavar ropa y recuperar piernas.' },
      { dia: 'Días 6 a 8', titulo: 'Universal', detalle: 'Los dos parques con Park to Park para poder tomar el tren de Hogwarts entre ambos, más un día de Volcano Bay si hace calor.' },
      { dia: 'Días 9 y 10', titulo: 'Cierre', detalle: 'Último día libre para compras y vuelo de regreso.' },
    ],
    nota: 'Las reservas de atracciones de Disney se abren 60 días antes y se agotan en horas. Te las hacemos nosotros con tu cuenta, sin cargo.',
  },

  /* ---------------- Europa ---------------- */
  {
    id: 'europa-clasica',
    nombre: 'Madrid, París y Roma',
    destino: 'Europa',
    region: 'europa',
    escena: 'ciudad',
    foto: '/fotos/torre-eiffel.webp',
    noches: 12,
    desde: 2480,
    salidas: 'De abril a octubre. Salidas grupales en julio.',
    coordenadas: '48°51′ N 2°21′ E',
    destacado: true,
    gancho: 'Doce noches en tres ciudades, moviéndose en tren y avión, no en micro de excursión.',
    resumen:
      'El clásico europeo hecho con criterio: cuatro noches por ciudad, hoteles a menos de diez minutos a pie del centro histórico y los tramos entre ciudades resueltos con vuelos cortos y tren de alta velocidad. Las entradas al Prado, al Louvre y al Vaticano van compradas con fecha y hora desde acá.',
    incluye: [
      'Aéreo Buenos Aires — Madrid y Roma — Buenos Aires con equipaje despachado',
      '12 noches en hoteles 3 y 4 estrellas céntricos con desayuno',
      'Vuelo Madrid — París y tren de alta velocidad París — Roma vía Milán',
      'Entradas con fecha y hora al Museo del Prado, el Louvre y los Museos Vaticanos',
      'Traslados aeropuerto — hotel en las tres ciudades',
      'Tarjeta de transporte público cargada en cada ciudad',
    ],
    noIncluye: ['Comidas', 'Seguro de asistencia obligatorio para el espacio Schengen', 'Excursiones fuera de las ciudades'],
    itinerario: [
      { dia: 'Días 1 a 4', titulo: 'Madrid', detalle: 'Llegada, Prado con entrada horaria, barrio de las Letras, Retiro y una escapada de un día a Toledo.' },
      { dia: 'Días 5 a 8', titulo: 'París', detalle: 'Vuelo corto, Louvre con reserva, Marais, Montmartre y la torre de noche desde el Trocadéro.' },
      { dia: 'Días 9 a 12', titulo: 'Roma', detalle: 'Tren de alta velocidad, Museos Vaticanos temprano, Coliseo con acceso a la arena y Trastevere.' },
      { dia: 'Día 13', titulo: 'Vuelta', detalle: 'Vuelo de regreso desde Fiumicino.' },
    ],
    nota: 'Si te sobra tiempo, el tramo París — Roma se puede partir con dos noches en Florencia sin cambiar el precio del aéreo.',
  },
  {
    id: 'italia',
    nombre: 'Roma, Florencia y Venecia',
    destino: 'Italia',
    region: 'europa',
    escena: 'ciudad',
    foto: '/fotos/roma.webp',
    noches: 10,
    desde: 2290,
    salidas: 'De marzo a noviembre. Agosto con calor fuerte y todo cerrado por vacaciones.',
    coordenadas: '41°54′ N 12°30′ E',
    gancho: 'Tres ciudades en tren, sin un solo traslado en micro y sin madrugar para hacer valijas.',
    resumen:
      'Diez noches recorriendo Italia de sur a norte en alta velocidad: Roma, Florencia con la Toscana al lado y Venecia para cerrar. Sacamos las entradas al Coliseo, la Galería Uffizi y la Academia con fecha y hora, y el hotel de Venecia lo elegimos en Cannaregio o Dorsoduro, no en San Marcos, porque ahí se duerme y se come mejor por la mitad.',
    incluye: [
      'Aéreo Buenos Aires — Roma y Venecia — Buenos Aires con equipaje despachado',
      '4 noches en Roma, 3 en Florencia y 3 en Venecia, con desayuno',
      'Trenes de alta velocidad Roma — Florencia — Venecia en segunda clase',
      'Entradas horarias al Coliseo con arena, la Uffizi y la Galería de la Academia',
      'Excursión de un día por la Toscana con Siena y San Gimignano',
      'Traslados aeropuerto — hotel en ambas puntas',
    ],
    noIncluye: ['Comidas', 'Seguro Schengen obligatorio', 'Tasa de acceso a Venecia en días de cupo'],
    itinerario: [
      { dia: 'Días 1 a 4', titulo: 'Roma', detalle: 'Coliseo y Foro, Vaticano temprano, Trastevere de noche y un día suelto para Villa Borghese y la Roma que no está en la guía.' },
      { dia: 'Días 5 a 7', titulo: 'Florencia', detalle: 'Tren de la mañana, Duomo, Uffizi y el David. Un día completo por la Toscana con almuerzo en una finca.' },
      { dia: 'Días 8 a 10', titulo: 'Venecia', detalle: 'Llegada en tren a Santa Lucía, Dorsoduro a pie, Murano y Burano en vaporetto y una noche sin turistas en Cannaregio.' },
      { dia: 'Día 11', titulo: 'Vuelta', detalle: 'Traslado a Marco Polo y vuelo de regreso.' },
    ],
  },
  {
    id: 'espana',
    nombre: 'Madrid, Sevilla y Granada',
    destino: 'España',
    region: 'europa',
    escena: 'ciudad',
    foto: '/fotos/madrid.webp',
    noches: 11,
    desde: 2180,
    salidas: 'De marzo a junio y de septiembre a noviembre. Julio y agosto pasan los 40 °C en Andalucía.',
    coordenadas: '37°10′ N 3°35′ O',
    gancho: 'Andalucía en AVE, con la Alhambra reservada el día que se puede entrar.',
    resumen:
      'Once noches entre Madrid y el sur, moviéndose en tren de alta velocidad. La pieza que hay que resolver con meses de anticipación es la Alhambra: las entradas a los Palacios Nazaríes tienen horario fijo y se agotan, así que armamos el itinerario alrededor de esa fecha y no al revés.',
    incluye: [
      'Aéreo Buenos Aires — Madrid ida y vuelta con equipaje despachado',
      '4 noches en Madrid, 4 en Sevilla y 3 en Granada, con desayuno',
      'AVE Madrid — Sevilla y Sevilla — Granada en segunda clase',
      'Entrada general a la Alhambra con horario para los Palacios Nazaríes',
      'Entradas al Prado, al Real Alcázar de Sevilla y a la Mezquita de Córdoba',
      'Excursión de un día a Córdoba desde Sevilla',
    ],
    noIncluye: ['Comidas', 'Seguro Schengen obligatorio', 'Tablao flamenco (lo reservamos aparte, USD 45)'],
    itinerario: [
      { dia: 'Días 1 a 4', titulo: 'Madrid', detalle: 'Prado, Retiro, La Latina y un día a Toledo o Segovia según el clima.' },
      { dia: 'Días 5 a 8', titulo: 'Sevilla', detalle: 'AVE de la mañana, Real Alcázar, catedral y Giralda, Triana de noche y un día completo en Córdoba.' },
      { dia: 'Días 9 a 11', titulo: 'Granada', detalle: 'Alhambra con horario asignado, el Albaicín al atardecer desde el mirador de San Nicolás y el Sacromonte.' },
      { dia: 'Día 12', titulo: 'Vuelta', detalle: 'Tren o vuelo interno a Madrid y regreso a Buenos Aires.' },
    ],
    nota: 'Las entradas a los Palacios Nazaríes se liberan con tres meses de anticipación y vuelan en dos días. Sin esa fecha, el resto no se arma.',
  },
  {
    id: 'islandia',
    nombre: 'Islandia: el anillo del sur',
    destino: 'Islandia',
    region: 'europa',
    escena: 'glaciar',
    foto: '/fotos/islandia.webp',
    noches: 8,
    desde: 3150,
    salidas: 'Auroras de septiembre a marzo. Sol de medianoche en junio y julio.',
    coordenadas: '64°08′ N 21°56′ O',
    gancho: 'Auto 4x4, ocho noches y un país donde el clima cambia cuatro veces por día.',
    resumen:
      'Ocho noches manejando la costa sur, de Reikiavik a la laguna glaciar de Jökulsárlón y vuelta. Es un viaje de ruta y hay que tomárselo así: te dejamos el itinerario armado con margen de sobra entre parada y parada, porque en Islandia el viento cierra caminos sin avisar y correr para llegar a la reserva de la noche es la peor idea posible.',
    incluye: [
      'Aéreo Buenos Aires — Reikiavik vía Europa, ida y vuelta con equipaje',
      '8 noches entre Reikiavik, Vík, Höfn y la zona del Círculo Dorado, con desayuno',
      '4x4 compacto por 8 días con seguro de grava y ceniza incluido',
      'Entrada a la laguna azul con reserva horaria',
      'Paseo en zodiac entre témpanos en Jökulsárlón',
      'Guía de ruta propia con paradas, tiempos reales y sitios de carga',
    ],
    noIncluye: ['Comidas', 'Combustible (es caro, presupuestá USD 200)', 'Excursión a cueva de hielo (opcional, USD 190)'],
    itinerario: [
      { dia: 'Días 1 y 2', titulo: 'Reikiavik', detalle: 'Llegada, retiro del auto y ciudad. Hallgrímskirkja, el puerto viejo y una noche de recuperación del vuelo largo.' },
      { dia: 'Día 3', titulo: 'Círculo Dorado', detalle: 'Þingvellir, el géiser Strokkur y Gullfoss en un día, con la tarde en los baños termales de Secret Lagoon.' },
      { dia: 'Días 4 y 5', titulo: 'Costa sur', detalle: 'Seljalandsfoss, Skógafoss, la playa negra de Reynisfjara y el avión abandonado de Sólheimasandur.' },
      { dia: 'Días 6 a 9', titulo: 'Glaciares y vuelta', detalle: 'Jökulsárlón y la Playa de los Diamantes, Skaftafell, regreso pausado y laguna azul antes del vuelo.' },
    ],
    nota: 'Las auroras no se garantizan: dependen de actividad solar y cielo despejado. Ocho noches en temporada dan buenas chances, no certezas.',
  },
  {
    id: 'grecia',
    nombre: 'Atenas y las Cícladas',
    destino: 'Grecia',
    region: 'europa',
    escena: 'costa',
    foto: '/fotos/santorini.webp',
    noches: 10,
    desde: 2680,
    salidas: 'De mayo a octubre. Fuera de esa ventana, la mitad de los ferrys no navega.',
    coordenadas: '36°23′ N 25°27′ E',
    gancho: 'Dos islas, no cinco. Cambiar de isla cada dos días es pasar las vacaciones en un ferry.',
    resumen:
      'Diez noches con tres en Atenas y el resto repartido entre Naxos y Santorini. La tentación es meter cinco islas: no lo hacemos. Cada cambio se come medio día entre check-out, ferry y check-in. Con dos islas bien elegidas, una para vivir y otra para la postal, el viaje rinde el doble.',
    incluye: [
      'Aéreo Buenos Aires — Atenas vía Europa, ida y vuelta con equipaje',
      '3 noches en Atenas, 4 en Naxos y 3 en Santorini, con desayuno',
      'Ferrys de alta velocidad Atenas — Naxos — Santorini con asiento asignado',
      'Vuelo interno Santorini — Atenas para el regreso',
      'Entrada combinada a la Acrópolis y sitios arqueológicos de Atenas',
      'Traslados de puerto y aeropuerto en las tres escalas',
    ],
    noIncluye: ['Comidas', 'Seguro Schengen obligatorio', 'Alquiler de auto o quad en las islas'],
    itinerario: [
      { dia: 'Días 1 a 3', titulo: 'Atenas', detalle: 'Acrópolis temprano por el calor, museo, Plaka y Monastiraki, y una tarde en el cabo Sunión.' },
      { dia: 'Días 4 a 7', titulo: 'Naxos', detalle: 'Ferry de la mañana. Playas de Plaka y Agios Prokopios, los pueblos de montaña y la Portara al atardecer.' },
      { dia: 'Días 8 a 10', titulo: 'Santorini', detalle: 'Ferry corto, Oía y Fira, caldera en barco con las fuentes termales y el atardecer que todos van a ver.' },
      { dia: 'Día 11', titulo: 'Vuelta', detalle: 'Vuelo interno a Atenas y conexión de regreso.' },
    ],
  },

  /* ---------------- Asia ---------------- */
  {
    id: 'japon',
    nombre: 'Japón: Tokio, Kioto y Osaka',
    destino: 'Japón',
    region: 'asia',
    escena: 'montana',
    foto: '/fotos/fuji.webp',
    noches: 12,
    desde: 3980,
    salidas: 'Cerezos a fines de marzo. Otoño rojo en noviembre. Ambas con cupo cerrado con meses.',
    coordenadas: '35°41′ N 139°41′ E',
    destacado: true,
    gancho: 'Doce noches con el Japan Rail Pass activado el día correcto, que no es el día que llegás.',
    resumen:
      'El viaje que más preguntas genera y el que peor sale cuando se arma solo. Doce noches entre Tokio, Kioto, Nara y Osaka, con el pase de tren emitido antes de salir y activado el día en que empiezan los tramos largos, no el día de llegada. Los hoteles quedan siempre a menos de cinco minutos de una estación: en Japón esa es la única métrica que importa.',
    incluye: [
      'Aéreo Buenos Aires — Tokio ida y vuelta con equipaje despachado',
      '5 noches en Tokio, 4 en Kioto y 3 en Osaka, con desayuno',
      'Japan Rail Pass de 7 días emitido antes de salir',
      'Traslado desde Narita o Haneda al hotel',
      'Excursión de un día a Nara con los templos de Todai-ji y Kasuga',
      'Tarjeta Suica cargada y chip de datos con internet ilimitado',
    ],
    noIncluye: ['Comidas', 'Entradas a templos individuales (son de 300 a 600 yenes)', 'Excursión al monte Fuji (opcional)'],
    itinerario: [
      { dia: 'Días 1 a 5', titulo: 'Tokio', detalle: 'Shibuya y Shinjuku, el mercado de Tsukiji, Asakusa y el Senso-ji, Akihabara y un día en Nikko o Kamakura.' },
      { dia: 'Días 6 a 9', titulo: 'Kioto', detalle: 'Shinkansen a Kioto. Fushimi Inari antes de las 7, Arashiyama, Kinkaku-ji y Gion de noche. Un día a Nara.' },
      { dia: 'Días 10 a 12', titulo: 'Osaka', detalle: 'Dotonbori, el castillo, mercado Kuromon y una escapada a Himeji o Kobe.' },
      { dia: 'Día 13', titulo: 'Vuelta', detalle: 'Tren a Tokio o vuelo desde Kansai, según cómo salga el aéreo.' },
    ],
    nota: 'En temporada de cerezos los hoteles de Kioto se agotan con seis meses. Si viajás en esa ventana, hay que reservar casi un año antes.',
  },
  {
    id: 'tailandia',
    nombre: 'Bangkok, Chiang Mai y Krabi',
    destino: 'Tailandia',
    region: 'asia',
    escena: 'selva',
    foto: '/fotos/tailandia.webp',
    noches: 13,
    desde: 2890,
    salidas: 'De noviembre a marzo, que es la temporada seca. El resto es monzón.',
    coordenadas: '13°45′ N 100°30′ E',
    gancho: 'Ciudad, montaña y playa en trece noches, con dos vuelos internos que cuestan menos que un remise.',
    resumen:
      'Trece noches que empiezan en Bangkok, siguen en el norte y terminan en el mar de Andamán. Metemos el santuario de elefantes de Chiang Mai, pero solo trabajamos con los que no permiten montar ni bañar animales: los otros son atracciones, no santuarios, y te explicamos la diferencia antes de reservar.',
    incluye: [
      'Aéreo Buenos Aires — Bangkok ida y vuelta con equipaje despachado',
      '4 noches en Bangkok, 4 en Chiang Mai y 5 en Krabi o Ao Nang, con desayuno',
      'Vuelos internos Bangkok — Chiang Mai — Krabi',
      'Gran Palacio, Wat Pho y Wat Arun con guía de habla hispana',
      'Día completo en santuario ético de elefantes, sin monta ni baño',
      'Excursión en long tail a las islas Hong y Poda',
    ],
    noIncluye: ['Comidas', 'Visado si tu estadía supera los 30 días', 'Excursión a Phi Phi (opcional, USD 60)'],
    itinerario: [
      { dia: 'Días 1 a 4', titulo: 'Bangkok', detalle: 'Templos por la mañana temprano, mercado flotante de Damnoen Saduak, Chinatown de noche y un día de mercados y masajes.' },
      { dia: 'Días 5 a 8', titulo: 'Chiang Mai', detalle: 'Ciudad vieja y sus templos, Doi Suthep, clase de cocina tailandesa y el día completo en el santuario de elefantes.' },
      { dia: 'Días 9 a 13', titulo: 'Krabi', detalle: 'Railay, las islas Hong y Poda en long tail, kayak entre manglares y días de playa sin agenda.' },
      { dia: 'Día 14', titulo: 'Vuelta', detalle: 'Vuelo a Bangkok y conexión de regreso.' },
    ],
  },

  /* ---------------- África y Medio Oriente ---------------- */
  {
    id: 'egipto',
    nombre: 'El Cairo, Luxor y crucero por el Nilo',
    destino: 'Egipto',
    region: 'africa',
    escena: 'puna',
    foto: '/fotos/guiza.webp',
    noches: 10,
    desde: 2740,
    salidas: 'De octubre a abril. En verano, Asuán pasa los 45 °C.',
    coordenadas: '29°58′ N 31°08′ E',
    gancho: 'Cuatro noches a bordo entre Luxor y Asuán, que es como se recorre el Nilo sin hacer diez traslados.',
    resumen:
      'Diez noches con El Cairo por delante y por detrás, y un crucero de cuatro noches por el Nilo en el medio. El crucero no es un capricho: los templos del alto Egipto están todos sobre el río, y hacerlos por tierra significa cuatro hoteles distintos y horas de ruta. Vamos con egiptólogo de habla hispana, no con audioguía.',
    incluye: [
      'Aéreo Buenos Aires — El Cairo vía Europa, ida y vuelta con equipaje',
      '4 noches en El Cairo y 4 a bordo en crucero de cinco estrellas con pensión completa',
      'Vuelos internos El Cairo — Luxor y Asuán — El Cairo',
      'Pirámides de Guiza, la Esfinge, Saqqara y Menfis con egiptólogo',
      'Karnak, Luxor, Valle de los Reyes, Kom Ombo, Edfú y Philae',
      'Visado egipcio y todas las entradas de los sitios del itinerario',
    ],
    noIncluye: ['Entrada a la cámara de la Gran Pirámide', 'Templo de Abu Simbel (opcional, USD 130)', 'Propinas de a bordo'],
    itinerario: [
      { dia: 'Días 1 a 3', titulo: 'El Cairo', detalle: 'Guiza y la Esfinge, Saqqara y Menfis, el Museo Egipcio y el Cairo copto e islámico.' },
      { dia: 'Días 4 y 5', titulo: 'Luxor', detalle: 'Vuelo interno y embarque. Karnak y el templo de Luxor, Valle de los Reyes y los Colosos de Memnón.' },
      { dia: 'Días 6 a 8', titulo: 'Nilo arriba', detalle: 'Navegación con paradas en Edfú y Kom Ombo, y llegada a Asuán con el templo de Philae y la presa alta.' },
      { dia: 'Días 9 a 11', titulo: 'Cierre', detalle: 'Vuelo de regreso a El Cairo, último día de bazar en Jan el-Jalili y vuelo internacional.' },
    ],
    nota: 'Abu Simbel se puede hacer en el día desde Asuán, pero implica salir a las 4 de la mañana. Lo cotizamos aparte para que decidas con el dato.',
  },
  {
    id: 'sudafrica',
    nombre: 'Ciudad del Cabo y safari en Kruger',
    destino: 'Sudáfrica',
    region: 'africa',
    escena: 'montana',
    foto: '/fotos/ciudad-del-cabo.webp',
    noches: 11,
    desde: 3620,
    salidas: 'De mayo a septiembre para el safari. De noviembre a marzo para la costa.',
    coordenadas: '33°55′ S 18°25′ E',
    gancho: 'Los cinco grandes por la mañana y una bodega de Stellenbosch cuatro días después.',
    resumen:
      'Once noches con dos viajes en uno: la ruta jardín y los viñedos del Cabo, y tres noches de safari en una reserva privada lindera al Kruger. Elegimos reserva privada y no el parque público a propósito: se puede salir del camino y hacer avistaje nocturno, que es cuando aparecen los leopardos.',
    incluye: [
      'Aéreo Buenos Aires — Ciudad del Cabo ida y vuelta con equipaje despachado',
      '5 noches en Ciudad del Cabo, 3 en reserva privada y 2 en la ruta jardín',
      'Vuelos internos a la zona del Kruger ida y vuelta',
      '3 noches de safari con pensión completa y dos salidas diarias en 4x4 abierto',
      'Montaña de la Mesa, Cabo de Buena Esperanza y pingüinos de Boulders Beach',
      'Día de bodegas en Stellenbosch y Franschhoek con almuerzo',
    ],
    noIncluye: ['Comidas fuera del safari', 'Bebidas', 'Cage diving con tiburones (opcional, USD 170)'],
    itinerario: [
      { dia: 'Días 1 a 5', titulo: 'Ciudad del Cabo', detalle: 'Montaña de la Mesa apenas abre el teleférico, península del Cabo, Boulders Beach y un día completo de viñedos.' },
      { dia: 'Días 6 y 7', titulo: 'Ruta jardín', detalle: 'Hermanus para avistaje de ballenas en temporada y los acantilados de la costa índica.' },
      { dia: 'Días 8 a 10', titulo: 'Safari', detalle: 'Vuelo a la zona del Kruger y tres noches en lodge, con salidas al amanecer y al atardecer en 4x4 abierto con ranger y rastreador.' },
      { dia: 'Días 11 y 12', titulo: 'Vuelta', detalle: 'Vuelo de regreso vía Johannesburgo y conexión internacional.' },
    ],
    nota: 'La reserva privada tiene cupo de seis personas por vehículo. En temporada alta hay que confirmar con cuatro meses.',
  },
];

/* ---------- Hero: datos duros, no eslóganes ----------
   Los tres primeros salen contados de los datos de arriba, para que no
   queden viejos cuando se agregue o se saque un paquete. */

const aniosAbierta = new Date().getFullYear() - agencia.desde;
const cantidadRegiones = new Set(paquetes.map((p) => p.region)).size;

export const datosHero = [
  { valor: String(aniosAbierta), unidad: 'años', pie: `armando viajes desde ${agencia.desde}, en el mismo local` },
  { valor: String(paquetes.length), unidad: 'paquetes', pie: 'con itinerario y desglose de precio a la vista' },
  { valor: String(cantidadRegiones), unidad: 'regiones', pie: 'de la Patagonia a Asia, en la misma grilla' },
  { valor: '24 h', unidad: 'de guardia', pie: 'por WhatsApp los días que estás afuera' },
];

/* ---------- Cómo trabajamos: diferenciales concretos ---------- */

export const diferenciales = [
  {
    numero: '01',
    titulo: 'Te mostramos la planilla',
    bajada: 'Cotizamos con el desglose abierto.',
    texto:
      'En cada presupuesto vas a ver cuánto es aéreo, cuánto hotel, cuánto traslados y cuánto es nuestro honorario. Sin “precio final” de una sola línea. Si conseguís algo más barato por tu cuenta, te decimos si el ahorro es real o si estás comparando una tarifa sin equipaje contra una con equipaje.',
    dato: 'Desglose por escrito en el 100% de las cotizaciones',
  },
  {
    numero: '02',
    titulo: 'La misma persona de punta a punta',
    bajada: 'Quien te cotiza es quien te atiende a las tres de la mañana.',
    texto:
      'No hay call center ni mesa de entrada. El asesor que te arma el viaje te deja su celular y queda de guardia mientras estás afuera. Si se cae un vuelo, si el hotel no encuentra tu reserva o si hay paro, escribís al mismo número que venías usando.',
    dato: 'Guardia por WhatsApp las 24 h durante tu viaje',
  },
  {
    numero: '03',
    titulo: 'Solo vendemos lo que caminamos',
    bajada: 'Cada destino de esta página lo recorrió alguien del equipo.',
    texto:
      'Si nos preguntás por un hotel que no pisamos, te lo decimos y averiguamos antes de recomendarlo. Es la razón por la que en cada paquete hay una línea que no vas a ver en un catálogo de mayorista: a qué hora conviene entrar, qué día no navega y qué se puede sacar sin que el viaje pierda nada.',
    dato: 'Cada destino, visitado en los últimos 24 meses',
  },
];
