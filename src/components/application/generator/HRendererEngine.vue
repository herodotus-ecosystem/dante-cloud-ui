<script lang="ts">
import { h, resolveComponent, SetupContext, PropType, ComponentInternalInstance, inject } from 'vue';
import { QIcon } from 'quasar';

import type { Methods, Element, Props } from '/@/lib/declarations';

import { lodash } from '/@/lib/utils';

const bindMethods = (methods: Methods) => {
	const currentInstance = inject('currentInstance');
	const { proxy } = currentInstance as ComponentInternalInstance;

	if (lodash.isEmpty(methods)) {
		return;
	}

	const _methods = {};
	const keys = Object.keys(methods);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		_methods[key] = methods[key].bind(proxy);
	}
	return _methods;
};

const renderChildElement = (elements: Array<Element>): any => {
	const currentInstance = inject('currentInstance');
	const { proxy } = currentInstance as ComponentInternalInstance;

	return elements.map((element) => {
		const name = element.name;
		const attrs = element.attrs;
		const methods = element.methods as Methods;
		const children = element.children;

		if (methods) {
			if (children) {
				return h(resolveComponent(name), { ...attrs, ...bindMethods.call(proxy, methods) }, renderChildElement(children));
			} else {
				return h(resolveComponent(name), { ...attrs, ...bindMethods.call(proxy, methods) });
			}
		} else {
			if (children) {
				return h(resolveComponent(name), { ...attrs }, renderChildElement(children));
			} else {
				return h(resolveComponent(name), { ...attrs });
			}
		}
	});
};

const RendererEngine = (props: Props, context: SetupContext<('save' | 'clear')[]>) => {
	const { element } = props;

	const name = element.name;
	const attrs = element.attrs;
	const methods = element.methods;

	const children = element.children ? renderChildElement(element.children) : context.slots.default;

	if (methods) {
		return h(resolveComponent(name), { ...attrs, ...bindMethods.call(null, methods) }, children);
	} else {
		return h(resolveComponent(name), { ...attrs }, children);
	}
};

RendererEngine.props = {
	element: {
		type: Object as PropType<Element>,
		required: true,
		default: () => ({}),
	},
	createElement: {
		type: Function,
		default: null,
	},
};

export default RendererEngine;
</script>
