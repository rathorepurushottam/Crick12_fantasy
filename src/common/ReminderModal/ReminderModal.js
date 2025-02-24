import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../../theme/color';
import { AppText, ELEVEN, FORTEEN, POPPINS_MEDIUM, THIRTEEN } from '../AppText';
import { TouchableOpacityView } from '../TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import { checkAdhaar, panIcon } from '../../helper/image';
import { useSelector } from 'react-redux';
import { toastAlert } from '../../helper/utility';
import NavigationService from '../../navigation/NavigationService';
import { VERIFY_ADHAAR_SCREEN, VERIFY_PAN_SCREEN } from '../../navigation/routes';
import PrimaryButton from '../primaryButton';

const ReminderModal = ({ setkycPOpUp, kycPOpUp }) => {
const kycDetails = useSelector(state => {
        return state.profile.kycDetails;
});

// console.log(kycDetails,"kyccccccccc")
const newCheck = (kycDetails?.pan_verified == 1 && kycDetails?.email_verified == 1 && kycDetails?.adhar_verified == 1) && (kycDetails?.upi_verified == 1 || kycDetails?.bank_verified == 1)
    const isVerified = id => {  
        if (id == 'PAN') {
          return kycDetails?.pan_verified == 1;
        } else if (id == 'EMAIL') {
          return kycDetails?.email_verified == 1;
        }else if(id == "Aadhar"){
          return kycDetails?.adhar_verified == 1;
        }
      };
      const checkInProgress = id => {
        if (id == 'PAN') {
          return kycDetails?.pan_verified == 2;
        } else if (id == 'EMAIL') {
          return kycDetails?.email_verified == 2;
        }else if(id == "Aadhar"){
          return kycDetails?.adhar_verified == 2;
        }
      };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={kycPOpUp}
          onRequestClose={() => {
            setkycPOpUp(!kycPOpUp);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setkycPOpUp(false)}>
                <Entypo name="cross" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.titleText}>Complete your verification</Text>
              <Text style={styles.subtitleText}>
                It will only take about 2 minutes
              </Text>

            <AppText
            weight={POPPINS_MEDIUM}
            type={FORTEEN}
            style={styles.getVerified}>
            Aadhar Verification
          </AppText>
          <TouchableOpacityView
            onPress={() => isVerified('Aadhar') ?
              toastAlert.showToastError('Your Aadhar have been Verfied') :
              checkInProgress('Aadhar') ?
                toastAlert.showToastError('Your Aadhar have been progress') :
                NavigationService.navigate(VERIFY_ADHAAR_SCREEN)}
            style={styles.panContainer}>
            <View style={styles.underContainer}>
              <View style={styles.pancardlayerview}>
                <FastImage source={panIcon} resizeMode="contain" style={styles.renderImage} />
              </View>
              <AppText type={THIRTEEN} weight={POPPINS_MEDIUM} style={{ marginLeft: 10 }}>
              Aadhar
              </AppText>

            </View>
            {isVerified('Aadhar') ?
              <FastImage source={checkAdhaar} resizeMode='contain' style={styles.checkIcon} />
              : checkInProgress('Aadhar') ? <AppText type={THIRTEEN} weight={POPPINS_SEMI_BOLD} color={RED}>
                In Progress
              </AppText> :
              ''
                // <PrimaryButton
                //   type={ELEVEN}
                //   smallBtn={{ height: 21, borderRadius: 5 }}
                //   buttonStyle={[styles.buttonStyle]}
                //   title="Verify"
                //   onPress={() => NavigationService.navigate(VERIFY_ADHAAR_SCREEN)}
                // />
            }
          </TouchableOpacityView>
          <AppText
            weight={POPPINS_MEDIUM}
            type={FORTEEN}
            style={styles.getVerified}>
            Pan Verification
          </AppText>
          <TouchableOpacityView
            onPress={() => isVerified('PAN') ?
              toastAlert.showToastError('Your PAN have been Verfied') :
              checkInProgress('PAN') ?
                toastAlert.showToastError('Your PAN have been progress') :
                NavigationService.navigate(VERIFY_ADHAAR_SCREEN)}
            style={styles.panContainer}>
            <View style={styles.underContainer}>
              <View style={styles.pancardlayerview}>
                <FastImage source={panIcon} resizeMode="contain" style={styles.renderImage} />
              </View>
              <AppText type={THIRTEEN} weight={POPPINS_MEDIUM} style={{ marginLeft: 10 }}>
              PAN
              </AppText>

            </View>
            {isVerified('PAN') ?
              <FastImage source={checkAdhaar} resizeMode='contain' style={styles.checkIcon} />
              : checkInProgress('Pan') ? <AppText type={THIRTEEN} weight={POPPINS_SEMI_BOLD} color={RED}>
                In Progress
              </AppText> :
                // <PrimaryButton
                //   type={ELEVEN}
                //   smallBtn={{ height: 21, borderRadius: 5 }}
                //   buttonStyle={[styles.buttonStyle]}
                //   title="Verify"
                //   onPress={() => NavigationService.navigate(VERIFY_PAN_SCREEN)}
                // />
                ''
            }
          </TouchableOpacityView>
              {/* <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity> */}

              {/* <Text style={styles.footerText}>
                To complete the verification process, you need to submit all the
                documents. If you experience any issues, contact support.
              </Text> */}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ReminderModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color:colors.black
  },
  subtitleText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 10,
  },
  section: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 14,
    color: 'green',
  },
  placeholderText: {
    fontSize: 12,
    color: 'gray',
  },
  continueButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  getVerified: {
    marginTop: 20,
    marginBottom: 10,
  },
  panContainer: {
    paddingHorizontal: 1,
    borderRadius: 10,
    borderWidth: 1,
    // borderColor: '#002E612B',
    backgroundColor: colors.bottomBackgroundColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 46,
    paddingHorizontal:5
  },
  underContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  renderImage: {
    height: 20,
    width: 20,
    // marginLeft:,
    left: -1

  },
  checkIcon: {
    height: 20,
    width: 20,
    marginRight: 10
  },
  buttonStyle: {
    marginHorizontal: 5,
    width: 66,
    height: 21
  },
  buttonTwo: {
    marginTop: 30,
    marginBottom: 20
  },
});


// import React, {useState} from 'react';
// import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
// import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// import Entypo from 'react-native-vector-icons/Entypo';
// import { colors } from '../../theme/color';
// const ReminderModal = ({setkycPOpUp,kycPOpUp}) => {
//   return (
//     <SafeAreaProvider>
//     <SafeAreaView style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={kycPOpUp}
//         onRequestClose={() => {
//           setkycPOpUp(!kycPOpUp);
//         }}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <View>
//                 <Entypo name="cross" size={20} color={colors.black}/>

//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   </SafeAreaProvider>
//   )
// }

// export default ReminderModal
// const styles = StyleSheet.create({
//     centeredView: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     modalView: {
//       margin: 20,
//       backgroundColor: 'white',
//       borderRadius: 20,
//       padding: 35,
//       alignItems: 'center',
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.25,
//       shadowRadius: 4,
//       elevation: 5,
//     },
//     button: {
//       borderRadius: 20,
//       padding: 10,
//       elevation: 2,
//     },
//     buttonOpen: {
//       backgroundColor: '#F194FF',
//     },
//     buttonClose: {
//       backgroundColor: '#2196F3',
//     },
//     textStyle: {
//       color: 'white',
//       fontWeight: 'bold',
//       textAlign: 'center',
//     },
//     modalText: {
//       marginBottom: 15,
//       textAlign: 'center',
//     },
//   });