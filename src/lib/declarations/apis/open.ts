import { CaptchaCategory } from '/@/lib/enums';

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
	category: CaptchaCategory;
}

export interface Verification extends Captcha {
	coordinate: Coordinate;
	coordinates: Array<Coordinate>;
	characters: string;
}

export type GraphCaptchaData = Coordinate | Array<Coordinate> | string;
