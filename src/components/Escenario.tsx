import { useId } from 'react';
import type { Escena } from '../data/site';

/* ============================================================
   ESCENARIO
   Ilustraciones vectoriales propias, una por tipo de destino.
   Reemplazan al banco de fotos genérico y usan la misma paleta
   que el resto del sitio, así la página se lee como una sola pieza.
   Si el cliente sube fotos reales, se pasan por la prop `foto`
   y la ilustración queda de fondo.
   ============================================================ */

const W = 800;
const H = 520;

type Capa = { pts: [number, number][]; fill: string };

type Def = {
  cielo: [string, string];
  astro?: { cx: number; cy: number; r: number; color: string; opacidad?: number };
  capas: Capa[];
  agua?: { y: number; fill: string; brillo: string };
  extra?: 'grietas' | 'coniferas' | 'cascada' | 'cardones' | 'olas' | 'ventanas';
};

const DEFS: Record<Escena, Def> = {
  glaciar: {
    cielo: ['#0C1826', '#7189AB'],
    astro: { cx: 622, cy: 118, r: 48, color: '#CBD6E4', opacidad: 0.42 },
    capas: [
      {
        fill: '#10253E',
        pts: [[0, 252], [90, 196], [160, 232], [250, 168], [330, 224], [410, 180], [500, 236], [590, 188], [680, 232], [800, 198]],
      },
      {
        fill: '#314662',
        pts: [[0, 302], [120, 262], [210, 296], [300, 250], [400, 300], [500, 264], [610, 304], [700, 270], [800, 300]],
      },
      {
        fill: '#ADC0D4',
        pts: [[0, 354], [60, 336], [120, 354], [180, 332], [240, 352], [300, 330], [360, 354], [420, 334], [480, 352], [540, 330], [600, 352], [660, 334], [720, 354], [800, 338]],
      },
    ],
    agua: { y: 382, fill: '#0A1524', brillo: '#8FA3BE' },
    extra: 'grietas',
  },

  montana: {
    cielo: ['#101F31', '#C9AE78'],
    astro: { cx: 596, cy: 146, r: 56, color: '#E4D2AC', opacidad: 0.9 },
    capas: [
      {
        fill: '#10253E',
        pts: [[0, 272], [110, 178], [200, 250], [300, 148], [420, 256], [520, 188], [640, 262], [730, 204], [800, 258]],
      },
      {
        fill: '#314662',
        pts: [[0, 332], [130, 254], [240, 320], [350, 244], [470, 330], [580, 278], [700, 336], [800, 300]],
      },
      {
        fill: '#536B89',
        pts: [[0, 394], [140, 340], [280, 396], [400, 352], [520, 400], [660, 356], [800, 398]],
      },
    ],
  },

  bosque: {
    cielo: ['#0E1B2C', '#4A6488'],
    astro: { cx: 168, cy: 122, r: 42, color: '#C9AE78', opacidad: 0.82 },
    capas: [
      {
        fill: '#132741',
        pts: [[0, 292], [120, 250], [260, 296], [380, 246], [520, 300], [660, 252], [800, 292]],
      },
      {
        fill: '#405774',
        pts: [[0, 348], [150, 306], [300, 352], [450, 308], [600, 354], [800, 314]],
      },
    ],
    agua: { y: 412, fill: '#0E1F35', brillo: '#7189AB' },
    extra: 'coniferas',
  },

  selva: {
    cielo: ['#0E1B2C', '#7A6234'],
    capas: [
      {
        fill: '#132741',
        pts: [[0, 238], [60, 208], [120, 242], [180, 206], [240, 244], [300, 204], [360, 242], [420, 208], [480, 246], [540, 206], [600, 242], [660, 208], [720, 244], [800, 214]],
      },
      {
        fill: '#405774',
        pts: [[0, 300], [80, 282], [160, 308], [240, 280], [320, 310], [400, 278], [480, 308], [560, 282], [640, 310], [720, 280], [800, 306]],
      },
    ],
    agua: { y: 404, fill: '#0E1F35', brillo: '#A08554' },
    extra: 'cascada',
  },

  puna: {
    cielo: ['#16283E', '#C8A45C'],
    astro: { cx: 556, cy: 154, r: 62, color: '#E4D2AC', opacidad: 0.95 },
    capas: [
      {
        fill: '#432E0E',
        pts: [[0, 270], [140, 232], [300, 278], [440, 224], [600, 274], [720, 236], [800, 268]],
      },
      {
        fill: '#6A5434',
        pts: [[0, 328], [120, 300], [260, 340], [400, 294], [540, 342], [680, 300], [800, 334]],
      },
      {
        fill: '#947C5B',
        pts: [[0, 386], [160, 356], [320, 394], [480, 350], [640, 394], [800, 362]],
      },
    ],
    extra: 'cardones',
  },

  costa: {
    cielo: ['#101F31', '#DFC085'],
    astro: { cx: 402, cy: 236, r: 74, color: '#F0E4C8', opacidad: 0.95 },
    capas: [
      {
        fill: '#0A1524',
        pts: [[0, 244], [80, 230], [160, 258], [230, 288], [300, 316], [352, 332], [800, 332]],
      },
    ],
    agua: { y: 332, fill: '#16283E', brillo: '#F0E4C8' },
    extra: 'olas',
  },

  ciudad: {
    cielo: ['#0E1B2C', '#7A6234'],
    astro: { cx: 648, cy: 172, r: 52, color: '#C9AE78', opacidad: 0.8 },
    capas: [
      {
        fill: '#1C2F46',
        pts: [[0, 302], [42, 302], [42, 262], [92, 262], [92, 292], [150, 292], [150, 238], [202, 238], [202, 288], [262, 288], [262, 254], [322, 254], [322, 298], [382, 298], [382, 234], [442, 234], [442, 290], [522, 290], [522, 256], [582, 256], [582, 302], [662, 302], [662, 266], [722, 266], [722, 298], [800, 298]],
      },
      {
        fill: '#05101E',
        pts: [[0, 372], [70, 372], [70, 330], [128, 330], [128, 358], [190, 358], [190, 318], [250, 318], [250, 364], [330, 364], [330, 336], [400, 336], [400, 372], [470, 372], [470, 322], [536, 322], [536, 366], [614, 366], [614, 340], [690, 340], [690, 370], [800, 370]],
      },
    ],
    extra: 'ventanas',
  },
};

function trazo(pts: [number, number][]): string {
  const cabeza = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');
  return `${cabeza} L${W} ${H} L0 ${H} Z`;
}

export type EscenarioProps = {
  escena: Escena;
  className?: string;
  /** Foto real del cliente. Si está, se muestra encima de la ilustración. */
  foto?: string;
  alt?: string;
  /** Para la foto del hero: carga inmediata en vez de diferida. */
  prioridad?: boolean;
};

export default function Escenario({
  escena,
  className = 'relative h-full w-full',
  foto,
  alt,
  prioridad = false,
}: EscenarioProps) {
  const uid = useId().replace(/:/g, '');
  const def = DEFS[escena];
  const idCielo = `c-${uid}`;
  const idAgua = `a-${uid}`;
  const idVineta = `v-${uid}`;

  return (
    // El className debe traer la posición (todas las llamadas usan `absolute inset-0`).
    <div className={`overflow-hidden bg-noche ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="block h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={idCielo} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={def.cielo[0]} />
            <stop offset="100%" stopColor={def.cielo[1]} />
          </linearGradient>
          {def.agua && (
            <linearGradient id={idAgua} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={def.agua.brillo} stopOpacity="0.35" />
              <stop offset="45%" stopColor={def.agua.fill} stopOpacity="1" />
              <stop offset="100%" stopColor="#070E17" stopOpacity="1" />
            </linearGradient>
          )}
          <linearGradient id={idVineta} x1="0" y1="0" x2="0" y2="1">
            <stop offset="35%" stopColor="#060C14" stopOpacity="0" />
            <stop offset="100%" stopColor="#060C14" stopOpacity="0.62" />
          </linearGradient>
        </defs>

        <rect width={W} height={H} fill={`url(#${idCielo})`} />

        {def.astro && (
          <>
            <circle cx={def.astro.cx} cy={def.astro.cy} r={def.astro.r * 2.1} fill={def.astro.color} opacity={0.09} />
            <circle cx={def.astro.cx} cy={def.astro.cy} r={def.astro.r} fill={def.astro.color} opacity={def.astro.opacidad ?? 1} />
          </>
        )}

        {def.capas.map((capa, i) => (
          <path key={i} d={trazo(capa.pts)} fill={capa.fill} />
        ))}

        {def.agua && (
          <>
            <rect x="0" y={def.agua.y} width={W} height={H - def.agua.y} fill={`url(#${idAgua})`} />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={40 + i * 47}
                y={def.agua!.y + 18 + i * 21}
                width={220 - i * 26}
                height="2"
                rx="1"
                fill={def.agua!.brillo}
                opacity={0.3 - i * 0.045}
              />
            ))}
          </>
        )}

        {def.extra === 'grietas' &&
          [0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={54 + i * 108} y={336 + (i % 3) * 5} width="2" height={44 - (i % 3) * 7} fill="#314662" opacity="0.5" />
          ))}

        {def.extra === 'coniferas' &&
          Array.from({ length: 17 }, (_, i) => {
            const x = 12 + i * 47;
            const alto = 46 + ((i * 37) % 34);
            const base = 408;
            const ancho = 13 + ((i * 19) % 7);
            return (
              <path
                key={i}
                d={`M${x} ${base} L${x + ancho / 2} ${base - alto} L${x + ancho} ${base} Z`}
                fill="#0A1420"
                opacity="0.95"
              />
            );
          })}

        {def.extra === 'cascada' && (
          <>
            <rect x="0" y="312" width={W} height="96" fill="#16283E" />
            {Array.from({ length: 26 }, (_, i) => (
              <rect
                key={i}
                x={18 + i * 30}
                y={312}
                width={9 + ((i * 13) % 8)}
                height={92 - ((i * 23) % 26)}
                fill="#E4D2AC"
                opacity={0.55 + ((i * 7) % 4) * 0.09}
              />
            ))}
            <rect x="0" y="306" width={W} height="10" fill="#405774" />
          </>
        )}

        {def.extra === 'cardones' &&
          Array.from({ length: 9 }, (_, i) => {
            const x = 40 + i * 92;
            const alto = 54 + ((i * 41) % 40);
            const base = 470;
            return (
              <g key={i} fill="#2A2118" opacity="0.9">
                <rect x={x} y={base - alto} width="11" height={alto} rx="5" />
                <rect x={x - 15} y={base - alto * 0.72} width="9" height={alto * 0.42} rx="4" />
                <rect x={x - 15} y={base - alto * 0.72} width="24" height="9" rx="4" />
              </g>
            );
          })}

        {def.extra === 'olas' &&
          Array.from({ length: 7 }, (_, i) => (
            <rect
              key={i}
              x={330 - i * 22}
              y={352 + i * 23}
              width={140 + i * 20}
              height="3"
              rx="1.5"
              fill="#E4D2AC"
              opacity={0.4 - i * 0.045}
            />
          ))}

        {def.extra === 'ventanas' &&
          Array.from({ length: 64 }, (_, i) => {
            const col = i % 16;
            const fila = Math.floor(i / 16);
            const x = 24 + col * 48 + (fila % 2) * 9;
            const y = 344 + fila * 22;
            const prendida = (i * 7) % 5 !== 0;
            if (!prendida || y > 452) return null;
            return <rect key={i} x={x} y={y} width="7" height="11" fill="#E4D2AC" opacity={0.25 + ((i * 11) % 5) * 0.12} />;
          })}

        <rect width={W} height={H} fill={`url(#${idVineta})`} />
      </svg>

      {foto && (
        <>
          <img
            src={foto}
            alt={alt ?? ''}
            loading={prioridad ? 'eager' : 'lazy'}
            fetchPriority={prioridad ? 'high' : 'auto'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Velo inferior: sostiene el texto que va encima de la foto */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-noche/85 via-noche/15 to-transparent"
          />
        </>
      )}
    </div>
  );
}
