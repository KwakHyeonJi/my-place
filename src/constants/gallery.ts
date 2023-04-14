export const VIEWS = {
  CIRCULAR: 'circular',
  SPREAD: 'spread',
  GRID: 'grid',
} as const;

export const MODES = {
  DEFAULT: 'default',
  CHANGE_IMAGE: 'changeImage',
} as const;

export const radios = {
  A: [3, 4],
  B: [9, 16],
  C: [1, 1],
};

export type ViewName = keyof typeof VIEWS;
export type ViewValue = (typeof VIEWS)[ViewName];
export type ModeName = keyof typeof MODES;
export type ModeValue = (typeof MODES)[ModeName];
export type RatioName = keyof typeof radios;
export type RatioValue = (typeof radios)[RatioName];
