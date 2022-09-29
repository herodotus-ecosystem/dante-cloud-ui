import { lodash } from '@herodotus/utils';

import { createApi, Axios } from '@herodotus/apis';

const api = createApi('', '', '', {} as Axios );

export { lodash, api };
