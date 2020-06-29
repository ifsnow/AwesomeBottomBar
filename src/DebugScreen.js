// @flow

import React, {
  useCallback,
  useEffect,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  useBottomBarState,
  changeBottomBarById,
  showBottomBarBadgeById,
  clearBottomBarBadgeById,
} from '~/bottomBar';

import { BOTTOM_BAR_ITEM_ID } from '~/types';
import type { BottomBarItemIdType } from '~/bottomBar/types';

const DebugScreen = () => {
  const state = useBottomBarState();

  const changeTab = useCallback((id: BottomBarItemIdType) => () => {
    changeBottomBarById(id);
  }, []);

  const showBadge = useCallback(() => {
    showBottomBarBadgeById(BOTTOM_BAR_ITEM_ID.LIKE);
  }, []);

  const clearBadge = useCallback(() => {
    clearBottomBarBadgeById(BOTTOM_BAR_ITEM_ID.LIKE);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      showBottomBarBadgeById(BOTTOM_BAR_ITEM_ID.LIKE);
    }, 1000);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      bounces
      pinchGestureEnabled={false}
      automaticallyAdjustContentInsets={false}
      directionalLockEnabled
      showsVerticalScrollIndicator
    >
      <View>
        <Text style={styles.section}>State</Text>
        <Text style={styles.value}>- current id: {state?.id}</Text>
        <Text style={styles.value}>- current index: {state?.index}</Text>
        <Text style={styles.value}>- previous id: {state?.prevId}</Text>
      </View>

      <View>
        <Text style={styles.section}>Methods</Text>
        <TouchableOpacity style={styles.button} onPress={changeTab(BOTTOM_BAR_ITEM_ID.HOME)}>
          <Text style={styles.value}>Go to Tab #1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={changeTab(BOTTOM_BAR_ITEM_ID.SEARCH)}>
          <Text style={styles.value}>Go to Tab #2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={changeTab(BOTTOM_BAR_ITEM_ID.POST)}>
          <Text style={styles.value}>Go to Tab #3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={changeTab(BOTTOM_BAR_ITEM_ID.LIKE)}>
          <Text style={styles.value}>Go to Tab #4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={changeTab(BOTTOM_BAR_ITEM_ID.PROFILE)}>
          <Text style={styles.value}>Go to Tab #5</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showBadge}>
          <Text style={styles.value}>Show Badge on Tab #4</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={clearBadge}>
          <Text style={styles.value}>Clear Badge of Tab #4</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  section: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#222',
    backgroundColor: '#ddd',
    alignSelf: 'baseline',
    padding: 4,
    marginBottom: 10,
    marginTop: 20,
  },
  value: {
    fontSize: 19,
    color: '#444',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'baseline',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default DebugScreen;
