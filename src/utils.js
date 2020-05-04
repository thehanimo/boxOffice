import {Dimensions, Platform} from 'react-native';
export const WIDTH = Math.round(Dimensions.get('window').width);
export const HEIGHT = Math.round(Dimensions.get('window').height);
export const SHADOW = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.05,
  shadowRadius: 2,

  elevation: 3,
};
export const baseFont =
  Platform.OS == 'ios' ? 'AirbnbCerealApp' : 'AirbnbCereal';
export const COLORS = {
  WHITE: '#fff',
  BG: '#EFEFEF',
  GREY: 'grey',
  BLUE: 'rgb(10,132,255)', // iOS System Blue
  BLACK: '#000',
};

export const TITLE_STYLE = {
  fontSize: 26,
  marginLeft: 10,
  fontFamily: baseFont + '-ExtraBold',
  fontWeight: '800',
};

export const SUBHEADING_STYLE = {
  fontSize: 20,
  marginLeft: 10,
  color: COLORS.GREY,
  fontFamily: baseFont + '-ExtraBold',
};

export const BODY_STYLE = {
  fontSize: 20,
  marginLeft: 10,
  color: COLORS.GREY,
  fontFamily: baseFont + '-Medium',
};
