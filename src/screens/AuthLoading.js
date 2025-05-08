import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfile} from '../actions/profileAction';
import {AppSafeAreaView} from '../common/AppSafeAreaView';
import {SpinnerSecond} from '../common/SpinnerSecond';
import NavigationService from '../navigation/NavigationService';
import {AUTHSTACK, LOGIN, MYBATTLEOTP, OTP} from '../navigation/routes';
import {USER_TOKEN_KEY} from '../helper/Constants';
import FastImage from 'react-native-fast-image';
import {splashScreen, splashScreen1} from '../helper/image';

const AuthLoading = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN_KEY);
      if (token) {
        dispatch(getUserProfile(true, false));
      } else {
        setTimeout(() => {
          NavigationService.navigate(AUTHSTACK);
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AppSafeAreaView>
      <FastImage
        source={splashScreen1}
        resizeMode="contain"
        style={{flex: 1}}
      />
      <SpinnerSecond loading={isLoading} />
    </AppSafeAreaView>
  );
};

export default AuthLoading;
