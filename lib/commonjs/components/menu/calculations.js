"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColor = exports.leftOrRight = void 0;

var _constants = require("../../constants");

var _constants2 = require("./constants");

const leftOrRight = menuProps => {
  'worklet';

  const anchorPositionHorizontal = menuProps.value.anchorPosition.split('-')[1];
  const itemWidth = menuProps.value.itemWidth;
  const itemX = menuProps.value.itemX;
  let leftPosition = 0;
  anchorPositionHorizontal === 'right' ? leftPosition = -_constants.MENU_WIDTH + itemWidth : anchorPositionHorizontal === 'left' ? leftPosition = 0 : leftPosition = -menuProps.value.itemWidth - _constants.MENU_WIDTH / 2 + menuProps.value.itemWidth / 2;
  const menuRightEdge = itemX + leftPosition + _constants.MENU_WIDTH;

  if (menuRightEdge > _constants.WINDOW_WIDTH) {
    leftPosition -= menuRightEdge - _constants.WINDOW_WIDTH + 16;
  } // Проверка левой границы


  if (itemX + leftPosition < 0) {
    leftPosition = -itemX + 16;
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