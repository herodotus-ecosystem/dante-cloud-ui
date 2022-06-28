import translations from './translations';

export default function translate(template: string, replacements: Record<string, string>) {
	replacements = replacements || {};

	// Translate
	template = translations[template] || template;

	// Replace
	return template.replace(/{([^}]+)}/g, function (_, key) {
		return replacements[key] || '{' + key + '}';
	});
}
