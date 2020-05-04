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
  ActivityIndicator,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {listMovies} from '../reducer';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import {WIDTH, COLORS, SHADOW, HEIGHT, TITLE_STYLE, baseFont} from '../utils';
import YearPicker from './YearPicker';
import * as RootNavigation from '../../RootNavigation';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocussed: false,
      showModal: false,
      text: '',
      year: 'None',
      safeTop: 0,
    };
  }
  componentDidMount = () => {
    if (Platform.OS === 'ios')
      StaticSafeAreaInsets.getSafeAreaInsets((values) =>
        this.setState({safeTop: values.safeAreaInsetsTop}),
      );
  };
  onChangeText = (newText) => {
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    if (newText === '') {
      this.props.listMovies('');
    } else {
      this.searchTimeout = setTimeout(() => {
        if (this.state.year !== 'None')
          this.props.listMovies(newText, this.state.year);
        else this.props.listMovies(newText);
      }, 1000);
    }

    this.setState({text: newText});
  };
  renderMovie = ({item, index}) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.movieCard}
        onPress={() => {
          this.textInput.clear();
          this.textInput.blur();
          this.props.listMovies('');
          this.setState({text: '', showModal: false});
          RootNavigation.push('Screen2', {movie: item});
        }}>
        <View style={{flex: 1}}>
          <Text style={styles.movieTitle} numberOfLines={2}>
            {item.Title}
          </Text>
          <Text style={styles.movieYear}>{item.Year}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={() => {
            if (this.state.isFocussed) this.textInput.blur();
            this.setState({showModal: false});
          }}>
          <Text style={TITLE_STYLE}>Search</Text>
          <View>
            <TextInput
              ref={(ref) => (this.textInput = ref)}
              style={styles.textInput}
              onChangeText={this.onChangeText}
              onFocus={() => this.setState({isFocussed: true, showModal: true})}
              onBlur={() => this.setState({isFocussed: false})}
              autoCorrect={false}
              placeholder={'Try Star Wars or Avengers...'}
              placeholderTextColor={COLORS.GREY}
            />
            <View style={styles.yearContainer}>
              <Text style={styles.yearLabel}>Year:</Text>
              <TouchableOpacity
                style={styles.yearBut}
                onPress={() => this.setState({showYearPicker: true})}>
                <Text style={styles.yearLabel}>{this.state.year}</Text>
              </TouchableOpacity>
            </View>
            {this.state.text !== '' && (
              <TouchableOpacity
                style={styles.clearContainer}
                onPress={() => {
                  this.textInput.clear();
                  this.props.listMovies('');
                  this.setState({text: ''});
                }}>
                {this.props.loading ? (
                  <ActivityIndicator />
                ) : (
                  <Image
                    source={require('../../assets/img/clear.png')}
                    style={styles.clearIcon}
                  />
                )}
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
        {this.state.showModal && (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.backdrop}
            onPress={() => {
              if (this.state.isFocussed) this.textInput.blur();
              this.setState({showModal: false});
            }}>
            {(this.props.movies.length !== 0 || this.props.error !== '') &&
              this.state.showModal && (
                <View
                  style={[
                    styles.dropdownContainer,
                    {top: 170 + this.state.safeTop},
                  ]}>
                  {this.props.error !== '' ? (
                    <Text style={styles.errorText}>{this.props.error}</Text>
                  ) : (
                    <FlatList
                      keyboardShouldPersistTaps="always"
                      data={this.props.movies}
                      renderItem={this.renderMovie}
                      contentContainerStyle={styles.flatList}
                      ItemSeparatorComponent={() => (
                        <View style={styles.dropdownSeperator} />
                      )}
                    />
                  )}
                </View>
              )}
          </TouchableOpacity>
        )}
        <YearPicker
          isVisible={this.state.showYearPicker}
          close={(year) => {
            this.props.listMovies('');
            this.setState({showYearPicker: false, year}, () =>
              this.onChangeText(this.state.text),
            );
          }}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  backdrop: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: 'rgba(0,0,0,0.15)',
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  clearContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    height: 40,
    width: 30,
    justifyContent: 'center',
  },
  clearIcon: {height: 24, width: 24, opacity: 0.2, marginLeft: 2},
  dropdownSeperator: {
    height: 0.5,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginVertical: 8,
  },
  dropdownContainer: {
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 20,
    paddingHorizontal: 8,
    width: WIDTH - 32,
    maxHeight: 300,
    backgroundColor: COLORS.WHITE,
    ...SHADOW,
  },
  container: {
    marginTop: 32,
    zIndex: 3,
  },
  flatList: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  textInput: {
    marginTop: 16,
    height: 40,
    width: WIDTH - 32,
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    fontFamily: baseFont + '-Light',
    color: COLORS.BLACK,
    ...SHADOW,
  },
  yearContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    marginBottom: 32,
    marginRight: 16,
  },
  yearLabel: {
    fontFamily: baseFont + '-Medium',
    fontSize: 16,
    lineHeight: 30,
  },
  yearBut: {
    height: 30,
    width: 70,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 8,
    marginLeft: 8,
    fontFamily: baseFont + '-Light',
    ...SHADOW,
  },
  movieTitle: {
    fontFamily: baseFont + '-Light',
  },
  movieYear: {
    fontFamily: baseFont + '-Medium',
    color: COLORS.GREY,
  },
  errorText: {
    fontFamily: baseFont + '-Bold',
    margin: 8,
    color: COLORS.GREY,
  },
});

const mapStateToProps = (state) => {
  let movies = state.movies
    ? state.movies.map((movie) => ({key: movie.imdbID, ...movie}))
    : [];
  return {
    ...state,
    movies,
  };
};

const mapDispatchToProps = {
  listMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
