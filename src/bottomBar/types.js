// @flow

export const BOTTOM_BAR_HEIGHT = 60;

export const BOTTOM_BAR_EFFECT_PART_COUNT = 4;

export type BottomBarItemIdType = string | number;

// for `items` props of BottomBar component
export type BottomBarConfigItemType = {
  id: BottomBarItemIdType,
  image: {
    normal: any,
    active: any,
  },
};

// for internal
export type BottomBarItemType = {
  id: BottomBarItemIdType,
  index: number,
  image: {
    normal: any,
    active: any,
  },
  badge: boolean,
};

// for change event
export type BottomBarOnChangeParamsType = {
  id: BottomBarItemIdType, // current id of tab
  prevId: ?BottomBarItemIdType, // previous id of tab
  index: number, // current index of tab
};

// for expose
export type BottomBarExposedMethodsType = {
  setCurrentItemById: (id: BottomBarItemIdType) => mixed,
  showBadge: (id: BottomBarItemIdType) => mixed,
  clearBadge: (id: BottomBarItemIdType) => mixed,
};
