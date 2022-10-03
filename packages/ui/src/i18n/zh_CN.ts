/**
 * 先借用 vee-validate 的 i18n 配置。后续用到哪个改哪个
 */
const zh_CN = {
	validations: {
		alpha: '{property}只能包含字母字符',
		alpha_dash: '{property}能够包含字母数字字符、破折号和下划线',
		alpha_num: '{property}只能包含字母数字字符',
		alpha_spaces: '{property}只能包含字母字符和空格',
		between: '{property}必须在0:{min}与1:{max}之间',
		confirmed: '{property}不能和0:{target}匹配',
		digits: '{property}必须是数字，且精确到0:{length}位数',
		dimensions: '{property}必须在0:{width}像素与1:{height}像素之间',
		email: '{property}不是一个有效的邮箱',
		excluded: '{property}不是一个有效值',
		ext: '{property}不是一个有效的文件',
		image: '{property}不是一张有效的图片',
		one_of: '{property}不是一个有效值',
		integer: '{property}必须是整数',
		length: '{property}长度必须为0:{length}',
		max: '{property}不能超过0:{length}个字符',
		max_value: '{property}必须小于或等于0:{max}',
		mimes: '{property}不是一个有效的文件类型',
		min: '{property}必须至少有0:{length}个字符',
		min_value: '{property}必须大于或等于0:{min}',
		numeric: '{property}只能包含数字字符',
		regex: '{property}格式无效',
		required: '{property}不能为空',
		required_if: '{property}是必须的',
		size: '{property}必须小于0:{size}KB',
		url: '{property}不是一个有效的URL',
	},
};

export default zh_CN;
