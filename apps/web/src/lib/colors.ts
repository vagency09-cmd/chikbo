/**
 * Colour-name → swatch mapping for variant selectors.
 *
 * Variants store a human colour name ("Rani Pink", "Antique Gold") rather than
 * a hex value, so the storefront resolves the paint here. Metallics use a
 * gradient so they don't read as flat mud, and anything unrecognised falls
 * back to a neutral chip with the name still shown beside the swatches.
 *
 * NOTE: this file is duplicated in apps/web and apps/admin — keep them in sync
 * so the admin preview dot matches what shoppers see.
 */
export interface Swatch {
  /** CSS colour or gradient painted inside the bubble. */
  fill: string;
  /** True for very light colours that need a visible outline. */
  light?: boolean;
}

/**
 * Fashion-accurate shades. These deliberately override CSS named colours that
 * read wrong on clothing: CSS "brown" is a brick red (#A52A2A) and CSS "beige"
 * is a pale yellow-cream (#F5F5DC), neither of which is what a shop means.
 */
const SWATCHES: Record<string, Swatch> = {
  // Whites & neutrals
  white: { fill: '#FFFFFF', light: true },
  'off white': { fill: '#F5F2EA', light: true },
  ivory: { fill: '#F4EFE4', light: true },
  cream: { fill: '#F2E7D2', light: true },
  beige: { fill: '#D9C4A3', light: true },
  oatmeal: { fill: '#E0D5C2', light: true },
  sand: { fill: '#D6C3A1', light: true },
  nude: { fill: '#E3BC9A', light: true },
  skin: { fill: '#E8C4A6', light: true },
  peach: { fill: '#F6C4A4', light: true },
  champagne: { fill: 'linear-gradient(135deg,#F3E3C8,#D9BE92)', light: true },
  blush: { fill: '#F0C9C6', light: true },
  'baby pink': { fill: '#F6C6D0', light: true },
  lavender: { fill: '#C8B6DE', light: true },
  lilac: { fill: '#C6A8D6' },
  'powder blue': { fill: '#BCD3E6', light: true },
  'sky blue': { fill: '#8EC4E6' },
  mint: { fill: '#B7E2CB', light: true },
  'mint green': { fill: '#B7E2CB', light: true },
  sage: { fill: '#A8B79A' },
  grey: { fill: '#9A9A9A' },
  silver: { fill: 'linear-gradient(135deg,#E3E5E8,#A3A8AD)', light: true },

  // Browns & earth tones
  brown: { fill: '#7B4B2A' },
  'dark brown': { fill: '#4E2F1C' },
  'light brown': { fill: '#A87A52' },
  chocolate: { fill: '#4A2C1D' },
  coffee: { fill: '#5B3A26' },
  mocha: { fill: '#7A5A45' },
  camel: { fill: '#C19A6B' },
  tan: { fill: '#C8A27A' },
  khaki: { fill: '#B8A67E' },
  taupe: { fill: '#8B7D6B' },
  rust: { fill: '#A8441E' },
  copper: { fill: 'linear-gradient(135deg,#D38C5C,#8A4B26)' },
  bronze: { fill: 'linear-gradient(135deg,#C99A5B,#7A5526)' },
  mustard: { fill: '#D8A32A' },
  olive: { fill: '#6E7343' },

  // Reds, pinks & purples
  red: { fill: '#C8102E' },
  crimson: { fill: '#B3122F' },
  maroon: { fill: '#6E1B2A' },
  wine: { fill: '#5C1B31' },
  burgundy: { fill: '#6D1A36' },
  cherry: { fill: '#A4133C' },
  coral: { fill: '#F2786A' },
  pink: { fill: '#EE9AB4' },
  'rose pink': { fill: '#E48AA0' },
  'rani pink': { fill: '#D6156B' },
  'hot pink': { fill: '#E4287C' },
  magenta: { fill: '#C2187A' },
  fuchsia: { fill: '#C9247F' },
  'onion pink': { fill: '#D9A0A0' },
  mauve: { fill: '#B08497' },
  violet: { fill: '#7A4FA3' },
  purple: { fill: '#6B3A8C' },
  plum: { fill: '#6A2C5A' },

  // Oranges & yellows
  orange: { fill: '#EE7A22' },
  yellow: { fill: '#F2C94C' },
  lemon: { fill: '#F4E27A', light: true },
  gold: { fill: 'linear-gradient(135deg,#E8C465,#A67C1E)' },

  // Greens
  green: { fill: '#2E8B57' },
  'bottle green': { fill: '#0F4D32' },
  'parrot green': { fill: '#5DBB3F' },
  'pista green': { fill: '#B5D69A' },
  'dark green': { fill: '#1E4D2B' },
  'light green': { fill: '#9FD49A' },
  emerald: { fill: '#126B4A' },
  teal: { fill: '#1F6F72' },
  turquoise: { fill: '#2BB3B1' },
  aqua: { fill: '#6FD3D1' },

  // Blues & darks
  blue: { fill: '#2F5DA8' },
  'light blue': { fill: '#9CC3E4' },
  'mid blue': { fill: '#5A83B0' },
  'dark blue': { fill: '#1F3566' },
  'royal blue': { fill: '#22409A' },
  'ice blue': { fill: '#CFE3EE', light: true },
  denim: { fill: '#3C5A80' },
  indigo: { fill: '#33436E' },
  navy: { fill: '#1E2A44' },
  'navy blue': { fill: '#1E2A44' },
  charcoal: { fill: '#3A3A3C' },
  black: { fill: '#17171A' },

  // Metallics
  'antique gold': { fill: 'linear-gradient(135deg,#D8B45A,#8A6A22)' },
  'rose gold': { fill: 'linear-gradient(135deg,#F1C4B0,#B7735E)' },
  'oxidised silver': { fill: 'linear-gradient(135deg,#C9CDD1,#6E7378)' },
};

/** Common misspellings and regional spellings, mapped onto a curated key. */
const ALIASES: Record<string, string> = {
  voilet: 'violet',
  voilate: 'violet',
  violate: 'violet',
  gray: 'grey',
  offwhite: 'off white',
  'off-white': 'off white',
  bage: 'beige',
  biege: 'beige',
  beig: 'beige',
  marron: 'maroon',
  mehroon: 'maroon',
  maron: 'maroon',
  burgandy: 'burgundy',
  navyblue: 'navy blue',
  skyblue: 'sky blue',
  lavendar: 'lavender',
  lavander: 'lavender',
  fuschia: 'fuchsia',
  turqoise: 'turquoise',
  turquise: 'turquoise',
  mustered: 'mustard',
  musturd: 'mustard',
  pista: 'pista green',
  peacock: 'teal',
  'peacock blue': 'teal',
  'peacock green': 'teal',
  'coffee brown': 'coffee',
  'chocolate brown': 'chocolate',
  'wine red': 'wine',
  'maroon red': 'maroon',
  'cherry red': 'cherry',
  'olive green': 'olive',
  'mustard yellow': 'mustard',
  'baby blue': 'powder blue',
  multicolor: 'multi',
  multicolour: 'multi',
  'multi color': 'multi',
  'multi colour': 'multi',
};

/** Rainbow chip for "Multi" / "Multicolour" products. */
const MULTI: Swatch = {
  fill: 'conic-gradient(#C8102E,#EE7A22,#F2C94C,#2E8B57,#2F5DA8,#6B3A8C,#C8102E)',
};

/** Neutral chip used when a colour name can't be resolved at all. */
const FALLBACK: Swatch = { fill: 'linear-gradient(135deg,#E6E0D6,#C2B9AC)', light: true };

/**
 * Second chance for names the curated map doesn't cover.
 *
 * CSS understands 148 named colours — salmon, orchid, tomato and so on — so a
 * colour the shop invents still resolves to a real hue instead of a grey chip.
 * The browser normalises valid names and ignores invalid ones, which is what
 * makes the sentinel test below work. Results are cached; this runs during render.
 */
const cssNameCache = new Map<string, string | null>();

function cssNamedColor(name: string): string | null {
  if (typeof document === 'undefined') return null; // SSR/tests
  const key = name.toLowerCase().replace(/[^a-z]/g, '');
  if (!key) return null;
  const cached = cssNameCache.get(key);
  if (cached !== undefined) return cached;

  const probe = document.createElement('span').style;
  probe.color = 'rgb(1, 2, 3)'; // sentinel the browser will keep if `key` is invalid
  probe.color = key;
  const resolved = probe.color && probe.color !== 'rgb(1, 2, 3)' ? probe.color : null;
  cssNameCache.set(key, resolved);
  return resolved;
}

/** Perceived brightness, so pale swatches get an outline and stay visible. */
function luma(r: number, g: number, b: number): number {
  // Rec. 601 luma — closer to how the eye weights each channel than a mean.
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function parseRgb(cssColor: string): [number, number, number] | null {
  const hex = cssColor.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = cssColor.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}

function isLight(cssColor: string): boolean {
  const rgb = parseRgb(cssColor);
  return rgb ? luma(...rgb) > 0.8 : false;
}

/** Mix a flat colour towards white (amount > 0) or black (amount < 0). */
function shade(cssColor: string, amount: number): Swatch | null {
  const rgb = parseRgb(cssColor);
  if (!rgb) return null;
  const target = amount > 0 ? 255 : 0;
  const t = Math.abs(amount);
  const [r, g, b] = rgb.map((c) => Math.round(c + (target - c) * t));
  const fill = `rgb(${r}, ${g}, ${b})`;
  return { fill, light: luma(r, g, b) > 0.8 };
}

const LIGHTER = new Set(['light', 'pale', 'pastel', 'soft', 'baby', 'dusty']);
const DARKER = new Set(['dark', 'deep']);

/** Curated map → alias → CSS named colour, for a single already-normalised name. */
function resolveExact(key: string): Swatch | null {
  const aliased = ALIASES[key] ?? ALIASES[key.replace(/\s/g, '')] ?? key;
  if (aliased === 'multi') return MULTI;
  const curated = SWATCHES[aliased];
  if (curated) return curated;
  const css = cssNamedColor(aliased);
  return css ? { fill: css, light: isLight(css) } : null;
}

function resolveOne(name: string): Swatch | null {
  const key = name
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ');
  if (!key) return null;

  const exact = resolveExact(key);
  if (exact) return exact;

  // "Dark Beige", "Pastel Pink", "Deep Voilet": resolve the base, then shade it.
  const words = key.split(' ');
  if (words.length > 1 && (LIGHTER.has(words[0]) || DARKER.has(words[0]))) {
    const base = resolveOne(words.slice(1).join(' '));
    if (base) return shade(base.fill, LIGHTER.has(words[0]) ? 0.35 : -0.3) ?? base;
  }

  // "Coffee Brown", "Bottle Green Check": try the trailing words, then any word.
  for (let i = 1; i < words.length; i++) {
    const tail = resolveExact(words.slice(i).join(' '));
    if (tail) return tail;
  }
  for (const w of words) {
    const hit = resolveExact(w);
    if (hit) return hit;
  }
  return null;
}

/** A single CSS colour for a swatch — the first stop of a gradient fill. */
function solid(s: Swatch): string {
  const stop = s.fill.match(/gradient\((?:[^,]*deg,|from [^,]*,)?\s*(#[0-9a-f]{3,8}|rgba?\([^)]*\)|[a-z]+)/i);
  return s.fill.includes('gradient(') && stop ? stop[1] : s.fill;
}

/**
 * Resolve a colour name to a swatch:
 *   1. "Black & White" / "Red/Gold" paint as a split swatch
 *   2. the curated map (brand-accurate: "Brown" is a real brown, not CSS brick red)
 *   3. known misspellings ("Voilet", "Biege") and modifiers ("Dark Beige")
 *   4. any CSS named colour
 *   5. a neutral chip, so an unrecognised name still renders as a swatch
 */
export function swatchFor(colorName: string): Swatch {
  const parts = colorName.split(/\s*(?:&|\/|\+|,|\band\b|\bwith\b)\s*/i).filter(Boolean);
  if (parts.length > 1) {
    const fills = parts.map(resolveOne).filter((s): s is Swatch => !!s);
    if (fills.length >= 2) {
      const [a, b] = fills.map(solid);
      return {
        fill: `linear-gradient(135deg,${a} 0 50%,${b} 50% 100%)`,
        light: !!(fills[0].light && fills[1].light),
      };
    }
  }

  return resolveOne(colorName) ?? FALLBACK;
}
