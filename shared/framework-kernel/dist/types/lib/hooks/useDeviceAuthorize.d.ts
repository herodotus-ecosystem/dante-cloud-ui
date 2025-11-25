import { ShallowRef, Ref } from 'vue';
import { PingResponse } from '../../declarations';
export default function useDeviceAuthorize(deviceCode: ShallowRef<string>, clientId: ShallowRef<string>, clientSecret: ShallowRef<string>, scope?: string): {
    pullingResponse: Ref<PingResponse[], PingResponse[]>;
    successResponse: ShallowRef<{}, {}>;
    isFailed: ShallowRef<boolean, boolean>;
    isSuccess: ShallowRef<boolean, boolean>;
    schedule: () => void;
    clear: () => void;
    slowDown: () => void;
};
