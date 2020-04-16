import router from "../routers";
import { storage, storageSync, local, notify, swal, moment } from "./storage";

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
    },
    auth: {
        logout() {
            storageSync.clear().then(() => {
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
        remove(array, element) {
            let index = array.indexOf(element);
            if (index > -1) {
                array.splice(index, 1);
            }
        },
    },
};

export { storage, storageSync, local, notify, swal, moment, utils };
