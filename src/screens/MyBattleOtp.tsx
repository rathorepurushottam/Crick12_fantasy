import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {AppSafeAreaView} from '../common/AppSafeAreaView';
import {KeyBoardAware} from '../common/KeyboardAware';
import {backLogo, frontLogo, MyBattleIcon, MyBattleScreen, Nlglogo, Nlglogo2} from '../helper/image';
import {StatusBar} from 'native-base';
import {NLCColor, NewColor, colors} from '../theme/color';
import {Logo, universalPaddingHorizontal} from '../theme/dimens';
import {
  AppText,
  BLACKOPACITY,
  BROWNYELLOW,
  ELEVEN,
  FORTEEN,
  LIGHTWHITE,
  NORMAL,
  POPPINS,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  REDTEXT,
  THIRTEEN,
  TWELVE,
  WHITE,
  YellowText,
} from '../common/AppText';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useDispatch} from 'react-redux';
import {otpVerification, resetSignUpOtp} from '../actions/authActions';
import {toastAlert} from '../helper/utility';
import FastImage from 'react-native-fast-image';
import PrimaryButton from '../common/primaryButton';
// import {getHash, startOtpListener} from 'react-native-otp-verify';

const MyBattleOtp = ({route}: any) => {
  const dispatch = useDispatch();
  const {data: Number, id, permissionSave} = route?.params ?? '';
  const [code, setCode] = useState('');
  const [newOtp, setNewOtp] = useState('');
  const [otpFromMethod, setOtpFromMethod] = useState('');
  const [hashFromMethod, setHashFromMethod] = useState([]);
  // React.useEffect(() => {
  //   getHash().then(setHashFromMethod).catch(console.log);
  //   startOtpListener(setOtpFromMethod);
  // }, []);
  // React.useEffect(() => {
  //   if (otpFromMethod && otpFromMethod?.length) {
  //     const newotp = /(\d{6})/g.exec(otpFromMethod)[1];
  //     // setNewOtp(permissionSave ? newotp : '');
  //     // let _data = {
  //     //   mobile_number: mobile_number,
  //     //   otp: newotp,
  //     // };
  //     // dispatch(otpVerification(_data));
  //   }
  // }, [otpFromMethod]);
  const onSubmit = () => {
    console.log('skdalsdalsd');
    if (code.length < 6) {
      toastAlert.showToastError('Please provide a valid OTP');
    } else {
      const data = {
        mobile_number: Number?.mobile_number,
        otp: code,
      };
      dispatch(otpVerification(data));
    }
  };
  const onResend = () => {
    id == 'register';
    dispatch(resetSignUpOtp(id));
  };
  return (
    <AppSafeAreaView
        statusColor={true}
        style={{backgroundColor: NewColor.backGroundDark}}
        light={true}
        hidden={false}
      >
      {/* <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      /> */}
      <View>
      <ImageBackground
        source={backLogo}
        resizeMode="cover"
        style={styles.MyBattleScreen}>
      <FastImage resizeMode="stretch" style={styles.logo} source={frontLogo} />
      </ImageBackground>
        {/* <FastImage source={Nlglogo2} resizeMode="stretch" style={styles.logo} /> */}
      </View>
      <View style={styles.main}>
        <View
          style={{
            paddingHorizontal: universalPaddingHorizontal,
          }}>
          <View>
            <AppText weight={POPPINS_MEDIUM} type={THIRTEEN} color={WHITE}>
              Verify with OTP
            </AppText>
            <AppText
              type={TWELVE}
              weight={POPPINS_MEDIUM}
              color={BLACKOPACITY}>
              OTP sent to your mobile no. +91{' '}
              {JSON.stringify(Number?.mobile_number)?.replace(
                /(?!^.*)[^a-zA-Z\s](?=.{2})/g,
                `X`,
              )}
            </AppText>
            <OTPInputView
              style={{
                width: '100%',
                alignSelf: 'center',
                marginTop: 10,
                height: 50,
              }}
              pinCount={6}
              code={code}
              autoFocusOnLoad={false}
              // placeholderCharacter="-"
              editable={true}
              onCodeChanged={value => setCode(value)}
              onCodeFilled={code => {
                if (code.length == 6) {
                  if (id == 'register') {
                    let _data = {
                      refercode: Number.refercode,
                      mobile_number: Number.mobile_number,
                      otp: code,
                    };
                    dispatch(otpVerification(_data));
                  }
                }
              }}
              placeholderTextColor={NLCColor.black}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
            />
          </View>
          <AppText
            type={TWELVE}
            color={BLACKOPACITY}
            weight={POPPINS_MEDIUM}
            style={{alignSelf: 'flex-end', marginTop: 5, marginRight: 5}}>
            Didn’t receive OTP ?{' '}
            <AppText
              onPress={onResend}
              type={FORTEEN}
              weight={POPPINS_SEMI_BOLD}
              color={YellowText}>
              Resend
            </AppText>
          </AppText>
        </View>
        <PrimaryButton
          onPress={onSubmit}
          title="Verify"
          buttonStyle={styles.button}
        />
      </View>
    </AppSafeAreaView>
  );
};

export default MyBattleOtp;

const styles = StyleSheet.create({
  MyBattleScreen: {
    width: '100%',
    height:278,
    alignItems:"center",
    justifyContent:'flex-end'
  },
  main: {
    paddingHorizontal: universalPaddingHorizontal,
    // flex: 0.1,
    justifyContent: 'center',
    // marginTop:10,
    marginTop:50
  },
  underlineStyleBase: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#1E1C2A',
    color: '#fff',
    borderWidth: 1,
    borderColor:"#1E1C2A"
  },
  underlineStyleHighLighted: {
    // borderColor: '#DDDDDD',
  },
  logo: {
    width: 150,
    height: 208,
  },
  button: {
    marginTop: 40,
  },
});
