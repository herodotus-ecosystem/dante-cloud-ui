import { Constants, Token, Enums, Router, Action, _lib } from 'utils';
import { Identity } from 'modules';
import Vue from 'vue';
import VueRouter, { Route, RawLocation } from 'vue-router';

declare module 'vue/types/vue' {
    interface Vue {
        beforeRouteEnter?(to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => void)) => void): void;
        beforeRouteLeave?(to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => void)) => void): void;
        beforeRouteUpdate?(
            to: Route,
            from: Route,
            next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
        ): void;
        $router: VueRouter;
        $route: Route;
        $token: Token;
        $enums: Enums;
        $constants: Constants;
        $axios: Http;
        $navigation: Router;
        $action: Action;
        $security: Identity;
        $lib: _lib;
        $notify: _lib._notify;
        $chartist: any;
    }
}
