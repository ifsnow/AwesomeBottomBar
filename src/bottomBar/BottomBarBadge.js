/* @flow */

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import {
  Animated,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';

import { normalizeFontSize } from './utils';

const BottomBarBadge = () => {
  const [hasVisibleText, setVisibleText] = useState(true);

  const animation = useMemo(() => new Animated.Value(0), []);

  const containerStyle = useMemo(() => [
    styles.container,
    {
      transform: [
        {
          scale: animation.interpolate({
            inputRange: [0, 0.5, 1, 2],
            outputRange: [0.01, 1.2, 1, 0.5],
            extrapolate: 'clamp',
          }),
        },
        {
          translateX: animation.interpolate({
            inputRange: [1, 1.4, 2],
            outputRange: [0, 0, 6],
            extrapolate: 'clamp',
          }),
        },
        {
          translateY: animation.interpolate({
            inputRange: [1, 1.4, 2],
            outputRange: [0, 0, -6],
            extrapolate: 'clamp',
          }),
        },
      ],
    },
  ], [animation]);

  const startAnimation = useCallback(() => {
    animation.setValue(0);

    animation.addListener(callback => {
      if (callback.value > 1.5) {
        animation.removeAllListeners();
        setVisibleText(false);
      }
    });

    Animated.sequence([
      Animated.spring(animation, {
        toValue: 1,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.spring(animation, {
        toValue: 2,
        delay: 2500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      animation.removeAllListeners();
      setVisibleText(false);
    });
  }, [animation]);

  useEffect(() => {
    startAnimation();
    return () => {
      setVisibleText(true);
    };
  }, [startAnimation]);

  return (
    <Animated.View style={containerStyle}>
      {hasVisibleText && <Text style={styles.badge}>N</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff008d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    fontSize: normalizeFontSize(8),
    lineHeight: normalizeFontSize(10),
    fontWeight: 'bold',
    color: '#fff',
    ...Platform.select({
      ios: {
        marginLeft: 1,
      },
    }),
  },
});

export default React.memo<any>(BottomBarBadge);
