import { StyleSheet } from 'react-native';
import { kHeight, kWidth } from '../utils/Constants';
import Colors from './Colors';
/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default StyleSheet.create({
  /* Container */
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FA',
  },
  /* Column Layouts */
  column: {
    flexDirection: 'column',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
  colCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colVCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  colHCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  colBetween: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  /* Row Layouts */
  row: {
    flexDirection: 'row',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowVCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowHCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  /* Default Layouts */
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  alignItemsStretch: {
    alignItems: 'stretch',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentAround: {
    justifyContent: 'space-around',
  },
  justifyContentBetween: {
    justifyContent: 'space-between',
  },
  scrollSpaceAround: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  scrollSpaceBetween: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  selfStretch: {
    alignSelf: 'stretch',
  },
  /* Text Input */
  textInput: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    color: Colors.primary,
    minHeight: 50,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  /* Shadow */
  shadow: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  /* Text Color */
  textContent: {
    color: Colors.black,
  },
  textNote: {
    color: Colors.black,
  },
  textTitle: {
    color: Colors.black,
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  /* Sizes Layouts */
  fill: {
    flex: 1,
  },
  fullDevice: {
    width: kWidth,
    height: kHeight,
  },
  fullSize: {
    height: '100%',
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  fillAbsolute: {
    flex: 1,
    position: 'absolute',
    zIndex: 999,
  },
  /* Operation Layout */
  mirror: {
    transform: [{ scaleX: -1 }],
  },
  rotate90: {
    transform: [{ rotate: '90deg' }],
  },
  rotate90Inverse: {
    transform: [{ rotate: '-90deg' }],
  },
  /* Text Layout */
  whiteBg: {
    backgroundColor: Colors.white,
  },
  textCenter: {
    textAlign: 'center',
  },
  textPrimary: {
    color: Colors.primary,
  },
  textSecondary: {
    color: Colors.secondary,
  },
});
