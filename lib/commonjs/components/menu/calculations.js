"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColor = exports.leftOrRight = void 0;

var _constants = require("../../constants");

var _constants2 = require("./constants");

const SCREEN_EDGE_PADDING = 16;

const leftOrRight = menuProps => {
  'worklet';

  const anchorPositionHorizontal = menuProps.value.anchorPosition.split('-')[1];
  const itemWidth = menuProps.value.itemWidth;
  const itemX = menuProps.value.itemX;
  let leftPosition = 0;
  anchorPositionHorizontal === 'right' ? leftPosition = -_constants.MENU_WIDTH + itemWidth : anchorPositionHorizontal === 'left' ? leftPosition = 0 : leftPosition = -menuProps.value.itemWidth - _constants.MENU_WIDTH / 2 + menuProps.value.itemWidth / 2; // menuAnimationAnchor for a centered anchor leaves an extra translateX of
  // itemWidth once the menu is fully scaled, so screen bounds must be checked
  // against the visual position, not just `left`

  const anchorOffsetX = anchorPositionHorizontal === 'center' ? itemWidth : 0;
  const visualLeft = itemX + leftPosition + anchorOffsetX;

  if (visualLeft + _constants.MENU_WIDTH > _constants.WINDOW_WIDTH - SCREEN_EDGE_PADDING) {
    leftPosition -= visualLeft + _constants.MENU_WIDTH - (_constants.WINDOW_WIDTH - SCREEN_EDGE_PADDING);
  } else if (visualLeft < SCREEN_EDGE_PADDING) {
    leftPosition += SCREEN_EDGE_PADDING - visualLeft;
  }

  return leftPosition;
};

exports.leftOrRight = leftOrRight;

const getColor = (isTitle, isDestructive, themeValue) => {
  'worklet';

  return isTitle ? _constants2.MENU_TITLE_COLOR : isDestructive ? themeValue === 'dark' ? _constants2.MENU_TEXT_DESTRUCTIVE_COLOR_DARK : _constants2.MENU_TEXT_DESTRUCTIVE_COLOR_LIGHT : themeValue === 'dark' ? _constants2.MENU_TEXT_DARK_COLOR : _constants2.MENU_TEXT_LIGHT_COLOR;
};

exports.getColor = getColor;
//# sourceMappingURL=calculations.js.map