import * as lodash from 'lodash';
import * as shortid from 'shortid';
import { Base64 } from 'js-base64';
import moment from 'moment';
import { _localForage, _localStorage } from './database';
import { _array } from './array';
import { _notify, Swal, SweetAlertIcon, SweetAlertResult } from './message';
import { _rsa, _aes } from './crypto';

moment.locale('zh-cn');

export {
    _localForage,
    _localStorage,
    _notify,
    _array,
    Swal,
    SweetAlertIcon,
    SweetAlertResult,
    lodash,
    shortid,
    moment,
    _rsa,
    _aes,
    Base64,
};
