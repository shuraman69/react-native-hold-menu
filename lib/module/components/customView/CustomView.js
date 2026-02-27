import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { runOnJS, useAnimatedReaction, useAnimatedStyle, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { useInternal } from '../../hooks';
import { HOLD_ITEM_TRANSFORM_DURATION, CONTEXT_MENU_STATE, SPRING_CONFIGURATION, SPRING_CONFIGURATION_MENU, WINDOW_WIDTH } from '../../constants';

const CustomViewComponent = () => {
  const {
    state,
    menuProps,
    customViewRef
  } = useInternal();
  const [renderFn, setRenderFn] = useState(null);
  const [customViewHeight, setCustomViewHeight] = useState(0);
  const [customViewWidth, setCustomViewWidth] = useState(0);
  const closeMenu = useCallback(() => {
    state.value = CONTEXT_MENU_STATE.END;
  }, [state]);
  const onLayout = useCallback(event => {
    const {
      height,
      width
    } = event.nativeEvent.layout;
    setCustomViewHeight(height);
    setCustomViewWidth(width);
  }, []);
  const clearRenderFn = useCallback(() => {
    setRenderFn(null);
    setCustomViewHeight(0);
    setCustomViewWidth(0);
  }, []);
  const updateRenderFn = useCallback(hasCustomView => {
    if (hasCustomView && customViewRef.current) {
      setRenderFn(() => customViewRef.current);
    } else {
      setTimeout(clearRenderFn, HOLD_ITEM_TRANSFORM_DURATION);
    }
  }, [customViewRef, clearRenderFn]);
  useAnimatedReaction(() => ({
    currentState: state.value,
    hasCustomView: menuProps.value.hasCustomView
  }), ({
    currentState,
    hasCustomView
  }) => {
    if (currentState === CONTEXT_MENU_STATE.ACTIVE && hasCustomView) {
      runOnJS(updateRenderFn)(true);
    } else if (currentState === CONTEXT_MENU_STATE.END) {
      runOnJS(updateRenderFn)(false);
    }
  }, [state, menuProps]);
  const wrapperStyles = useAnimatedStyle(() => {
    const anchorPositionVertical = menuProps.value.anchorPosition.split('-')[0];
    const isAbove = anchorPositionVertical === 'top'; // Fixed anchor point: top of the item

    const top = menuProps.value.itemY;
    const SCREEN_PADDING = 16;
    const MAX_WIDTH = WINDOW_WIDTH - SCREEN_PADDING * 2; // Start at item's left edge

    let left = menuProps.value.itemX; // If the view overflows the right edge, shift left

    if (customViewWidth > 0 && left + customViewWidth > WINDOW_WIDTH - SCREEN_PADDING) {
      left = Math.max(SCREEN_PADDING, WINDOW_WIDTH - customViewWidth - SCREEN_PADDING);
    }

    if (left < SCREEN_PADDING) {
      left = SCREEN_PADDING;
    }

    const tY = menuProps.value.transformValue; // Positional offset via translateY:
    // above item: shift up by customViewHeight + gap
    // below item: shift down by itemHeight + gap

    const positionOffsetY = isAbove ? -(customViewHeight + 8) : menuProps.value.itemHeight + 8;
    const scaleAnimation = state.value === CONTEXT_MENU_STATE.ACTIVE ? withDelay(150, withSpring(1, SPRING_CONFIGURATION_MENU)) : withTiming(0, {
      duration: HOLD_ITEM_TRANSFORM_DURATION
    });
    const opacityAnimation = withDelay(150, withTiming(state.value === CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
      duration: HOLD_ITEM_TRANSFORM_DURATION
    })); // Scale anchor: scale from the edge closest to the item

    const scaleAnchorOffset = isAbove ? customViewHeight / 2 : -(customViewHeight / 2);
    return {
      top,
      left,
      maxWidth: MAX_WIDTH,
      opacity: opacityAnimation,
      transform: [// 1. Transform value (screen boundary compensation)
      {
        translateY: state.value === CONTEXT_MENU_STATE.ACTIVE ? withSpring(tY, SPRING_CONFIGURATION) : withTiming(0, {
          duration: HOLD_ITEM_TRANSFORM_DURATION
        })
      }, // 2. Position offset (animated when customViewHeight changes)
      {
        translateY: withSpring(positionOffsetY, SPRING_CONFIGURATION_MENU)
      }, // 3. Scale anchor: move to edge -> scale -> move back
      {
        translateY: scaleAnchorOffset
      }, {
        scale: scaleAnimation
      }, {
        translateY: -scaleAnchorOffset
      }]
    };
  }, [menuProps, customViewHeight, customViewWidth]);
  if (!renderFn) return null;
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.customViewWrapper, wrapperStyles]
  }, /*#__PURE__*/React.createElement(Animated.View, {
    onLayout: onLayout
  }, renderFn({
    closeMenu
  })));
};

const styles = StyleSheet.create({
  customViewWrapper: {
    position: 'absolute',
    zIndex: 20
  }
});
const CustomView = /*#__PURE__*/React.memo(CustomViewComponent);
export default CustomView;
//# sourceMappingURL=CustomView.js.map