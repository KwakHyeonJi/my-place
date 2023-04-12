export const VIEWS = {
  CIRCULAR: 'circular',
  SPREAD: 'spread',
  GRID: 'grid',
} as const;

export const MODES = {
  DEFAULT: 'default',
  CHANGE_IMAGE: 'changeImage',
} as const;

export type ViewName = keyof typeof VIEWS;
export type ViewValue = (typeof VIEWS)[ViewName];
export type ModeName = keyof typeof MODES;
export type ModeValue = (typeof MODES)[ModeName];
