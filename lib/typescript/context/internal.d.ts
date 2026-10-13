import { MutableRefObject } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { CONTEXT_MENU_STATE } from '../constants';
import { MenuInternalProps, RenderCustomView } from '../components/menu/types';
export type InternalContextType = {
    state: SharedValue<CONTEXT_MENU_STATE>;
    theme: SharedValue<'light' | 'dark'>;
    menuProps: SharedValue<MenuInternalProps>;
    customViewRef: MutableRefObject<RenderCustomView | null>;
    safeAreaInsets?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
};
export declare const InternalContext: import("react").Context<InternalContextType>;
