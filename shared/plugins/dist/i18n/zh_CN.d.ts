/**
 * 先借用 vee-validate 的 i18n 配置。后续用到哪个改哪个
 */
declare const zh_CN: {
    validations: {
        alpha: string;
        alpha_dash: string;
        alpha_num: string;
        alpha_spaces: string;
        between: string;
        confirmed: string;
        digits: string;
        dimensions: string;
        email: string;
        excluded: string;
        ext: string;
        image: string;
        one_of: string;
        integer: string;
        length: string;
        max: string;
        max_value: string;
        mimes: string;
        min: string;
        min_value: string;
        numeric: string;
        regex: string;
        required: string;
        required_if: string;
        size: string;
        url: string;
    };
};
export default zh_CN;
