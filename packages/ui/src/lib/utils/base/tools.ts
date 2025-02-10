import type { ModuleNamespace } from 'vite/types/hot.js';

const socialLogoModules = import.meta.glob('../../../static/images/social/*', { eager: true });

export const getSocialLogo = (name: string, suffix = 'png') => {
  const modules = socialLogoModules as ModuleNamespace;

  const index = `../../../static/images/social/${name}.${suffix}`;
  const item = modules[`${index}`];
  const module = item.default || '';
  return module;
};

export const getAssetsFile = (url: string) => {
  return new URL(`../../../static/images/${url}`, import.meta.url).href;
};
