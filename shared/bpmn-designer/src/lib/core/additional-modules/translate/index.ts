import translations from './zh-cn';

export default function translate(template: string, replacements: Record<string, string>) {
  replacements = replacements || {};

  const resources = translations as Record<string, string>;

  // Translate
  template = resources[template] || template;

  // Replace
  return template.replace(/{([^}]+)}/g, function (_, key) {
    return replacements[key] || '{' + key + '}';
  });
}
