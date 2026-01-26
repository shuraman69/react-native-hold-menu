import React, { useState } from 'react';
import Animated, { runOnJS, useAnimatedReaction, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useInternal } from '../../hooks';
import { CONTEXT_MENU_STATE, HOLD_ITEM_TRANSFORM_DURATION, SPRING_CONFIGURATION } from '../../constants';

const Content = ({
  renderContent
}) => {
  const {
    state,
    menuProps
  } = useInternal();
  const [isActive, setIsActive] = useState(false); // синхронизируем Reanimated state → React state

  useAnimatedReaction(() => state.value, val => {
    runOnJS(setIsActive)(val === CONTEXT_MENU_STATE.ACTIVE);
  });
  const wrapperStyles = useAnimatedStyle(() => {
    const anchorPositionVertical = menuProps.value.anchorPosition.split('-')[0];
    const top = anchorPositionVertical === 'top' ? menuProps.value.itemY - 24 : menuProps.value.itemY + menuProps.value.itemHeight + 8;
    const left = menuProps.value.itemX;
    const tY = menuProps.value.transformValue;
    return {
      opacity: state.value === CONTEXT_MENU_STATE.ACTIVE ? withTiming(1) : withTiming(0),
      top,
      left,
      transform: [{
        translateY: state.value === CONTEXT_MENU_STATE.ACTIVE ? withSpring(tY, SPRING_CONFIGURATION) : withTiming(0, {
          duration: HOLD_ITEM_TRANSFORM_DURATION
        })
      }]
    };
  }, [menuProps]);

  if (!renderContent) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [{
      position: 'absolute',
      left: 0,
      zIndex: 12
    }, wrapperStyles]
  }, isActive && renderContent());
};

export default Content;
//# sourceMappingURL=Content.js.map