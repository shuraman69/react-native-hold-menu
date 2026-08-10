export declare const MenuItemHeight: () => number;
/**
 * Height the menu needs to lay out its items.
 *
 * When `maxVisibleItems` is set and there are more items than that, the height
 * is capped to exactly that many rows — the menu keeps that size and the
 * remaining items are reached by scrolling. Separators are left out of the
 * capped height on purpose, so the cap always means "N rows tall".
 */
export declare const calculateMenuHeight: (itemLength: number, separatorCount: number, maxVisibleItems?: number | undefined) => number;
export declare type TransformOriginAnchorPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
export declare const menuAnimationAnchor: (anchorPoint: TransformOriginAnchorPosition, itemWidth: number, itemLength: number, itemsWithSeparatorLength: number, maxVisibleItems?: number | undefined) => {
    beginningTransformations: {
        translateX: number;
        translateY: number;
    };
    endingTransformations: {
        translateX: number;
        translateY: number;
    };
};
export declare const getTransformOrigin: (posX: number, itemWidth: number, windowWidth: number, bottom?: boolean | undefined) => TransformOriginAnchorPosition;
