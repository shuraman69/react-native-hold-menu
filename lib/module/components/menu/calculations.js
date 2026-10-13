import { MENU_WIDTH, WINDOW_WIDTH } from '../../constants';
import { MENU_TEXT_DARK_COLOR, MENU_TEXT_DESTRUCTIVE_COLOR_DARK, MENU_TEXT_DESTRUCTIVE_COLOR_LIGHT, MENU_TEXT_LIGHT_COLOR, MENU_TITLE_COLOR } from './constants';
const SCREEN_EDGE_PADDING = 16;
export const leftOrRight = menuProps => {
  'worklet';

  const anchorPositionHorizontal = menuProps.value.anchorPosition.split('-')[1];
  const itemWidth = menuProps.value.itemWidth;
  const itemX = menuProps.value.itemX;
  let leftPosition = 0;
  anchorPositionHorizontal === 'right' ? leftPosition = -MENU_WIDTH + itemWidth : anchorPositionHorizontal === 'left' ? leftPosition = 0 : leftPosition = -menuProps.value.itemWidth - MENU_WIDTH / 2 + menuProps.value.itemWidth / 2; // menuAnimationAnchor for a centered anchor leaves an extra translateX of
  // itemWidth once the menu is fully scaled, so screen bounds must be checked
  // against the visual position, not just `left`

  const anchorOffsetX = anchorPositionHorizontal === 'center' ? itemWidth : 0;
  const visualLeft = itemX + leftPosition + anchorOffsetX;

  if (visualLeft + MENU_WIDTH > WINDOW_WIDTH - SCREEN_EDGE_PADDING) {
    leftPosition -= visualLeft + MENU_WIDTH - (WINDOW_WIDTH - SCREEN_EDGE_PADDING);
  } else if (visualLeft < SCREEN_EDGE_PADDING) {
    leftPosition += SCREEN_EDGE_PADDING - visualLeft;
  }

  return leftPosition;
};
export const getColor = (isTitle, isDestructive, themeValue) => {
  'worklet';

  return isTitle ? MENU_TITLE_COLOR : isDestructive ? themeValue === 'dark' ? MENU_TEXT_DESTRUCTIVE_COLOR_DARK : MENU_TEXT_DESTRUCTIVE_COLOR_LIGHT : themeValue === 'dark' ? MENU_TEXT_DARK_COLOR : MENU_TEXT_LIGHT_COLOR;
};
//# sourceMappingURL=calculations.js.map