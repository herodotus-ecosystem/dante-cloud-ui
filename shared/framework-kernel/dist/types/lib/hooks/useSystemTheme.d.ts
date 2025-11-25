import { ThemeModeEnum } from '../../declarations';
export default function useSystemTheme(): {
    theme: import('vue').ComputedRef<ThemeModeEnum>;
};
