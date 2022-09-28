export interface Session {
    sessionId: string;
    publicKey: string;
}
export interface Coordinate {
    x: number;
    y: number;
}
export interface Captcha {
    identity: string;
    category: string;
}
export interface Verification extends Captcha {
    coordinate: Coordinate;
    coordinates: Array<Coordinate>;
    characters: string;
}
export interface GraphicCaptcha extends Captcha {
    graphicImageBase64: string;
}
export interface JigsawCaptcha extends Captcha {
    originalImageBase64: string;
    sliderImageBase64: string;
}
export interface WordClickCaptcha extends Captcha {
    wordClickImageBase64: string;
    words: string;
    wordsCount: number;
}
export interface UserErrorStatus {
    errorTimes: number;
    remainTimes: number;
    locked: boolean;
}
export declare type CaptchaResource = GraphicCaptcha | JigsawCaptcha | WordClickCaptcha;
export declare type CaptchaData = Coordinate | Array<Coordinate> | string;
export declare type BehaviorCaptchaCategory = 'JIGSAW' | 'WORD_CLICK';
