import type { App } from 'vue';

import uploader from 'vue-simple-uploader';
import 'vue-simple-uploader/dist/style.css';

export const setupUploader = (app: App<Element>) => {
	app.use(uploader);
};
