// @flow
import {
  Dimensions,
  Platform,
} from 'react-native';

export function isIphoneX() {
  if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    const {
      width,
      height,
    } = Dimensions.get('window');

    return (height === 812 || width === 812) || (height === 896 || width === 896);
  }

  return false;
}

export function getEffectInterpolationConfig() {
  let counter = 0;
  const inputRange = [],
    outputRange = [];

  const increase = (Math.PI * 2) / 50;

  for (let i = 0; i <= 1; i += 0.02) {
    inputRange.push(i);
    outputRange.push(8 * (Math.sin(counter) / 2 - 0.5));
    counter += increase;
  }

  return {
    inputRange,
    outputRange,
  };
}

const DEVICE_SCALE = Math.min(480, Dimensions.get('window').width) / 360;

export function normalizeFontSize(size: number) {
  return Math.round(DEVICE_SCALE * size);
}
