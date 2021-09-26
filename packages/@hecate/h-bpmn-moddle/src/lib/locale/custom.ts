import TranslationsChinese from './zh';
export default function (template: string, replacements: Record<string, string>): string {
    const _replacements = replacements || {};

    const _template = TranslationsChinese[template] || template;

    return _template.replace(/{([^}]+)}/g, function (_, key) {
        return _replacements[key] || '{' + key + '}';
    });
}
