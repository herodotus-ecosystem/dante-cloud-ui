export enum CaptchaCategoryEnum {
	/**
	 * 滑块拼图验证码
	 */
	JIGSAW = 'JIGSAW',
	/**
	 * 文字点选验证码
	 */
	WORD_CLICK = 'WORD_CLICK',
	/**
	 * 算数类型验证码
	 */
	ARITHMETIC = 'ARITHMETIC',
	/**
	 * 中文类型验证码
	 */
	CHINESE = 'CHINESE',
	/**
	 * 中文GIF类型验证码
	 */
	CHINESE_GIF = 'CHINESE_GIF',
	/**
	 * GIF类型验证码
	 */
	SPEC_GIF = 'SPEC_GIF',
	/**
	 * PNG类型验证码
	 */
	SPEC = 'SPEC',
	/**
	 * Hutool线段干扰验证码
	 */
	HUTOOL_LINE = 'HUTOOL_LINE',
	/**
	 * Hutool圆圈干扰验证码
	 */
	HUTOOL_CIRCLE = 'HUTOOL_CIRCLE',
	/**
	 * Hutool扭曲干扰验证码
	 */
	HUTOOL_SHEAR = 'HUTOOL_SHEAR',
	/**
	 * Hutool GIF验证码
	 */
	HUTOOL_GIF = 'HUTOOL_GIF',
}

export enum AuthorityTypeEnum {
	API,
	MENU,
	PAGE,
	MINI_PAGE,
}

export enum IdentityEnum {
	LEADERSHIP,
	SECTION_LEADER,
	STAFF,
}

export enum GenderEnum {
	OTHERS,
	MAN,
	WOMAN,
}

export enum StatusEnum {
	FORBIDDEN,
	ENABLE,
	LOCKING,
	EXPIRED,
}

export enum ConstantEnum {
	APPLICATION = 'applicationType',
	GENDER = 'gender',
	GRANT = 'grantType',
	IDENTITY = 'identity',
	STATUS = 'status',
	SUPPLIER = 'supplierType',
	TECHNOLOGY = 'technologyType',
	EXPRESSION = 'expression',
}

export enum ApplicationEnum {
	WEB,
	SERVICE,
	APP,
	WAP,
	MINI,
}

export enum TechnologyEnum {
	JAVA,
	NET,
	PHP,
	NODE,
	IOS,
	ANDROID,
	WEAPP,
	ALIAPP,
	DUAPP,
}

export enum SupplierType {
	CORE,
	BAT,
	THIRD_PARTY,
	Outsourcing,
}
