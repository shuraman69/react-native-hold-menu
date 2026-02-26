import { createContext, MutableRefObject } from 'react';
import type Animated from 'react-native-reanimated';
import type { CONTEXT_MENU_STATE } from '../constants';
import { MenuInternalProps, RenderCustomView } from '../components/menu/types';

export type InternalContextType = {
  state: Animated.SharedValue<CONTEXT_MENU_STATE>;
  theme: Animated.SharedValue<'light' | 'dark'>;
  menuProps: Animated.SharedValue<MenuInternalProps>;
  customViewRef: MutableRefObject<RenderCustomView | null>;
  safeAreaInsets?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

// @ts-ignore
export const InternalContext = createContext<InternalContextType>();
