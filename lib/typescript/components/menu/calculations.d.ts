import type { SharedValue } from 'react-native-reanimated';
import type { MenuInternalProps } from './types';
export declare const leftOrRight: (menuProps: SharedValue<MenuInternalProps>) => number;
export declare const getColor: (isTitle: boolean | undefined, isDestructive: boolean | undefined, themeValue: 'light' | 'dark') => "gray" | "rgba(0, 0, 0, 1)" | "rgb(255, 255, 255)" | "rgb(255, 59,48)" | "rgb(255, 69,58)";
