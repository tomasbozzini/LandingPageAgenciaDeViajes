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
  whatsapp: '5492494567890',                   // <-- REEMPLAZAR (internacional, sin + ni espacios)
  telefonoVisible: '+54 249 456-7890',         // <-- REEMPLAZAR
  email: 'hola@meridianosur.com.ar',           // <-- REEMPLAZAR
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
  aMedida: `Hola ${agencia.nombre}, quiero armar un viaje a medida. Les cuento qué tengo en mente:`,
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

/* Todavía no hay paquetes armados: mientras la lista esté vacía, la
   grilla muestra lugares en blanco (ver Paquetes.astro). Para sumar uno
   se agrega un objeto con la forma de `Paquete`; con `destacado: true`
   ocupa uno de esos lugares. */

export const paquetes: Paquete[] = [];

/* ---------- Vitrina: cómo trabajamos, en cifras ----------
   Son compromisos de servicio, no antigüedad ni volumen: la agencia
   recién arranca. Cada uno está desarrollado en `diferenciales`. */

export const datosHero = [
  { valor: '24 h', unidad: 'de guardia', pie: 'por WhatsApp los días que estás afuera' },
  { valor: '1', unidad: 'asesor', pie: 'de la primera consulta hasta que volvés' },
  { valor: '100%', unidad: 'desglosado', pie: 'aéreo, hotel, traslados y honorario, por separado' },
  { valor: '0', unidad: 'bots', pie: 'ni formularios: te contesta una persona' },
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
];
