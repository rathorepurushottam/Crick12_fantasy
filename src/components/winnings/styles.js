import {StyleSheet} from 'react-native';
import { NewColor, colors } from '../../theme/color';

const styles = StyleSheet.create({
  head: {
    height: 33,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor:"#424242",
    borderTopLeftRadius:10,
    borderTopRightRadius:10

  },
  winningContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    backgroundColor:"#1E1C2A"
    // backgroundColor:'orange'
  },
});

export default styles;
