import TranslationsChinese from './zh';
export default function(template, replacements) {
    let _replacements = replacements || {};

    let _template = TranslationsChinese[template] || template;

    return _template.replace(/{([^}]+)}/g, function(_, key) {
        return _replacements[key] || '{' + key + '}';
    });
}
