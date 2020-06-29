// @flow

import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';

import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

import { BottomBarProvider } from './BottomBarContext';
import BottomBarItems from './BottomBarItems';

import type {
  BottomBarConfigItemType,
  BottomBarOnChangeParamsType,
  BottomBarItemIdType,
  BottomBarExposedMethodsType,
} from './types';

type Props = {|
  items: BottomBarConfigItemType[],
  onChange?: (params: BottomBarOnChangeParamsType) => mixed,
|};

const bottomBarEventEmitter = new EventEmitter();

let exposedMethods: ?BottomBarExposedMethodsType;

// ============================================================================
// Main Component
// ============================================================================
const BottomBar = ({
  items,
  onChange,
}: Props) => {
  const onChangeCallback = useCallback((params: BottomBarOnChangeParamsType) => {
    onChange && onChange(params);
    bottomBarEventEmitter.emit('CHANGE', params);
  }, [onChange]);

  const onInitCallback = useCallback((_exposedMethods: ?BottomBarExposedMethodsType) => {
    exposedMethods = _exposedMethods;

    bottomBarEventEmitter.emit('CHANGE', {
      id: items[0]?.id,
      index: 0,
      prevId: null,
    });
  }, [items]);

  useEffect(() => () => {
    exposedMethods = null;
    bottomBarEventEmitter.removeAllListeners();
  }, []);

  return (
    <BottomBarProvider
      items={items}
      onChange={onChangeCallback}
      onInit={onInitCallback}
    >
      <BottomBarItems />
    </BottomBarProvider>
  );
};

export default React.memo<Props>(BottomBar);

// ============================================================================
// useBottomBarState: Returns a current state
// ============================================================================
export function useBottomBarState() {
  const [params, setParams] = useState();

  useEffect(() => {
    function handleChangeEvent(changeParams: BottomBarOnChangeParamsType) {
      setParams(changeParams);
    }

    bottomBarEventEmitter.addListener('CHANGE', handleChangeEvent);

    return () => {
      bottomBarEventEmitter.removeAllListeners();
    };
  }, []);

  return params;
}

// ============================================================================
// changeBottomBarById: Changes tab with the specified id
// ============================================================================
export function changeBottomBarById(id: BottomBarItemIdType) {
  if (exposedMethods) {
    exposedMethods.setCurrentItemById(id);
  }
}

// ============================================================================
// showBottomBarBadgeById: Shows a badge on tab with the specified id
// ============================================================================
export function showBottomBarBadgeById(id: BottomBarItemIdType) {
  if (exposedMethods) {
    exposedMethods.showBadge(id);
  }
}

// ============================================================================
// clearBottomBarBadgeById: Clears a badge of tab with the specified id
// ============================================================================
export function clearBottomBarBadgeById(id: BottomBarItemIdType) {
  if (exposedMethods) {
    exposedMethods.clearBadge(id);
  }
}
