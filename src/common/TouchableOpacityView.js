import React, { ReactNode } from 'react';
import { TouchableOpacity as TouchableOpacityBase, Platform } from 'react-native';
import { TouchableOpacity as TouchableOpacityGesture } from 'react-native-gesture-handler';
import { TouchableOpacityViewProps } from '../types/common.js';

const TouchableOpacityView = ({
  children,
  isGesture,
  disable,
  ...props
}: any) => {
  const isIos = Platform.OS === 'ios';
  if (isGesture && !isIos) {
    return (
      <TouchableOpacityGesture disabled={disable} activeOpacity={1} {...props}>
        {children}
      </TouchableOpacityGesture>
    );
  } else {
    return (
      <TouchableOpacityBase disabled={disable} activeOpacity={1} {...props}>
        {children}
      </TouchableOpacityBase>
    );
  }
};

export { TouchableOpacityView };
