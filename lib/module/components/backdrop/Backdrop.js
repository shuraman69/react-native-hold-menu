import React, { memo } from 'react';
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler'; // Components

import { BlurView } from '@react-native-community/blur'; // Utils

import { styles } from './styles';
import { ABSOLUTE_FILL, CONTEXT_MENU_STATE, HOLD_ITEM_TRANSFORM_DURATION, IS_IOS, WINDOW_HEIGHT } from '../../constants';
import { BACKDROP_BLUR_AMOUNT, BACKDROP_LIGHT_BACKGROUND_COLOR, BACKDROP_DARK_BACKGROUND_COLOR } from './constants';
import { useInternal } from '../../hooks';
const AnimatedBlurView = IS_IOS ? Animated.createAnimatedComponent(BlurView) : Animated.View;

const BackdropComponent = () => {
  const {
    state,
    theme
  } = useInternal();
  const startPosition = useSharedValue({
    x: 0,
    y: 0
  });
  const tapGesture = Gesture.Tap().onBegin(event => {
    'worklet';

    startPosition.value = {
      x: event.x,
      y: event.y
    };
  }).onTouchesCancelled(() => {
    'worklet';

    state.value = CONTEXT_MENU_STATE.END;
  }).onEnd((event, success) => {
    'worklet';

    if (!success) {
      return;
    }

    const distance = Math.hypot(event.x - startPosition.value.x, event.y - startPosition.value.y);
    const shouldClose = distance < 10;
    const isStateActive = state.value === CONTEXT_MENU_STATE.ACTIVE;

    if (shouldClose && isStateActive) {
      state.value = CONTEXT_MENU_STATE.END;
    }
  });
  const animatedContainerStyle = useAnimatedStyle(() => {
    const topValueAnimation = () => state.value === CONTEXT_MENU_STATE.ACTIVE ? 0 : withDelay(HOLD_ITEM_TRANSFORM_DURATION, withTiming(WINDOW_HEIGHT, {
      duration: 0
    }));

    const opacityValueAnimation = () => withTiming(state.value === CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
      duration: HOLD_ITEM_TRANSFORM_DURATION
    });

    return {
      top: topValueAnimation(),
      opacity: opacityValueAnimation()
    };
  });
  const animatedContainerProps = useAnimatedProps(() => {
    return {
      blurAmount: withTiming(state.value === CONTEXT_MENU_STATE.ACTIVE ? BACKDROP_BLUR_AMOUNT : 0, {
        duration: HOLD_ITEM_TRANSFORM_DURATION
      })
    };
  });
  const animatedInnerContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = theme.value === 'light' ? BACKDROP_LIGHT_BACKGROUND_COLOR : BACKDROP_DARK_BACKGROUND_COLOR;
    return {
      backgroundColor
    };
  }, [theme]);
  return /*#__PURE__*/React.createElement(GestureDetector, {
    gesture: tapGesture
  }, /*#__PURE__*/React.createElement(AnimatedBlurView // @ts-ignore
  , {
    tint: "dark",
    blurType: 'dark',
    animatedProps: animatedContainerProps,
    style: [styles.container, animatedContainerStyle]
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [ABSOLUTE_FILL, animatedInnerContainerStyle]
  })));
};

const Backdrop = /*#__PURE__*/memo(BackdropComponent);
export default Backdrop;
//# sourceMappingURL=Backdrop.js.map