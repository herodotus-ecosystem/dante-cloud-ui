import Swal from "sweetalert2";
import moment from "moment";

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
        swal.fire({
            position: "top",
            title: title,
            icon: type,
            timer: 2000,
            showConfirmButton: false,
        });
    },
    info(text) {
        this.information(text, "info");
    },

    error(text) {
        this.information(text, "error");
    },

    warning(text) {
        this.information(text, "warning");
    },

    success(text) {
        this.information(text, "success");
    },

    question(text) {
        this.information(text, "question");
    },
};

export { notify, swal, moment };
