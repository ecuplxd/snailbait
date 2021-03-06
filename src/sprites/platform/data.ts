import { PlatformData } from './model';

export const PLATFORM_HEIGHT = 8;

export const PLATFORM_VELOCITY_MULTIPLIER = 4.35;

export const PLATFORM_STROKE_WIDTH = 2;

export const PLATFORM_STROKE_STYLE = 'rgb(0,0,0)';

export const STARTING_PLATFORM_OFFSET = 0;

export const PLATFORM_DATA: PlatformData[] = [
  // Screen 1
  {
    left: 10,
    width: 230,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(150,190,255)',
    opacity: 1.0,
    track: 1,
    pulsate: false,
  },
  {
    left: 250,
    width: 100,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(150,190,255)',
    opacity: 1.0,
    track: 2,
    pulsate: false,
  },
  {
    left: 400,
    width: 125,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(250,0,0)',
    opacity: 1.0,
    track: 3,
    pulsate: false,
  },
  {
    left: 633,
    width: 100,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(80,140,230)',
    opacity: 1.0,
    track: 1,
    pulsate: false,
  },

  // Screen 2
  {
    left: 810,
    width: 100,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(200,200,0)',
    opacity: 1.0,
    track: 2,
    pulsate: false,
  },
  {
    left: 1025,
    width: 100,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(80,140,230)',
    opacity: 1.0,
    track: 2,
    pulsate: false,
  },
  {
    left: 1200,
    width: 125,
    height: PLATFORM_HEIGHT,
    fillStyle: 'aqua',
    opacity: 1.0,
    track: 3,
    pulsate: false,
  },
  {
    left: 1400,
    width: 180,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(80,140,230)',
    opacity: 1.0,
    track: 1,
    pulsate: false,
  },

  // Screen 3
  {
    left: 1625,
    width: 100,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(200,200,0)',
    opacity: 1.0,
    track: 2,
    pulsate: false,
  },
  {
    left: 1800,
    width: 250,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(80,140,230)',
    opacity: 1.0,
    track: 1,
    pulsate: false,
  },
  {
    left: 2000,
    width: 100,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(200,200,80)',
    opacity: 1.0,
    track: 2,
    pulsate: false,
  },
  {
    left: 2100,
    width: 100,
    height: PLATFORM_HEIGHT,
    fillStyle: 'aqua',
    opacity: 1.0,
    track: 3,
  },

  // Screen 4
  {
    left: 2269,
    width: 200,
    height: PLATFORM_HEIGHT,
    fillStyle: 'gold',
    opacity: 1.0,
    track: 1,
  },
  {
    left: 2500,
    width: 200,
    height: PLATFORM_HEIGHT,
    fillStyle: '#2b950a',
    opacity: 1.0,
    track: 2,
    snail: true,
  },
];
