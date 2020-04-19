import router from "../routers";
import {
    storage,
    storageSync,
    authrization,
    notify,
    swal,
    moment,
} from "./storage";

const utils = {
    navigation: {
        goBack(route) {
            let currentRouterName = route.name;
            let routerMatched = route.matched;
            let currentRouter = routerMatched.find(
                (match) => match.name === currentRouterName
            );
            let currentRouterParentName = currentRouter.parent.name;
            if (currentRouterParentName) {
                router.push({ name: currentRouterParentName });
            } else {
                router.go(-1);
            }
        },
        goToDetail(name, item) {
            router.replace({
                name: name,
                params: item,
            });
        },
    },
    auth: {
        logout() {
            storage.clear().then(() => {
                router.replace({ path: "/" });
            });
        },
    },
    constants: {
        statusDisplay: [
            { color: "error", icon: "warning" },
            { color: "green", icon: "check" },
            { color: "error", icon: "lock" },
            { color: "warning", icon: "history" },
        ],
    },
    array: {
        groupBy(array, fn) {
            const groups = {};
            array.forEach(function (o) {
                const group = fn(o);
                groups[group] = groups[group] || [];
                groups[group].push(o);
            });
            return Object.keys(groups).map(function (group) {
                return groups[group];
            });
        },
        sort(array, comparator) {
            return array.sort(function (a, b) {
                var x = a[comparator];
                var y = b[comparator];
                return x < y ? -1 : x > y ? 1 : 0;
            });
        },

        find(array, element, comparator) {
            return array.find(
                (item) => item[comparator] === element[comparator]
            );
        },
        remove(array, element, comparator) {
            const index = array.findIndex(
                (item) => item[comparator] === element[comparator]
            );
            array.splice(index, 1);
            return array;
        },
    },
    object: {
        isEmpty(object) {
            if (object) {
                let array = Object.keys(object);
                if (array && array.length > 0) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        },
    },
};

export { storage, storageSync, authrization, notify, swal, moment, utils };
