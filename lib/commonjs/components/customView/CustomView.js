"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _hooks = require("../../hooks");

var _constants = require("../../constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const CustomViewComponent = () => {
  const {
    state,
    menuProps,
    customViewRef,
    safeAreaInsets
  } = (0, _hooks.useInternal)();
  const [renderFn, setRenderFn] = (0, _react.useState)(null);
  const [customViewHeight, setCustomViewHeight] = (0, _react.useState)(0);
  const [customViewWidth, setCustomViewWidth] = (0, _react.useState)(0);
  const closeMenu = (0, _react.useCallback)(() => {
    state.value = _constants.CONTEXT_MENU_STATE.END;
  }, [state]);
  const onLayout = (0, _react.useCallback)(event => {
    const {
      height,
      width
    } = event.nativeEvent.layout;
    setCustomViewHeight(height);
    setCustomViewWidth(width);
  }, []);
  const clearRenderFn = (0, _react.useCallback)(() => {
    setRenderFn(null);
    setCustomViewHeight(0);
    setCustomViewWidth(0);
  }, []);
  const updateRenderFn = (0, _react.useCallback)(hasCustomView => {
    if (hasCustomView && customViewRef.current) {
      setRenderFn(() => customViewRef.current);
    } else {
      setTimeout(clearRenderFn, _constants.HOLD_ITEM_TRANSFORM_DURATION);
    }
  }, [customViewRef, clearRenderFn]);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => ({
    currentState: state.value,
    hasCustomView: menuProps.value.hasCustomView
  }), ({
    currentState,
    hasCustomView
  }) => {
    if (currentState === _constants.CONTEXT_MENU_STATE.ACTIVE && hasCustomView) {
      (0, _reactNativeReanimated.runOnJS)(updateRenderFn)(true);
    } else if (currentState === _constants.CONTEXT_MENU_STATE.END) {
      (0, _reactNativeReanimated.runOnJS)(updateRenderFn)(false);
    }
  }, [state, menuProps]);
  const wrapperStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const anchorPositionVertical = menuProps.value.anchorPosition.split('-')[0];
    const isAbove = anchorPositionVertical === 'top';
    const isTallItem = menuProps.value.isTallItem;
    const SCREEN_PADDING = 16;
    const MAX_WIDTH = _constants.WINDOW_WIDTH - SCREEN_PADDING * 2; // For tall items: fixed position at top-left with safeAreaInsets.top * 3

    if (isTallItem) {
      const topOffset = ((safeAreaInsets === null || safeAreaInsets === void 0 ? void 0 : safeAreaInsets.top) || 0) * 3;
      const scaleAnimation = state.value === _constants.CONTEXT_MENU_STATE.ACTIVE ? (0, _reactNativeReanimated.withDelay)(150, (0, _reactNativeReanimated.withSpring)(1, _constants.SPRING_CONFIGURATION_MENU)) : (0, _reactNativeReanimated.withTiming)(0, {
        duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
      });
      const opacityAnimation = (0, _reactNativeReanimated.withDelay)(150, (0, _reactNativeReanimated.withTiming)(state.value === _constants.CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
        duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
      }));
      return {
        top: topOffset,
        left: SCREEN_PADDING,
        maxWidth: MAX_WIDTH,
        opacity: opacityAnimation,
        transform: [{
          scale: scaleAnimation
        }]
      };
    } // Fixed anchor point: top of the item


    const top = menuProps.value.itemY; // Start at item's left edge

    let left = menuProps.value.itemX; // If the view overflows the right edge, shift left

    if (customViewWidth > 0 && left + customViewWidth > _constants.WINDOW_WIDTH - SCREEN_PADDING) {
      left = Math.max(SCREEN_PADDING, _constants.WINDOW_WIDTH - customViewWidth - SCREEN_PADDING);
    }

    if (left < SCREEN_PADDING) {
      left = SCREEN_PADDING;
    }

    const tY = menuProps.value.transformValue; // Positional offset via translateY:
    // above item: shift up by customViewHeight + gap
    // below item: shift down by itemHeight + gap

    const positionOffsetY = isAbove ? -(customViewHeight + 8) : menuProps.value.itemHeight + 8;
    const scaleAnimation = state.value === _constants.CONTEXT_MENU_STATE.ACTIVE ? (0, _reactNativeReanimated.withDelay)(150, (0, _reactNativeReanimated.withSpring)(1, _constants.SPRING_CONFIGURATION_MENU)) : (0, _reactNativeReanimated.withTiming)(0, {
      duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
    });
    const opacityAnimation = (0, _reactNativeReanimated.withDelay)(150, (0, _reactNativeReanimated.withTiming)(state.value === _constants.CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
      duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
    })); // Scale anchor: scale from the edge closest to the item

    const scaleAnchorOffset = isAbove ? customViewHeight / 2 : -(customViewHeight / 2);
    return {
      top,
      left,
      maxWidth: MAX_WIDTH,
      opacity: opacityAnimation,
      transform: [// 1. Transform value (screen boundary compensation)
      {
        translateY: state.value === _constants.CONTEXT_MENU_STATE.ACTIVE ? (0, _reactNativeReanimated.withSpring)(tY, _constants.SPRING_CONFIGURATION) : (0, _reactNativeReanimated.withTiming)(0, {
          duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
        })
      }, // 2. Position offset (animated when customViewHeight changes)
      {
        translateY: (0, _reactNativeReanimated.withSpring)(positionOffsetY, _constants.SPRING_CONFIGURATION_MENU)
      }, // 3. Scale anchor: move to edge -> scale -> move back
      {
        translateY: scaleAnchorOffset
      }, {
        scale: scaleAnimation
      }, {
        translateY: -scaleAnchorOffset
      }]
    };
  }, [menuProps, customViewHeight, customViewWidth, safeAreaInsets]);
  if (!renderFn) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.customViewWrapper, wrapperStyles]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    onLayout: onLayout
  }, renderFn({
    closeMenu
  })));
};

const styles = _reactNative.StyleSheet.create({
  customViewWrapper: {
    position: 'absolute',
    zIndex: 20
  }
});

const CustomView = /*#__PURE__*/_react.default.memo(CustomViewComponent);

var _default = CustomView;
exports.default = _default;
//# sourceMappingURL=CustomView.js.map