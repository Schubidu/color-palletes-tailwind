import { toGamut, differenceEuclidean, formatCss, converter } from 'culori';

const shades = [
  50,
  ...Array.from({ length: 9 }).map((_, i) => (i + 1) * 100),
  950,
];

const lightness = [
  97.78, 93.56, 88.11, 82.67, 74.22, 64.78, 57.33, 46.89, 39.44, 32, 23.78,
];

const maxChroma = (i, hue) => {
  let oklch = converter('oklch');
  let color = 'oklch(' + lightness[i] + '% ' + 0.4 + ' ' + hue + ')';
  return formatCss(
    oklch(toGamut('p3', 'oklch', differenceEuclidean('oklch'), 0)(color))
  );
};

const consistentChroma = (i, hue) => {
  let oklch = converter('oklch');
  let color = 'oklch(' + lightness[i] + '% ' + chroma[i] + ' ' + hue + ')';
  return formatCss(
    oklch(toGamut('p3', 'oklch', differenceEuclidean('oklch'), 0)(color))
  );
};

const chroma = [
  0.0108, 0.0321, 0.0609, 0.0908, 0.1398, 0.1472, 0.1299, 0.1067, 0.0898,
  0.0726, 0.054,
];

const asHsl = (i, hue) => `hsl(${hue} 90% ${lightness[i]}%)`;

function calculatePalette(hue, colorFn) {
  return shades.map((_, i) => colorFn(i, hue));
}

const palletes = [
  { fn: asHsl, label: 'HSL' },
  { fn: maxChroma, label: 'Max chroma' },
  { fn: consistentChroma, label: 'Max consistency' },
];

export function generateAllPalettes(hue) {
  return palletes.map(({ fn, label }) => ({
    paletteArray: [
      calculatePalette(hue, fn),
      calculatePalette(hue + 90, fn),
      //calculatePalette(hue + 180, fn),
    ],
    label,
  }));
}

export function allHues() {
  return Array.from(Array(36), (_, step) => {
    return generateAllPalettes(step * 10)[2].paletteArray[0][4];
  });
}

export const twClasses = [
  [
    'bg-orange-50',
    'bg-orange-100',
    'bg-orange-200',
    'bg-orange-300',
    'bg-orange-400',
    'bg-orange-500',
    'bg-orange-600',
    'bg-orange-700',
    'bg-orange-800',
    'bg-orange-900',
    'bg-orange-950',
  ],
  [
    'bg-green-50',
    'bg-green-100',
    'bg-green-200',
    'bg-green-300',
    'bg-green-400',
    'bg-green-500',
    'bg-green-600',
    'bg-green-700',
    'bg-green-800',
    'bg-green-900',
    'bg-green-950',
  ],
  [
    'bg-sky-50',
    'bg-sky-100',
    'bg-sky-200',
    'bg-sky-300',
    'bg-sky-400',
    'bg-sky-500',
    'bg-sky-600',
    'bg-sky-700',
    'bg-sky-800',
    'bg-sky-900',
    'bg-sky-950',
  ],
];
