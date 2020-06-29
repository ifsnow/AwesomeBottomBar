// @flow

import React, { useCallback } from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import DebugScreen from './DebugScreen';

import BottomBar from '~/bottomBar';

import { bottomBarItems } from './config';

const App = () => {
  const onChange = useCallback(params => {
    console.log('[DEBUG] BottomBar:onChange', params);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f9" />
      <SafeAreaView style={styles.container}>
        <DebugScreen />

        <BottomBar
          items={bottomBarItems}
          onChange={onChange}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f9',
  },
});

export default App;
