"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _calculations = require("../../utils/calculations");

var _MenuItems = _interopRequireDefault(require("./MenuItems"));

var _constants = require("../../constants");

var _styles = _interopRequireDefault(require("./styles"));

var _hooks = require("../../hooks");

var _validations = require("../../utils/validations");

var _calculations2 = require("./calculations");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// gesture-handler's ScrollView is wrapped in a NativeViewGestureHandler, so on
// Android the RNGH orchestrator hands the drag to it instead of the backdrop's
// full-screen TapGestureHandler. With the plain react-native ScrollView the
// menu never starts scrolling on Android.
const AnimatedScrollView = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeGestureHandler.ScrollView);

const MenuListComponent = () => {
  const {
    state,
    theme,
    menuProps
  } = (0, _hooks.useInternal)();

  const [itemList, setItemList] = _react.default.useState([]);

  const menuHeight = (0, _reactNativeReanimated.useDerivedValue)(() => {
    const itemsWithSeparator = menuProps.value.items.filter(item => item.withSeparator);
    return (0, _calculations.calculateMenuHeight)(menuProps.value.items.length, itemsWithSeparator.length, menuProps.value.maxVisibleItems);
  }, [menuProps]);
  const prevList = (0, _reactNativeReanimated.useSharedValue)([]);
  const messageStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const itemsWithSeparator = menuProps.value.items.filter(item => item.withSeparator);
    const translate = (0, _calculations.menuAnimationAnchor)(menuProps.value.anchorPosition, menuProps.value.itemWidth, menuProps.value.items.length, itemsWithSeparator.length, menuProps.value.maxVisibleItems);

    const _leftPosition = (0, _calculations2.leftOrRight)(menuProps);

    const menuScaleAnimation = () => state.value === _constants.CONTEXT_MENU_STATE.ACTIVE ? (0, _reactNativeReanimated.withSpring)(1, _constants.SPRING_CONFIGURATION_MENU) : (0, _reactNativeReanimated.withTiming)(0, {
      duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
    });

    const opacityAnimation = () => (0, _reactNativeReanimated.withTiming)(state.value === _constants.CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
      duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
    });

    return {
      left: _leftPosition,
      height: menuHeight.value,
      opacity: opacityAnimation(),
      transform: [{
        translateX: translate.beginningTransformations.translateX
      }, {
        translateY: translate.beginningTransformations.translateY
      }, {
        scale: menuScaleAnimation()
      }, {
        translateX: translate.endingTransformations.translateX
      }, {
        translateY: translate.endingTransformations.translateY
      }]
    };
  });
  const animatedInnerContainerStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const color = theme.value === 'light' ? '#fff' : '#1A1A1A';
    return {
      backgroundColor: color
    };
  }, [theme]);

  const setter = items => {
    setItemList(items);
    prevList.value = items;
  };

  (0, _reactNativeReanimated.useAnimatedReaction)(() => menuProps.value.items, _items => {
    if (!(0, _validations.deepEqual)(_items, prevList.value)) {
      (0, _reactNativeReanimated.runOnJS)(setter)(_items);
    }
  }, [menuProps]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [_styles.default.menuContainer, messageStyles]
  }, /*#__PURE__*/_react.default.createElement(AnimatedScrollView, {
    style: [_reactNative.StyleSheet.absoluteFillObject, animatedInnerContainerStyle],
    contentContainerStyle: _styles.default.menuInnerContainer // The menu is only as tall as `maxVisibleItems` allows, so anything
    // past that is reached by scrolling. Shorter lists fit the container
    // and stay put — hence no idle bounce.
    ,
    alwaysBounceVertical: false,
    nestedScrollEnabled: true // The menu floats in a portal, so iOS must not fold navigation bar
    // insets into its content offset.
    ,
    contentInsetAdjustmentBehavior: 'never'
  }, /*#__PURE__*/_react.default.createElement(_MenuItems.default, {
    items: itemList
  })));
};

const MenuList = /*#__PURE__*/_react.default.memo(MenuListComponent);

var _default = MenuList;
exports.default = _default;
//# sourceMappingURL=MenuList.js.map