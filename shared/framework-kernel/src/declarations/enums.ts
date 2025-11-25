export enum LayoutModeEnum {
  DEFAULT = 'defaults',
  CLASSIC = 'classic',
  TRANSVERSE = 'transverse',
  COLUMNS = 'transverse',
}

export enum ThemeModeEnum {
  DARK = 'dark',
  LIGHT = 'light',
  SYSTEM = 'system',
}

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

export enum SocialSourceEnum {
  INSTITUTION = 'INSTITUTION',
  SMS = 'SMS',
  WXAPP = 'WXAPP',
  QQ = 'QQ',
  WEIBO = 'WEIBO',
  BAIDU = 'BAIDU',
  WECHAT_OPEN = 'WECHAT_OPEN',
  WECHAT_MP = 'WECHAT_MP',
  WECHAT_ENTERPRISE = 'WECHAT_ENTERPRISE',
  WECHAT_ENTERPRISE_WEB = 'WECHAT_ENTERPRISE_WEB',
  DINGTALK = 'DINGTALK',
  DINGTALK_ACCOUNT = 'DINGTALK_ACCOUNT',
  ALIYUN = 'ALIYUN',
  TAOBAO = 'TAOBAO',
  ALIPAY = 'ALIPAY',
  TEAMBITION = 'TEAMBITION',
  HUAWEI_V2 = 'HUAWEI_V2',
  FEISHU = 'FEISHU',
  JD = 'JD',
  DOUYIN = 'DOUYIN',
  TOUTIAO = 'TOUTIAO',
  MI = 'MI',
  RENREN = 'RENREN',
  MEITUAN = 'MEITUAN',
  ELEME = 'ELEME',
  KUJIALE = 'KUJIALE',
  XMLY = 'XMLY',
  GITEE = 'GITEE',
  OSCHINA = 'OSCHINA',
  CSDN = 'CSDN',
  GITHUB = 'GITHUB',
  GITLAB = 'GITLAB',
  STACK_OVERFLOW = 'STACK_OVERFLOW',
  CODING = 'CODING',
  GOOGLE = 'GOOGLE',
  MICROSOFT = 'MICROSOFT',
  FACEBOOK = 'FACEBOOK',
  LINKEDIN = 'LINKEDIN',
  TWITTER = 'TWITTER',
  AMAZON = 'AMAZON',
  SLACK = 'SLACK',
  LINE = 'LINE',
  OKTA = 'OKTA',
  PINTEREST = 'PINTEREST',
}

export enum MenuScenario {
  APP = 'APP',
  PERSONAL = 'PERSONAL',
}
