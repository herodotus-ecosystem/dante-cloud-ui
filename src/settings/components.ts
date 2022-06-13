import type { HttpMethodStyle, HttpMethodStyleAttribute } from '/@/lib/declarations';

export const httpMethodStyles: HttpMethodStyle = {
	PUT: { color: 'orange', icon: 'mdi-book-remove-multiple' },
	DELETE: { color: 'red', icon: 'mdi-book-minus-multiple' },
	POST: { color: 'green', icon: 'mdi-book-plus-multiple' },
	GET: { color: 'blue', icon: 'mdi-book-multiple' },
};

export const defaultHttpMethodStyle: HttpMethodStyleAttribute = httpMethodStyles.GET;
