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

const AadharConfirmation = () => {
    const kycDetails = useSelector(state => {
        return state.profile.kycDetails;
    });
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [aadharno, setaadharno] = useState('');
    const [Address, setAddress] = useState('');

    console.log(kycDetails, "kycdetsila++++++++")
    useEffect(() => {
        setName(kycDetails?.adahr_details?.adahr_name);
        setaadharno(kycDetails?.adahr_details?.adhar_no);
        setDob(kycDetails?.adahr_details?.user_dob);
        setAddress(`${kycDetails?.address?.house} ${kycDetails?.address?.street} ${kycDetails?.address?.dist} ${kycDetails?.address?.state} ${kycDetails?.address?.country}`)
    }, [kycDetails]);

    const onSubmit = () => {
        toastAlert.showToastError('Aadhar Submitted Successfully')
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
                    title="Aadhar Details"
                    style={{ padding: universalPaddingHorizontal, marginTop: '10%' }}
                />
                <View style={{ marginHorizontal: 20 }}>

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
                        label={'Date of Birth'}
                        value={dob}
                        placeholder={'Date of Birth'}
                        // onChange={setMobileNumber}
                        placeholderTextColor={colors.grey}
                        textInputBox={styles.textInputBox}
                        labelStyle={[styles.label, { marginTop: 20 }]}
                        editable={false}
                    />
                    <InputBox
                        label={'Aadhar Number'}
                        value={aadharno}
                        placeholder={'Aadhar Number'}
                        // onChange={setMobileNumber}
                        placeholderTextColor={colors.grey}
                        textInputBox={styles.textInputBox}
                        labelStyle={[styles.label, { marginTop: 20 }]}
                        editable={false}
                    />
                    {/* <InputBox
                        label={'Aadhar Address'}
                        value={Address}
                        placeholder={'Aadhar Address'}
                        // onChange={setMobileNumber}
                        placeholderTextColor={colors.grey}
                        textInputBox={styles.textInputBox}
                        labelStyle={[styles.label, { marginTop: 20 }]}
                        editable={false}
                    />
                     */}

                    <AppText
                        type={FORTEEN}
                        weight={POPPINS_MEDIUM}
                        style={[styles.label,]}>
                        Address
                    </AppText>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: "#E4E4E4",
                            borderRadius: 12,
                            backgroundColor: "#F5F5F5",
                            height: 80,
                            justifyContent: "center",
                            paddingHorizontal: 10,
                            // alignItems: "center",
                        }}
                    >
                        <AppText style={{ color: colors.black }} weight={POPPINS_MEDIUM}>
                            {Address}
                        </AppText>
                    </View>
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

export default AadharConfirmation

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
        marginHorizontal: 20
    },
})