/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-community/picker';
import {WIDTH, COLORS, SHADOW, HEIGHT, TITLE_STYLE} from '../utils';

export default class YearPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {year: 'None'};
  }
  renderPickerItems = () => {
    let out = [];
    for (let i = 1874; i < 2021; i++) {
      out.push(<Picker.Item label={`${i}`} value={`${i}`} />);
    }
    out.push(<Picker.Item label={`None`} value={'None'} />);
    return out;
  };
  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={() => this.props.close(this.state.year)}
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={styles.clearBut}
            onPress={() => this.setState({year: ''})}>
            <Text style={styles.clearLabel}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.doneBut}
            onPress={() => this.props.close(this.state.year)}>
            <Text style={styles.doneLabel}>Done</Text>
          </TouchableOpacity>
        </View>
        <Picker
          selectedValue={this.state.year}
          style={{
            width: WIDTH,
            backgroundColor: 'white',
            alignSelf: 'flex-end',
          }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({year: itemValue})
          }>
          {this.renderPickerItems()}
        </Picker>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  clearBut: {
    height: 30,
    width: 70,
    justifyContent: 'center',
    marginLeft: 10,
    ...SHADOW,
  },
  clearLabel: {
    fontFamily: 'AirbnbCerealApp-Medium',
    lineHeight: 30,
    fontSize: 20,
    color: COLORS.WHITE,
  },
  doneBut: {
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
    ...SHADOW,
  },
  doneLabel: {
    fontFamily: 'AirbnbCerealApp-Medium',
    lineHeight: 30,
    fontSize: 20,
    color: COLORS.BLUE,
  },
});
