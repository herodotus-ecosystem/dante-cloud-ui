import Swal from "sweetalert2";
import moment from "moment";
import "./prototype.js";

/**
 * 各类通用的js经常会存在交叉引用的情况，特别是与Vue各种组件一起使用，会感觉很乱。所以模拟java 的继承关系处理js的引用关系。
 *
 * 当前的引用关系：
 *
 * sweetalert2
 * moment
 * |-- base.js
 *     |-- storage.js
 *         |-- router/index.js
 *             |-- util.js
 *                 |-- http.js
 *                     |-- api.js
 *                         |-- plugins/configuration.js
 */

const swal = Swal;
// 中文简体
moment.locale("zh-cn");

const notify = {
    information(title, type) {
        return swal.fire({
            position: "top",
            title: title,
            icon: type,
            timer: 2000,
            showConfirmButton: false,
        });
    },
    info(text) {
        return this.information(text, "info");
    },

    error(text) {
        return this.information(text, "error");
    },

    warning(text) {
        return this.information(text, "warning");
    },

    success(text) {
        return this.information(text, "success");
    },

    question(text) {
        return this.information(text, "question");
    },
};

export { notify, swal, moment };
