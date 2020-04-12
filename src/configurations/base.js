import Swal from 'sweetalert2';
import moment from 'moment';

const swal = Swal;
// 中文简体
moment.locale('zh-cn');

const notify = {
    information(title, type) {
        swal.fire({
            position: 'top',
            title: title,
            icon: type,
            timer: 2000,
            showConfirmButton: false,
        });
    },
    info(text) {
        this.information(text, 'info');
    },

    error(text) {
        this.information(text, 'error');
    },

    warning(text) {
        this.information(text, 'warning');
    },

    success(text) {
        this.information(text, 'success');
    },

    question(text) {
        this.information(text, 'question');
    },
};

export { notify, swal, moment };
