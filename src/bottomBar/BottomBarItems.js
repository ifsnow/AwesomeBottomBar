// @flow

import React, {
  useContext,
  useMemo,
} from 'react';
import { View } from 'react-native';

import { isIphoneX } from './utils';

import { BottomBarContext } from './BottomBarContext';
import BottomBarItem from './BottomBarItem';
import BottomBarEffect from './BottomBarEffect';

const BottomBarItems = () => {
  const containerStyle = useMemo(() => {
    const extraPadding = isIphoneX() ? 16 : 0;
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 60 + extraPadding,
      paddingBottom: extraPadding,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#474a5219',
      flexDirection: 'row',
      alignItems: 'center',
    };
  }, []);

  const { items } = useContext(BottomBarContext);
  const itemComponents = useMemo(() => items.map(item => (
    <BottomBarItem
      key={item.id}
      item={item}
    />
  )), [items]);

  return (
    <View style={containerStyle}>
      {itemComponents}
      <BottomBarEffect />
    </View>
  );
};

export default React.memo<any>(BottomBarItems);
