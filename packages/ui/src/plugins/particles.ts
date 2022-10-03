import type { App } from 'vue';

import Particles from 'particles.vue3';

const DefaultOptions = {
	fullScreen: {
		zIndex: 1,
	},
	interactivity: {
		detectsOn: 'window',
		events: {
			onhover: {
				enable: true,
				mode: 'grab',
			},
			onclick: {
				enable: true,
				mode: 'push',
			},
			resize: true,
		},
		modes: {
			bubble: {
				distance: 400,
				duration: 2,
				opacity: 0.8,
				size: 40,
				speed: 3,
			},
			push: {
				quantity: 4,
				particles_nb: 4,
			},
			repulse: {
				distance: 200,
				duration: 0.4,
			},
			grab: {
				distance: 200,
				line_linked: {
					opacity: 1,
				},
			},
		},
	},
	particles: {
		color: {
			value: '#ffffff',
		},
		links: {
			color: '#ffffff',
			distance: 150,
			enable: true,
			opacity: 0.5,
			width: 1,
		},
		collisions: {
			enable: true,
		},
		move: {
			direction: 'none',
			enable: true,
			outMode: 'bounce',
			random: false,
			speed: 4,
			straight: false,
		},
		number: {
			density: {
				enable: true,
				value_area: 800,
			},
			value: 80,
		},
		opacity: {
			value: 0.5,
		},
		shape: {
			type: 'circle',
		},
		size: {
			random: true,
			value: 5,
		},
	},
	detectRetina: true,
};

const SnowOptions = {
	fullScreen: {
		zIndex: 1,
	},
	interactivity: {
		events: {
			onClick: {
				enable: true,
				mode: 'repulse',
			},
			onHover: {
				enable: true,
				mode: 'bubble',
			},
		},
		modes: {
			bubble: {
				distance: 400,
				duration: 0.3,
				opacity: 1,
				size: 4,
				divs: {
					distance: 200,
					duration: 0.4,
					mix: false,
					selectors: [],
				},
			},
			grab: {
				distance: 400,
				links: {
					opacity: 0.5,
				},
			},
			repulse: {
				divs: {
					distance: 200,
					duration: 0.4,
					factor: 100,
					speed: 1,
					maxSpeed: 50,
					easing: 'ease-out-quad',
					selectors: [],
				},
			},
		},
	},
	particles: {
		links: {
			color: {
				value: '#ffffff',
			},
			distance: 500,
			opacity: 0.4,
			width: 2,
		},
		move: {
			attract: {
				rotate: {
					x: 600,
					y: 1200,
				},
			},
			direction: 'bottom',
			enable: true,
			outModes: {
				bottom: 'out',
				left: 'out',
				right: 'out',
				top: 'out',
			},
		},
		number: {
			density: {
				enable: true,
			},
			value: 400,
		},
		opacity: {
			random: {
				enable: true,
			},
			value: {
				min: 0.1,
				max: 0.5,
			},
			animation: {
				speed: 1,
				minimumValue: 0.1,
			},
		},
		size: {
			random: {
				enable: true,
			},
			value: {
				min: 1,
				max: 10,
			},
			animation: {
				speed: 40,
				minimumValue: 0.1,
			},
		},
	},
};

export const options = DefaultOptions;

export const setupParticles = (app: App<Element>) => {
	app.use(Particles);
};
