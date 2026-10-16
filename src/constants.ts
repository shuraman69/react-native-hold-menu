import { Dimensions, Platform } from 'react-native';

const HOLD_ITEM_TRANSFORM_DURATION = 150;
const HOLD_ITEM_SCALE_DOWN_VALUE = 0.95;
const HOLD_ITEM_SCALE_DOWN_DURATION = 210;

const SPRING_CONFIGURATION = {
  damping: 33,
  mass: 1.03,
  stiffness: 500,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
};

const SPRING_CONFIGURATION_MENU = {
  damping: 39,
  mass: 1.09,
  stiffness: 500,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
};

enum CONTEXT_MENU_STATE {
  UNDETERMINED = 0,
  ACTIVE,
  END,
}

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('screen');

const MENU_CONTAINER_WIDTH = 100;
const MENU_WIDTH = (WINDOW_WIDTH * 60) / 100;

const MENU_TRANSFORM_ORIGIN_TOLERENCE = 10;

const IS_IOS = Platform.OS === 'ios';

const FONT_SCALE = Dimensions.get('screen').fontScale;

// StyleSheet.absoluteFillObject removed in RN 0.85, and StyleSheet.absoluteFill
// is a registered style id (number) on older RN versions, so it can't be spread
const ABSOLUTE_FILL = {
  position: 'absolute' as const,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

export {
  CONTEXT_MENU_STATE,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  MENU_WIDTH,
  MENU_CONTAINER_WIDTH,
  HOLD_ITEM_TRANSFORM_DURATION,
  HOLD_ITEM_SCALE_DOWN_VALUE,
  HOLD_ITEM_SCALE_DOWN_DURATION,
  SPRING_CONFIGURATION,
  SPRING_CONFIGURATION_MENU,
  MENU_TRANSFORM_ORIGIN_TOLERENCE,
  IS_IOS,
  FONT_SCALE,
  ABSOLUTE_FILL,
};
