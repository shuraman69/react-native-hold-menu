import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { calculateMenuHeight, menuAnimationAnchor } from '../../utils/calculations';
import MenuItems from './MenuItems';
import { SPRING_CONFIGURATION_MENU, HOLD_ITEM_TRANSFORM_DURATION, CONTEXT_MENU_STATE } from '../../constants';
import styles from './styles';
import { useInternal } from '../../hooks';
import { deepEqual } from '../../utils/validations';
import { leftOrRight } from './calculations'; // gesture-handler's ScrollView is wrapped in a NativeViewGestureHandler, so on
// Android the RNGH orchestrator hands the drag to it instead of the backdrop's
// full-screen TapGestureHandler. With the plain react-native ScrollView the
// menu never starts scrolling on Android.

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const MenuListComponent = () => {
  const {
    state,
    theme,
    menuProps
  } = useInternal();
  const [itemList, setItemList] = React.useState([]);
  const menuHeight = useDerivedValue(() => {
    const itemsWithSeparator = menuProps.value.items.filter(item => item.withSeparator);
    return calculateMenuHeight(menuProps.value.items.length, itemsWithSeparator.length, menuProps.value.maxVisibleItems);
  }, [menuProps]);
  const prevList = useSharedValue([]);
  const messageStyles = useAnimatedStyle(() => {
    const itemsWithSeparator = menuProps.value.items.filter(item => item.withSeparator);
    const translate = menuAnimationAnchor(menuProps.value.anchorPosition, menuProps.value.itemWidth, menuProps.value.items.length, itemsWithSeparator.length, menuProps.value.maxVisibleItems);

    const _leftPosition = leftOrRight(menuProps);

    const menuScaleAnimation = () => state.value === CONTEXT_MENU_STATE.ACTIVE ? withSpring(1, SPRING_CONFIGURATION_MENU) : withTiming(0, {
      duration: HOLD_ITEM_TRANSFORM_DURATION
    });

    const opacityAnimation = () => withTiming(state.value === CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
      duration: HOLD_ITEM_TRANSFORM_DURATION
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
  const animatedInnerContainerStyle = useAnimatedStyle(() => {
    const color = theme.value === 'light' ? '#fff' : '#1A1A1A';
    return {
      backgroundColor: color
    };
  }, [theme]);

  const setter = items => {
    setItemList(items);
    prevList.value = items;
  };

  useAnimatedReaction(() => menuProps.value.items, _items => {
    if (!deepEqual(_items, prevList.value)) {
      runOnJS(setter)(_items);
    }
  }, [menuProps]);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.menuContainer, messageStyles]
  }, /*#__PURE__*/React.createElement(AnimatedScrollView, {
    style: [StyleSheet.absoluteFillObject, animatedInnerContainerStyle],
    contentContainerStyle: styles.menuInnerContainer // The menu is only as tall as `maxVisibleItems` allows, so anything
    // past that is reached by scrolling. Shorter lists fit the container
    // and stay put — hence no idle bounce.
    ,
    alwaysBounceVertical: false,
    nestedScrollEnabled: true // The menu floats in a portal, so iOS must not fold navigation bar
    // insets into its content offset.
    ,
    contentInsetAdjustmentBehavior: 'never'
  }, /*#__PURE__*/React.createElement(MenuItems, {
    items: itemList
  })));
};

const MenuList = /*#__PURE__*/React.memo(MenuListComponent);
export default MenuList;
//# sourceMappingURL=MenuList.js.map