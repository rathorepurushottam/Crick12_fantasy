import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppSafeAreaView } from '../common/AppSafeAreaView';
import CommonImageBackground from '../common/commonImageBackground';
import { StatusBar } from 'native-base';
import Header from '../common/Header';
import { universalPaddingHorizontal } from '../theme/dimens';
import { KeyBoardAware } from '../common/KeyboardAware';
import { AppText, FORTEEN, POPPINS_MEDIUM, WHITE } from '../common/AppText';
import InputBox from '../common/InputBox';
import { colors } from '../theme/color';
import { fontFamilyPoppins } from '../theme/typography';
import PrimaryButton from '../common/primaryButton';
import { checkUPIDlNumber, toastAlert } from '../helper/utility';
import { useDispatch, useSelector } from 'react-redux'
import { getUpiVerifiy, getUpiVerifiyManual } from '../slices/matchSlice';
import FastImage from 'react-native-fast-image';
import { scanIcon } from '../helper/image';

const VerifyUPI = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [nameHolder, setNameHolder] = useState('');
  const kycDetails = useSelector(state => {
    return state.profile.kycDetails;
  });

  const onSubmit = () => {
    if (!checkUPIDlNumber(name))
      return toastAlert.showToastError('Please enter valid UPI ID');
    const data = {
      upi_number: name,
    };
    console.log(data,"UpiDataaaa")
    dispatch(getUpiVerifiyManual(data))
  };
  useEffect(()=>{
      setName(kycDetails?.upi_details?.upi_number ? kycDetails?.upi_details?.upi_number : '')
  },[kycDetails])

  const check = checkUPIDlNumber(name);
  console.log(check,"checkkk")
  return (
    <AppSafeAreaView style={{backgroundColor:"#111019"}}>
      <StatusBar
        backgroundColor={'#111019'}
        barStyle="light-content"
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      {/* <CommonImageBackground common> */}
        <Header
          commonHeader
          title="Verify UPI ID"
          style={{ padding: universalPaddingHorizontal, marginTop: '10%' }}
        />
        <KeyBoardAware style={styles.bottomContainer}>
          <FastImage source={scanIcon} resizeMode='contain' style={styles.topLogo}/>
          <AppText
            type={FORTEEN}
            weight={POPPINS_MEDIUM}
            color={WHITE}
            style={styles.withdraw}>
            Enter your UPI ID
          </AppText>
          <View style={styles.box}>
            
            <InputBox
              placeholder="Enter your UPI ID"
              value={name}
              placeholderTextColor={'#ccc'}
              labelStyle={[styles.label, { marginTop: 10 }]}
              label="UPI ID*"
              returnKeyType="next"
              onChange={value => setName(value)}
              textInputBox={styles.textInputBox}
              editable={kycDetails?.upi_details?.upi_number ? false : true}
            />
          </View>
        </KeyBoardAware>
        <View
          style={{
            paddingHorizontal: universalPaddingHorizontal,
            marginBottom: 10,
          }}>
          <PrimaryButton
            buttonStyle={styles.button}
            color={check ?   ''  : '#858585'}
            title="SUBMIT"
            onPress={onSubmit}
          />
        </View>
      {/* </CommonImageBackground> */}
    </AppSafeAreaView>
  );
};
const styles = StyleSheet.create({
  bottomContainer: {
    paddingHorizontal: universalPaddingHorizontal,
  },
  withdraw: {
    // color: colors.black,
    marginTop: 10,
  },
  box: {
    borderWidth: 1,
    // borderColor: 'rgba(63, 139, 238, 0.3)',
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#111019',
  },
  label: {
    fontSize: 12,
    color: colors.white,
    marginTop: 0,
    marginBottom: 5,
  },
  textInputBox: {
    fontFamily: fontFamilyPoppins,
    fontSize: 12,
    color:colors.white
  },
  topLogo:{
    width:120,
    height:199,
    alignSelf:"center",
    marginTop:20
  }
});
export default VerifyUPI;
