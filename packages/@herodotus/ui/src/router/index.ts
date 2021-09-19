import Vue from 'vue';
import VueRouter, { RawLocation } from 'vue-router';
import NProgress from 'nprogress';
import { _token } from '../lib/utils';
import { publicRouters, protectedRouters } from './configs';
import 'nprogress/nprogress.css';

const routes = publicRouters.concat(protectedRouters);

Vue.use(VueRouter);

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location: RawLocation) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (originalPush.call(this, location) as any).catch((err: any) => err);
};

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location: RawLocation) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (originalReplace.call(this, location) as any).catch((err: any) => err);
};

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    // 这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (to.matched.some((r) => r.meta.requireAuth)) {
        _token.expires().then((expires) => {
            if (_token.isNotExpired(expires)) {
                next();
            } else {
                _token.clear().then(() => {
                    next({
                        path: '/signin',
                    });
                });
            }
        });
    } else {
        next();
    }
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
