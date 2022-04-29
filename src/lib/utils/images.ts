export const getVuetifyImage = (name: string): string => {
	const modules = import.meta.globEager('../../assets/vuetify/*');
	const path = `../../assets/vuetify/${name}`;
	return modules[path].default;
};
