import type { App } from 'vue';

import { defineRule, configure, Form, Field } from 'vee-validate';
import { localize, setLocale } from '@vee-validate/i18n';
import AllRules from '@vee-validate/rules';

export const setupVeeValidator = (app: App<Element>) => {
	Object.keys(AllRules).forEach((rule) => {
		defineRule(rule, AllRules[rule]);
	});

	configure({
		generateMessage: localize({
			zh_CN: {
				messages: {
					_default: '{field}不是一个有效值',
					alpha: '{field}只能包含字母字符',
					alpha_dash: '{field}能够包含字母数字字符、破折号和下划线',
					alpha_num: '{field}只能包含字母数字字符',
					alpha_spaces: '{field}只能包含字母字符和空格',
					between: '{field}必须在0:{min}与1:{max}之间',
					confirmed: '{field}不能和0:{target}匹配',
					digits: '{field}必须是数字，且精确到0:{length}位数',
					dimensions: '{field}必须在0:{width}像素与1:{height}像素之间',
					email: '{field}不是一个有效的邮箱',
					excluded: '{field}不是一个有效值',
					ext: '{field}不是一个有效的文件',
					image: '{field}不是一张有效的图片',
					one_of: '{field}不是一个有效值',
					integer: '{field}必须是整数',
					length: '{field}长度必须为0:{length}',
					max: '{field}不能超过0:{length}个字符',
					max_value: '{field}必须小于或等于0:{max}',
					mimes: '{field}不是一个有效的文件类型',
					min: '{field}必须至少有0:{length}个字符',
					min_value: '{field}必须大于或等于0:{min}',
					numeric: '{field}只能包含数字字符',
					regex: '{field}格式无效',
					required: '{field}不能为空',
					required_if: '{field}是必须的',
					size: '{field}必须小于0:{size}KB',
					url: '{field}不是一个有效的URL',
				},
			},
		}),
	});
	setLocale('zh_CN');

	app.component('ValidationObserver', Form);
	app.component('ValidationProvider', Field);
};