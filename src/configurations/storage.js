import { notify, swal, moment } from "./base";
const localForage = require("localforage");

const storage = {
    getItem(key) {
        return new Promise((resolve, reject) => {
            localForage
                .getItem(key)
                .then((value) => {
                    resolve(value);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    setItem(key, value) {
        return new Promise((resolve, reject) => {
            localForage
                .setItem(key, value)
                .then((value) => {
                    resolve(value);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    removeItem(key) {
        return new Promise((resolve, reject) => {
            localForage
                .removeItem(key)
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    clear() {
        return new Promise((resolve, reject) => {
            localForage
                .clear()
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    length() {
        return new Promise((resolve, reject) => {
            localForage
                .length()
                .then((numberOfKeys) => {
                    resolve(numberOfKeys);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    key(keyIndex) {
        return new Promise((resolve, reject) => {
            localForage
                .key(keyIndex)
                .then((keyName) => {
                    resolve(keyName);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    keys() {
        return new Promise((resolve, reject) => {
            localForage
                .keys()
                .then((keys) => {
                    resolve(keys);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    iterate() {
        return new Promise((resolve, reject) => {
            localForage
                .iterate((value, key, iterationNumber) => {
                    resolve([value, key, iterationNumber]);
                })
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    // This code runs if there were any errors
                    reject(err);
                });
        });
    },
    setDriver(driverName) {
        return new Promise((resolve, reject) => {
            resolve(localForage.setDriver(driverName));
        });
    },
    config(options) {
        return new Promise((resolve, reject) => {
            resolve(localForage.config(options));
        });
    },
    createInstance(options) {
        return new Promise((resolve, reject) => {
            resolve(localForage.createInstance(options));
        });
    },
};

const AUTHORIZATION_KEY_TOKEN = "token";
const AUTHORIZATION_KEY_EXPIRES = "expires";

const storageSync = {
    async removeItem(key) {
        await storage.removeItem(key);
    },
    async clear() {
        await storage.clear();
    },

    async setAuthorizationToken(token, expires_in) {
        let expires = moment().add(expires_in, "seconds").valueOf();
        await storage.setItem(AUTHORIZATION_KEY_TOKEN, token);
        await storage.setItem(AUTHORIZATION_KEY_EXPIRES, expires);
    },
    async getExpires() {
        return await storage.getItem(AUTHORIZATION_KEY_EXPIRES);
    },
    async getToken() {
        return await storage.getItem(AUTHORIZATION_KEY_TOKEN);
    },
};

const local = {
    setObject(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getObject(key) {
        let result = localStorage.getItem(key);
        if (result) {
            return JSON.parse(result);
        }
        return null;
    },
    setItem(key, value) {
        localStorage.setItem(key, value);
    },
    getItem(key) {
        return localStorage.getItem(key);
    },
    removeItem(key) {
        localStorage.removeItem(key);
    },
    clear() {
        localStorage.clear();
    },
    isExist(key) {
        if (key && key in localStorage) {
            return true;
        } else {
            return false;
        }
    },
};

export { storage, storageSync, local, notify, swal, moment };
