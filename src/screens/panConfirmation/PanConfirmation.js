import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppSafeAreaView } from '../../common/AppSafeAreaView'
import CommonImageBackground from '../../common/commonImageBackground'
import Header from '../../common/Header'
import { universalPaddingHorizontal } from '../../theme/dimens'
import { colors } from '../../theme/color'
import { AppText, FORTEEN, POPPINS_MEDIUM, THIRTEEN, THIRTEENTH } from '../../common/AppText'
import { TouchableOpacityView } from '../../common/TouchableOpacityView'
import InputBox from '../../common/InputBox'
import { useSelector } from 'react-redux'
import NavigationService from '../../navigation/NavigationService'
import MyBalance from '../MyBalance'
import { KYC_SCREEN, MY_BALANCE } from '../../navigation/routes'
import PrimaryButton from '../../common/primaryButton'
import { toastAlert } from '../../helper/utility'

const PanConfirmation = () => {
  const kycDetails = useSelector(state => {
    return state.profile.kycDetails;
  });
const [name,setName] = useState('');
const [PanNo,setPanNo] = useState('');


useEffect(()=>{
    setName(kycDetails?.pan_details?.NameOnPan);
    setPanNo(kycDetails?.pan_details?.pan_number)
},[kycDetails]); 

const onSubmit = ()=>{
    toastAlert.showToastError('Pan Submitted Successfully')
    NavigationService.navigate(KYC_SCREEN)
}
return (
<AppSafeAreaView>
<StatusBar
  backgroundColor={'transparent'}
  barStyle="dark-content"
  translucent={true}
  networkActivityIndicatorVisible={true}
/>
<CommonImageBackground common >
  <Header
    commonHeader
    title="PAN Details"
    style={{ padding: universalPaddingHorizontal, marginTop: '10%' }}
  />
      <View style={{marginHorizontal:20}}>

          <InputBox
            label={'Name'}
            value={name}
            placeholder={'Name'}
            // onChange={setMobileNumber}
            placeholderTextColor={colors.grey}
            textInputBox={styles.textInputBox}
            labelStyle={[styles.label, { marginTop: 20 }]}
            editable={false}
          />

        <InputBox
            label={'Pan Number'}
            value={PanNo}
            placeholder={'Pan Number'}
            // onChange={setMobileNumber}
            placeholderTextColor={colors.grey}
            textInputBox={styles.textInputBox}
            labelStyle={[styles.label, { marginTop: 20 }]}
            editable={false}
          />
          
      </View>

      <View>
      <PrimaryButton
        onPress={onSubmit}
        title="Continue"
        buttonStyle={styles.button}
      />
    </View>
  </CommonImageBackground>
  </AppSafeAreaView>
  
)
}

export default PanConfirmation


const styles = StyleSheet.create({
  panContainer: {
      paddingHorizontal: 1,
      borderRadius: 10,
      borderWidth: 1,
      // borderColor: '#002E612B',
      backgroundColor: colors.bottomBackgroundColor,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 46
    },
    underContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    button: {
      marginTop: 40,
      marginHorizontal:20
    },
})