export default function reducer(
  state = {
    posts: [],
    fetching: false,
    error: false,
    errorMessage: null,
  }, action) {
  let newState;

  switch (action.type) {
    case 'FETCH_USER_POSTS_REQUEST': {
      newState = {
        ...state,
        fetching: true,
        error: false,
        errorMessage: null,
      };
      break;
    }

    case 'FETCH_USER_POSTS_SUCCESS': {
      newState = {
        ...state,
        fetching: false,
        posts: [...state.posts, action.payload],
        error: false,
        errorMessage: null,
      };
      break;
    }

    case 'FETCH_USER_POSTS_FAILURE': {
      newState = {
        ...state,
        fetching: false,
        error: true,
        errorMessage: action.payload,
      };
      break;
    }

    default: {
      newState = {
        ...state,
      };
    }
  }

  return newState;
}
