export const SIZES = {
  xs: { avatar: 'w-6 h-6',   text: 'text-xs',   dot: 'w-1.5 h-1.5', icon: 16 },
  sm: { avatar: 'w-8 h-8',   text: 'text-xs',   dot: 'w-2 h-2',     icon: 20 },
  md: { avatar: 'w-10 h-10', text: 'text-sm',   dot: 'w-2.5 h-2.5', icon: 24 },
  lg: { avatar: 'w-12 h-12', text: 'text-base', dot: 'w-3 h-3',     icon: 28 },
  xl: { avatar: 'w-16 h-16', text: 'text-lg',   dot: 'w-3.5 h-3.5', icon: 36 },
};

export const SHAPES = {
  circle: 'rounded-full',
  square: 'rounded-lg',
};

export const STATUS_COLORS = {
  online:  'bg-green-500',
  offline: 'bg-gray-400',
  away:    'bg-amber-400',
  busy:    'bg-red-500',
};

export const INITIAL_COLORS = [
  'bg-blue-500',   'bg-violet-500',
  'bg-green-600',  'bg-amber-500',
  'bg-rose-500',   'bg-teal-500',
  'bg-indigo-500', 'bg-pink-500',
];

export function getInitials(name = '') {
  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

export function getColorFromName(name = '') {
  const code = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return INITIAL_COLORS[code % INITIAL_COLORS.length];
}