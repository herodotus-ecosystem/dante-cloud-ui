import Vue from 'vue';

declare module 'vuetify/lib/framework' {
    import Vuetify from 'vuetify';
    export default Vuetify;
}

declare module 'vee-validate/rules' {
    import * as Rules from 'vee-validate/rules';
    export default Rules;
}

declare module '@hecate/plugins';
