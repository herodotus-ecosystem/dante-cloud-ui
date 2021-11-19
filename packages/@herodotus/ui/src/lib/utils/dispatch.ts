import router from '../../router';
import { RawLocation, Route } from 'vue-router';
import { _token } from './repository';
import { _lib } from './base';

export class Router {
    private static instance = new Router();

    private constructor() {}

    public static getInstance(): Router {
        return this.instance;
    }

    public goTo(location: RawLocation): void {
        router.replace(location);
    }

    public signin(): void {
        this.goTo({ name: 'Signin' });
    }

    public goToDetail(name: string, params: Dictionary<string>): void {
        this.goTo({ name, params });
    }

    public goBack(route: Route): void {
        if (route.path) {
            const destination = this.getParentPath(route.path);
            router.replace({ path: destination });
        } else {
            router.go(-1);
        }
    }

    public getParentPath(path: string): string {
        const array = _lib.lodash.split(path, '/');
        const result = _lib.lodash.dropRight(array);
        return _lib.lodash.join(result, '/');
    }
}

export const _router: Router = Router.getInstance();

export class Action {
    private static instance = new Action();

    private constructor() {}

    public static getInstance(): Action {
        return this.instance;
    }
    /**
     * 前台登出
     */
    public signout(): void {
        console.log('signout');
        _token.clear().then(() => {
            _router.signin();
        });
    }
    public signoutDialog(title: string, text: string, icon: _lib.SweetAlertIcon): void {
        _lib.Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showClass: {
                popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
            },
            confirmButtonText: '已阅!',
            willClose: () => {
                this.signout();
            },
        });
    }
}

export const _action: Action = Action.getInstance();
