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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {
  WIDTH,
  COLORS,
  SHADOW,
  HEIGHT,
  TITLE_STYLE,
  SUBHEADING_STYLE,
  BODY_STYLE,
  baseFont,
} from '../utils';
import {listMovies, getMovieByID} from '../reducer';
import SearchBar from '../Components/SearchBar';
import {bookmarkMovie, getBookmarks, unbookmarkMovie} from '../AsyncStorage';

class Screen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requested: false,
    };
  }
  setBookmarked = async () => {
    const {movie} = this.props.route.params;
    let bookmarks = await getBookmarks();
    if (movie.imdbID in bookmarks) this.setState({isBookmarked: true});
    else this.setState({isBookmarked: false});
  };
  render() {
    this.setBookmarked();
    const {movie} = this.props.route.params;
    let director = '',
      actors = '';
    if (!this.props.specificMovies[movie.imdbID] && !this.state.requested) {
      this.props.getMovieByID(movie.imdbID);
      this.setState({requested: true});
    } else if (this.props.specificMovies[movie.imdbID]) {
      director = this.props.specificMovies[movie.imdbID].Director;
      actors = this.props.specificMovies[movie.imdbID].Actors;
    }

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={{position: 'absolute'}}>
          <SafeAreaView />
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backIconContainer}>
            <Image
              source={require('../../assets/img/back.png')}
              style={styles.backIcon}
            />
            <Text style={styles.backLabel}>Back</Text>
          </TouchableOpacity>
        </View>
        <SearchBar search={this.props.listMovies} />
        <ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <Text style={TITLE_STYLE}>{movie.Title}</Text>
            </View>
            {this.state.isBookmarked ? (
              <TouchableOpacity
                style={[styles.bookmarkButton, {backgroundColor: 'black'}]}
                onPress={() => {
                  unbookmarkMovie(movie);
                  setTimeout(() => {
                    this.setBookmarked();
                  }, 100);
                }}>
                <Text>🔖</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.bookmarkButton}
                onPress={() => {
                  bookmarkMovie(movie);
                  setTimeout(() => {
                    this.setBookmarked();
                  }, 100);
                }}>
                <Text>🔖</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={[SUBHEADING_STYLE, {marginBottom: 24}]}>
            {movie.Year}
          </Text>
          <Image source={{uri: movie.Poster}} style={styles.moviePoster} />
          {director !== '' ? (
            <>
              <Text style={TITLE_STYLE}>Director</Text>
              <Text style={[BODY_STYLE, {marginBottom: 16}]}>{director}</Text>
              <Text style={TITLE_STYLE}>Cast</Text>
              <Text
                style={[BODY_STYLE, {marginBottom: 16, paddingBottom: 100}]}>
                {actors}
              </Text>
            </>
          ) : (
            <ActivityIndicator />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: COLORS.BG,
  },
  movieTitle: {
    fontFamily: baseFont + '-Light',
    fontSize: 16,
  },
  movieYear: {
    fontFamily: baseFont + '-Medium',
    color: COLORS.GREY,
  },
  moviePoster: {
    height: Math.min(351, (351 * WIDTH) / 225),
    alignSelf: 'center',
    width: Math.min(225, WIDTH),
    marginRight: 16,
    marginBottom: 24,
    ...SHADOW,
  },
  bookmarkButton: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 16,
    marginLeft: 8,
  },
  bookmarkImg: {
    height: 24,
    width: 24,
  },
  bookmarkLabel: {
    fontFamily: baseFont + '-Medium',
    fontSize: 16,
    lineHeight: 30,
  },
  backIconContainer: {
    marginLeft: 5,
    flexDirection: 'row',
  },
  backIcon: {
    height: 16,
    width: 16,
  },
  backLabel: {
    lineHeight: 16,
    marginLeft: 4,
  },
});

const mapStateToProps = (state) => {
  let storedMovies =
    state.movies && state.movies.map((movie) => ({key: movie.id, ...movie}));
  return {
    ...state,
    movies: storedMovies,
  };
};

const mapDispatchToProps = {
  listMovies,
  getMovieByID,
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen2);
