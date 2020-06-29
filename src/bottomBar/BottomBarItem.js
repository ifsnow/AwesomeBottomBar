// @flow

import React, {
  useContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import { BottomBarContext } from './BottomBarContext';
import BottomBarBadge from './BottomBarBadge';

import type { BottomBarItemType } from './types';

type Props = {|
  item: BottomBarItemType,
|};

const BottomBarItem = ({
  item,
}: Props) => {
  const {
    prevItemIndex,
    setPrevItemIndex,
    currentItemIndex,
    setCurrentItemIndex,
  } = useContext(BottomBarContext);

  const animation = useMemo(() => ({
    scale: new Animated.Value(0),
    opacity: new Animated.Value(0),
    rotate: new Animated.Value(1),
  }), []);

  const [isCurrentFocused, setCurrentFocused] = useState(false);

  const iconStyle = useMemo(() => ({
    original: {
      ...styles.icon,
      opacity: animation.opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
    },
    active: {
      ...styles.icon,
      opacity: animation.opacity,
      transform: [
        {
          scale: animation.scale.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [1, 1.18, 1],
            extrapolate: 'clamp',
          }),
        },
        {
          rotate: animation.rotate.interpolate({
            inputRange: [0, 0.5, 1, 1.5, 2],
            outputRange: ['0deg', '-25deg', '0deg', '25deg', '0deg'],
            extrapolate: 'clamp',
          }),
        },
      ],
    },
  }), [animation]);

  useEffect(() => {
    const isFocused = currentItemIndex === item.index;
    if (isCurrentFocused === isFocused) {
      return;
    }

    if (isFocused) { // Newly selected
      setCurrentFocused(true);

      animation.scale.setValue(0);
      animation.opacity.setValue(0);
      animation.rotate.setValue(1);

      Animated.stagger(
        550,
        [
          Animated.parallel([
            Animated.spring(animation.scale, {
              toValue: 1,
              useNativeDriver: true,
              delay: 450,
            }),
            Animated.timing(animation.opacity, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
          ]),
          Animated.spring(animation.rotate, {
            toValue: currentItemIndex > prevItemIndex ? 0 : 2, // When moving to the right
            useNativeDriver: true,
          }),
        ],
      ).start(({ finished }) => {
        finished && setPrevItemIndex(item.index);
      });
    } else { // Deselected
      Animated.timing(animation.opacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(({ finished }) => {
        finished && setCurrentFocused(false);
      });
    }
  }, [animation, isCurrentFocused, currentItemIndex, prevItemIndex, setPrevItemIndex, item]);

  const onPress = useCallback(() => {
    setCurrentItemIndex(item.index);
  }, [setCurrentItemIndex, item]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconWrapper}>
            <Animated.Image
              source={item.image.normal}
              style={iconStyle.original}
            />
            {isCurrentFocused && (
              <Animated.Image
                source={item.image.active}
                style={iconStyle.active}
              />
            )}
          </View>
          {item.badge && <BottomBarBadge />}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  iconWrapper: {
    width: 32,
    height: 32,
  },
  icon: {
    position: 'absolute',
    width: 32,
    height: 32,
  },
});

export default React.memo<Props>(BottomBarItem);
