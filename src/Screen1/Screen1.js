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
import {connect} from 'react-redux';
import {WIDTH, COLORS, SHADOW, HEIGHT, TITLE_STYLE, baseFont} from '../utils';
import {listMovies} from '../reducer';
import SearchBar from '../Components/SearchBar';
import {getBookmarks} from '../AsyncStorage';

class Screen1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {bookmarks: []};
  }
  componentDidMount = () => {
    this.props.navigation.addListener('focus', () => {
      this.updataBookmarks();
    });
  };
  updataBookmarks = async () => {
    let bookmarks = await getBookmarks();
    bookmarks = Object.values(bookmarks);
    this.setState({bookmarks});
  };
  renderMovie = ({item, index}) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.movieCard}
        onPress={() => this.props.navigation.push('Screen2', {movie: item})}>
        <Image source={{uri: item.Poster}} style={styles.moviePoster} />
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
      <View style={styles.container}>
        <SafeAreaView />
        <SearchBar search={this.props.listMovies} />
        <Text style={[TITLE_STYLE, {marginBottom: 16}]}>Bookmarks</Text>
        <FlatList
          data={this.state.bookmarks}
          renderItem={this.renderMovie}
          contentContainerStyle={styles.flatList}
        />
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
  flatList: {
    width: WIDTH,
    paddingBottom: 100,
    alignItems: 'center',
  },
  movieCard: {
    padding: 16,
    width: WIDTH - 32,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 16,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    ...SHADOW,
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
    height: 351 / 5,
    width: 225 / 5,
    marginRight: 16,
  },
});

const mapStateToProps = (state) => {
  let storedMovies =
    state.movies &&
    state.movies.map((movie) => ({key: movie.imdbID, ...movie}));
  return {
    movies: storedMovies,
  };
};

const mapDispatchToProps = {
  listMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen1);
