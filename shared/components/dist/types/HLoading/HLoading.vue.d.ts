import { QSpinner, QSpinnerAudio, QSpinnerBall, QSpinnerBars, QSpinnerBox, QSpinnerClock, QSpinnerComment, QSpinnerCube, QSpinnerDots, QSpinnerFacebook, QSpinnerGears, QSpinnerGrid, QSpinnerHearts, QSpinnerHourglass, QSpinnerInfinity, QSpinnerIos, QSpinnerOrbit, QSpinnerOval, QSpinnerPie, QSpinnerPuff, QSpinnerRadio, QSpinnerRings, QSpinnerTail } from 'quasar';
import { PropType } from 'vue';
import { Spinners } from '../lib';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    type: {
        type: PropType<Spinners>;
        default: string;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    type: {
        type: PropType<Spinners>;
        default: string;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    type: "DEFAULT" | "AUDIO" | "BALL" | "BARS" | "BOX" | "CLOCK" | "COMMENT" | "CUBE" | "DOTS" | "FACEBOOK" | "GEARS" | "GRID" | "HEARTS" | "HOURGLASS" | "INFINITY" | "IOS" | "ORBIT" | "OVAL" | "PIE" | "PUFF" | "RADIO" | "RINGS" | "TAIL";
    size: string;
    color: string;
}, {}, {
    DEFAULT: import('quasar').ComponentConstructor<QSpinner>;
    AUDIO: import('quasar').ComponentConstructor<QSpinnerAudio>;
    BALL: import('quasar').ComponentConstructor<QSpinnerBall>;
    BARS: import('quasar').ComponentConstructor<QSpinnerBars>;
    BOX: import('quasar').ComponentConstructor<QSpinnerBox>;
    CLOCK: import('quasar').ComponentConstructor<QSpinnerClock>;
    COMMENT: import('quasar').ComponentConstructor<QSpinnerComment>;
    CUBE: import('quasar').ComponentConstructor<QSpinnerCube>;
    DOTS: import('quasar').ComponentConstructor<QSpinnerDots>;
    FACEBOOK: import('quasar').ComponentConstructor<QSpinnerFacebook>;
    GEARS: import('quasar').ComponentConstructor<QSpinnerGears>;
    GRID: import('quasar').ComponentConstructor<QSpinnerGrid>;
    HEARTS: import('quasar').ComponentConstructor<QSpinnerHearts>;
    HOURGLASS: import('quasar').ComponentConstructor<QSpinnerHourglass>;
    INFINITY: import('quasar').ComponentConstructor<QSpinnerInfinity>;
    IOS: import('quasar').ComponentConstructor<QSpinnerIos>;
    ORBIT: import('quasar').ComponentConstructor<QSpinnerOrbit>;
    OVAL: import('quasar').ComponentConstructor<QSpinnerOval>;
    PIE: import('quasar').ComponentConstructor<QSpinnerPie>;
    PUFF: import('quasar').ComponentConstructor<QSpinnerPuff>;
    RADIO: import('quasar').ComponentConstructor<QSpinnerRadio>;
    RINGS: import('quasar').ComponentConstructor<QSpinnerRings>;
    TAIL: import('quasar').ComponentConstructor<QSpinnerTail>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
