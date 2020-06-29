// @flow

import React, {
  useMemo,
  useEffect,
  useContext,
} from 'react';

import {
  Animated,
  useWindowDimensions,
} from 'react-native';

import { getEffectInterpolationConfig } from './utils';

import { BottomBarContext } from './BottomBarContext';

import {
  BOTTOM_BAR_HEIGHT,
  BOTTOM_BAR_EFFECT_PART_COUNT,
} from './types';

const BottomBarEffect = () => {
  const {
    items,
    prevItemIndex,
    currentItemIndex,
  } = useContext(BottomBarContext);

  const animation = useMemo(() => {
    const moves = [];
    const effects = [];
    for (let index = 0; index <= BOTTOM_BAR_EFFECT_PART_COUNT; index++) {
      moves.push(new Animated.Value(0));
      effects.push(new Animated.Value(0));
    }

    return {
      moves,
      effects,
    };
  }, []);

  const { width: windowWidth } = useWindowDimensions();

  const partComponents = useMemo(() => {
    const tabCount = items.length;

    const tabWidth = windowWidth / tabCount;
    const circleSize = 4;

    const baseStyle = {
      position: 'absolute',
      top: BOTTOM_BAR_HEIGHT / 2, // Initial y position
      left: tabWidth / 2, // Initial x position
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2,
      backgroundColor: '#4d4d4f',
    };

    const moveInputRange = [];
    const moveOutputRange = [];
    const effectInterpolationConfig = getEffectInterpolationConfig();

    for (let index = 0; index < tabCount; index++) {
      moveInputRange.push(index);
      moveOutputRange.push(index * tabWidth);
    }

    const parts = [];
    for (let index = 0; index < BOTTOM_BAR_EFFECT_PART_COUNT; index++) {
      const partStyle = {
        ...baseStyle,
        transform: [
          {
            translateX: animation.moves[index].interpolate({
              inputRange: moveInputRange,
              outputRange: moveOutputRange,
            }),
          },
          {
            translateY: animation.effects[index].interpolate(effectInterpolationConfig),
          },
          {
            scale: animation.effects[index].interpolate({
              inputRange: [0, 0.7, 1],
              outputRange: [1, 2.5, 1.8],
            }),
          },
        ],
        opacity: animation.effects[index].interpolate({
          inputRange: [0, 0.5, 0.8, 1],
          outputRange: [0, 1, 0.8, 0],
        }),
      };

      parts.push(<Animated.View key={`part-${index}`} style={partStyle} />);
    }

    return parts;
  }, [items, windowWidth, animation]);

  // When a new tab is selected
  useEffect(() => {
    if (currentItemIndex === prevItemIndex) {
      return;
    }

    const animations = [];

    for (let index = 0; index < BOTTOM_BAR_EFFECT_PART_COUNT; index++) {
      animations.push(
        Animated.parallel([
          Animated.timing(animation.moves[index], {
            toValue: currentItemIndex,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(animation.effects[index], {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      );
    }

    Animated.stagger(150, animations).start(({ finished }) => {
      if (finished) {
        animation.effects.forEach(effect => effect.setValue(0));
      }
    });
  }, [currentItemIndex, prevItemIndex, animation]);

  return (
    <>
      {partComponents}
    </>
  );
};

export default React.memo<any>(BottomBarEffect);
