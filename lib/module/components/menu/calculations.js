import { MENU_WIDTH, WINDOW_WIDTH } from '../../constants';
import { MENU_TEXT_DARK_COLOR, MENU_TEXT_DESTRUCTIVE_COLOR_DARK, MENU_TEXT_DESTRUCTIVE_COLOR_LIGHT, MENU_TEXT_LIGHT_COLOR, MENU_TITLE_COLOR } from './constants';
export const leftOrRight = menuProps => {
  'worklet';

  const anchorPositionHorizontal = menuProps.value.anchorPosition.split('-')[1];
  const itemWidth = menuProps.value.itemWidth;
  const itemX = menuProps.value.itemX;
  let leftPosition = 0;
  anchorPositionHorizontal === 'right' ? leftPosition = -MENU_WIDTH + itemWidth : anchorPositionHorizontal === 'left' ? leftPosition = 0 : leftPosition = -menuProps.value.itemWidth - MENU_WIDTH / 2 + menuProps.value.itemWidth / 2;
  const menuRightEdge = itemX + leftPosition + MENU_WIDTH;

  if (menuRightEdge > WINDOW_WIDTH) {
    leftPosition -= menuRightEdge - WINDOW_WIDTH + 16;
  } // Проверка левой границы


  if (itemX + leftPosition < 0) {
    leftPosition = -itemX + 16;
  }

  return leftPosition;
};
export const getColor = (isTitle, isDestructive, themeValue) => {
  'worklet';

  return isTitle ? MENU_TITLE_COLOR : isDestructive ? themeValue === 'dark' ? MENU_TEXT_DESTRUCTIVE_COLOR_DARK : MENU_TEXT_DESTRUCTIVE_COLOR_LIGHT : themeValue === 'dark' ? MENU_TEXT_DARK_COLOR : MENU_TEXT_LIGHT_COLOR;
};
//# sourceMappingURL=calculations.js.map