export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const GET_MOVIES_FAIL = 'GET_MOVIES_FAIL';
export const GET_MOVIES_RESET = 'GET_MOVIES_RESET';

export const GET_MOVIE_BY_ID = 'GET_MOVIE_BY_ID';
export const GET_MOVIE_BY_ID_SUCCESS = 'GET_MOVIE_BY_ID_SUCCESS';
export const GET_MOVIE_BY_ID_FAIL = 'GET_MOVIE_BY_ID_FAIL';

export default function reducer(
  state = {movies: [], error: '', specificMovies: {}},
  action,
) {
  switch (action.type) {
    case GET_MOVIES:
      return {...state, loading: true, error: ''};
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload.data.Search,
        error: action.payload.data.Error || '',
      };
    case GET_MOVIES_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching movies',
      };
    case GET_MOVIES_RESET:
      return {...state, loading: false, error: '', movies: []};
    case GET_MOVIE_BY_ID:
      return {...state};
    case GET_MOVIE_BY_ID_SUCCESS:
      let {imdbID} = action.payload.data;
      let {specificMovies} = state;
      specificMovies[imdbID] = action.payload.data;
      return {
        ...state,
        specificMovies,
      };
    case GET_MOVIE_BY_ID_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export function listMovies(searchTerm, year = '') {
  if (searchTerm.trim() === '') {
    return {
      type: GET_MOVIES_RESET,
    };
  }
  return {
    type: GET_MOVIES,
    payload: {
      request: {
        url: `http://www.omdbapi.com/?apikey=7cceb9a2&s=${searchTerm}&y=${year}`,
      },
    },
  };
}

export function getMovieByID(id) {
  return {
    type: GET_MOVIE_BY_ID,
    payload: {
      request: {
        url: `http://www.omdbapi.com/?apikey=7cceb9a2&i=${id}`,
      },
    },
  };
}
