import type { ISourceOptions } from '@/lib/declarations';

export const options: ISourceOptions = {
  particles: {
    number: {
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
      value: 100,
    },
    links: {
      distance: 125,
      enable: true,
      triangles: {
        enable: true,
        opacity: 0.1,
      },
    },
    move: {
      enable: true,
      speed: 5,
    },
    size: {
      value: 1,
    },
    shape: {
      type: 'circle',
    },
  },
};
