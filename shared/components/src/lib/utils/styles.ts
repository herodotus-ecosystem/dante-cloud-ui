export const Symbol = {
  DASH: '-'
};

export const Content = {
  text: 'text',
  bg: 'bg'
};

export const Grid = {
  auto: 'auto',
  col: 'col'
};

export const createClass = (base: string, ...params: string[]) => {
  return base + Symbol.DASH + params.join(Symbol.DASH);
};

export const createTextColor = (color: string) => {
  return createClass(Content.text, color);
};

export const createBackgroundColor = (color: string) => {
  return createClass(Content.bg, color);
};

export const createColClass = (breakpoint = '', size = '') => {
  if (breakpoint && size) {
    return createClass(Grid.col, breakpoint, size);
  } else {
    if (breakpoint) {
      return createClass(Grid.col, breakpoint);
    } else if (size) {
      return createClass(Grid.col, size);
    } else {
      return Grid.col;
    }
  }
};
