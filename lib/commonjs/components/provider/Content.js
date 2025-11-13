"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _hooks = require("../../hooks");

var _constants = require("../../constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Content = ({
  renderContent
}) => {
  const {
    state,
    menuProps
  } = (0, _hooks.useInternal)();
  const [isActive, setIsActive] = (0, _react.useState)(false); // синхронизируем Reanimated state → React state

  (0, _reactNativeReanimated.useAnimatedReaction)(() => state.value, val => {
    (0, _reactNativeReanimated.runOnJS)(setIsActive)(val === _constants.CONTEXT_MENU_STATE.ACTIVE);
  });
  const wrapperStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const anchorPositionVertical = menuProps.value.anchorPosition.split('-')[0];
    const top = anchorPositionVertical === 'top' ? menuProps.value.itemY - 24 : menuProps.value.itemY + menuProps.value.itemHeight + 8;
    const left = menuProps.value.itemX;
    const tY = menuProps.value.transformValue;
    return {
      opacity: state.value === _constants.CONTEXT_MENU_STATE.ACTIVE ? (0, _reactNativeReanimated.withTiming)(1) : (0, _reactNativeReanimated.withTiming)(0),
      top,
      left,
      transform: [{
        translateY: state.value === _constants.CONTEXT_MENU_STATE.ACTIVE ? (0, _reactNativeReanimated.withSpring)(tY, _constants.SPRING_CONFIGURATION) : (0, _reactNativeReanimated.withTiming)(0, {
          duration: _constants.HOLD_ITEM_TRANSFORM_DURATION
        })
      }]
    };
  }, [menuProps]);

  if (!renderContent) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [{
      position: 'absolute',
      left: 0,
      zIndex: 12
    }, wrapperStyles]
  }, isActive && renderContent());
};

var _default = Content;
exports.default = _default;
//# sourceMappingURL=Content.js.map