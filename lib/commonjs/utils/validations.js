"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepEqual = deepEqual;

/**
 * Compares two menu items field by field.
 *
 * Values — including `onPress` handlers — are compared by reference only.
 * Comparing functions by `toString()` used to make distinct closures with
 * identical source text look equal, so two different `HoldItem`s rendering
 * items like `{text: 'All time', onPress: () => onChange(type)}` were treated
 * as the same list. The shared menu then kept the handlers of whichever item
 * opened first and fired them for every subsequent one.
 */
function fieldAreSame(obj1, obj2) {
  'worklet';

  if (!obj1 || !obj2) return false;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  return keys1.every(key => {
    // @ts-ignore
    return obj1[key] === obj2[key];
  });
}

function deepEqual(array1, array2) {
  'worklet';

  const areArrays = Array.isArray(array1) && Array.isArray(array2);
  const areSameLength = areArrays && array2 && array1.length === array2.length;

  if (areArrays && areSameLength && array2) {
    return array1.every((menuItem, index) => {
      const obj1 = menuItem;
      const obj2 = array2[index];
      return fieldAreSame(obj1, obj2);
    });
  }

  return false;
}
//# sourceMappingURL=validations.js.map