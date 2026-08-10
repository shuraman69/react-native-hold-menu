"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransformOrigin = exports.menuAnimationAnchor = exports.calculateMenuHeight = exports.MenuItemHeight = void 0;

var _styleGuide = _interopRequireDefault(require("../styleGuide"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MenuItemHeight = () => {
  'worklet';

  return _styleGuide.default.typography.callout.lineHeight * _constants.FONT_SCALE + _styleGuide.default.spacing * 2.5;
};
/**
 * Height the menu needs to lay out its items.
 *
 * When `maxVisibleItems` is set and there are more items than that, the height
 * is capped to exactly that many rows — the menu keeps that size and the
 * remaining items are reached by scrolling. Separators are left out of the
 * capped height on purpose, so the cap always means "N rows tall".
 */


exports.MenuItemHeight = MenuItemHeight;

const calculateMenuHeight = (itemLength, separatorCount, maxVisibleItems) => {
  'worklet';

  const cappedLength = maxVisibleItems && maxVisibleItems > 0 && itemLength > maxVisibleItems ? maxVisibleItems : 0;
  const visibleLength = cappedLength || itemLength;
  const visibleSeparatorCount = cappedLength ? 0 : separatorCount;
  return MenuItemHeight() * visibleLength + (visibleLength - 1) + visibleSeparatorCount * _styleGuide.default.spacing;
};

exports.calculateMenuHeight = calculateMenuHeight;

const menuAnimationAnchor = (anchorPoint, itemWidth, itemLength, itemsWithSeparatorLength, maxVisibleItems) => {
  'worklet';

  const MenuHeight = calculateMenuHeight(itemLength, itemsWithSeparatorLength, maxVisibleItems);
  const splittetAnchorName = anchorPoint.split('-');
  const Center1 = itemWidth;
  const Center2 = 0;
  const TyTop1 = -(MenuHeight / 2);
  const TyTop2 = MenuHeight / 2;
  const TxLeft1 = _constants.MENU_WIDTH / 2 * -1;
  const TxLeft2 = _constants.MENU_WIDTH / 2 * 1;
  return {
    beginningTransformations: {
      translateX: splittetAnchorName[1] === 'right' ? -TxLeft1 : splittetAnchorName[1] === 'left' ? TxLeft1 : Center1,
      translateY: splittetAnchorName[0] === 'top' ? TyTop1 : splittetAnchorName[0] === 'bottom' ? TyTop1 : Center2
    },
    endingTransformations: {
      translateX: splittetAnchorName[1] === 'right' ? -TxLeft2 : splittetAnchorName[1] === 'left' ? TxLeft2 : Center2,
      translateY: splittetAnchorName[0] === 'top' ? TyTop2 : splittetAnchorName[0] === 'bottom' ? -TyTop2 : Center2
    }
  };
};

exports.menuAnimationAnchor = menuAnimationAnchor;

const getTransformOrigin = (posX, itemWidth, windowWidth, bottom) => {
  'worklet';

  const distanceToLeft = Math.round(posX + itemWidth / 2);
  const distanceToRight = Math.round(windowWidth - distanceToLeft);
  let position = bottom ? 'bottom-right' : 'top-right';
  const majority = Math.abs(distanceToLeft - distanceToRight);

  if (majority < _constants.MENU_TRANSFORM_ORIGIN_TOLERENCE) {
    position = bottom ? 'bottom-center' : 'top-center';
  } else if (distanceToLeft < distanceToRight) {
    position = bottom ? 'bottom-left' : 'top-left';
  }

  return position;
};

exports.getTransformOrigin = getTransformOrigin;
//# sourceMappingURL=calculations.js.map