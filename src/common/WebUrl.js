import React from "react";
import { View, StyleSheet } from 'react-native';
import { AppSafeAreaView } from "./AppSafeAreaView";
import { KeyBoardAware } from "./KeyboardAware";
import WebView from "react-native-webview";
import Header from "./Header";
import CommonImageBackground from "./commonImageBackground";
import { StatusBar } from "native-base";


const WebUrl = ({ route }) => {
    let title = route?.params?.titleNames
    console.log('====================================')
    console.log(title,'====title>>>')
    console.log('====================================')
    let titleName = () => {
        if (title == 'Terms & Conditions') {
            return 'http://103.175.163.162:5125/termsNConditionsmobile'
        } else if (title == 'About Us') {
            return 'http://103.175.163.162:5125/aboutmobile'
        } else if (title == 'How to Play') {
            return 'http://103.175.163.162:5125/howToPlaymobile'
        } else if (title == 'Privacy Policy') {
            return 'http://103.175.163.162:5125/policymobile'
        } else if (title == 'Points System') {
            return 'http://103.175.163.162:5125/responsible_gaming'
        } else if (title == 'Responsible Gaming') {
            return 'http://103.175.163.162:5125/responsible_gaming'
        } else if (title == 'Legalities') {
            return 'http://103.175.163.162:5125/legalities'
        } else if (title == 'Fair Play Policy') {
            return 'http://103.175.163.162:5125/fairPlay'
        }
    }
    return (
        <AppSafeAreaView >
            <StatusBar
                backgroundColor={'#111019'}
                translucent={true}
                networkActivityIndicatorVisible={true}
            />
            <CommonImageBackground common >
                <Header
                    title={title}
                    commonHeader
                />
                <KeyBoardAware>
                    <WebView
                        source={{ uri: titleName() }}
                    />
                </KeyBoardAware>
            </CommonImageBackground>
        </AppSafeAreaView>
    )
}
const styles = StyleSheet.create({

})
export default WebUrl
