// @flow

import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';

import type {
  BottomBarConfigItemType,
  BottomBarItemType,
  BottomBarItemIdType,
  BottomBarOnChangeParamsType,
  BottomBarExposedMethodsType,
} from './types';

type ContextType = {
  items: BottomBarItemType[],
  currentItemIndex: number,
  setCurrentItemIndex: (index: number) => mixed,
  prevItemIndex: number,
  setPrevItemIndex: (index: number) => mixed,
  setCurrentItemById: (id: BottomBarItemIdType) => mixed,
  showBadge: (id: BottomBarItemIdType) => mixed,
  clearBadge: (id: BottomBarItemIdType) => mixed,
};

const BottomBarContext = React.createContext<ContextType>({});

type ProviderProps = {|
  items: BottomBarConfigItemType[],
  onChange?: (params: BottomBarOnChangeParamsType) => mixed,
  onInit: (methods: BottomBarExposedMethodsType) => mixed,
  children: any,
|};

const BottomBarProvider = ({
  items: providerItems,
  onChange,
  onInit,
  children,
}: ProviderProps) => {
  const [items, setItems] = useState(() => providerItems.map((item, index) => ({
    ...item,
    index,
    badge: false,
  })));

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [prevItemIndex, setPrevItemIndex] = useState(0);

  // functions for badge
  const showBadge = useCallback((id: BottomBarItemIdType) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          badge: true,
        };
      } else {
        return item;
      }
    });

    setItems(newItems);
  }, [items]);

  const clearBadge = useCallback((id: BottomBarItemIdType) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          badge: false,
        };
      } else {
        return item;
      }
    });

    setItems(newItems);
  }, [items]);

  // Pass `setCurrentItemById` function outside
  const setCurrentItemById = useCallback((id: BottomBarItemIdType) => {
    const foundItem = items.find(item => item.id === id);

    if (foundItem) {
      setCurrentItemIndex(foundItem.index);
    }
  }, [items]);

  useEffect(() => {
    onInit && onInit({
      setCurrentItemById,
      showBadge,
      clearBadge,
    });
  }, [onInit, setCurrentItemById, showBadge, clearBadge]);

  // When a new tab is selected
  useEffect(() => {
    if (onChange && currentItemIndex !== prevItemIndex) {
      const currentItem = items[currentItemIndex];
      const params = {
        id: currentItem.id,
        prevId: items[prevItemIndex].id,
        index: currentItemIndex,
      };

      onChange(params);

      if (currentItem.badge) {
        clearBadge(currentItem.id);
      }
    }
  }, [items, currentItemIndex, prevItemIndex, onChange, clearBadge]);

  const value = {
    items,
    currentItemIndex,
    setCurrentItemIndex,
    prevItemIndex,
    setPrevItemIndex,
    setCurrentItemById,
    showBadge,
    clearBadge,
  };

  return (
    <BottomBarContext.Provider value={value}>
      {children}
    </BottomBarContext.Provider>
  );
};

export {
  BottomBarContext,
  BottomBarProvider,
};
