import * as actions from '../actions/actions';

export default function reducer(
  state = {
    newCommentText: '',
    post: {},
    comments: [],
    fetchingPost: false,
    fetchingComments: false,
    error: false,
    message: null,
  }, action) {
  let newState;

  switch (action.type) {
    case actions.UPDATE_NEW_COMMENT_TEXT: {
      newState = {
        ...state,
        newCommentText: action.value,
      };
      break;
    }

    case actions.UPDATE_NEW_REPLY_TEXT: {
      newState = {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment._id === action.commentId) { // eslint-disable-line no-underscore-dangle
            return {
              ...comment,
              newReplyText: action.value,
            };
          }
          return comment;
        }),
      };
      break;
    }

    case actions.CREATE_NEW_COMMENT_REQUEST: {
      newState = {
        ...state,
        creating: true,
        error: false,
        message: null,
      };
      break;
    }

    case actions.CREATE_NEW_COMMENT_SUCCESS: {
      newState = {
        ...state,
        creating: false,
        fetching: false,
        comments: [...state.comments, action.data.comment],
        newCommentText: '',
        error: false,
        message: null,
      };
      break;
    }

    case actions.CREATE_NEW_COMMENT_FAILURE: {
      newState = {
        ...state,
        creating: false,
        error: true,
        message: action.payload.message,
      };
      break;
    }

    case actions.CREATE_NEW_REPLY_REQUEST: {
      newState = {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment._id === action.commentId) { // eslint-disable-line no-underscore-dangle
            return {
              ...comment,
              creatingReply: true,
            };
          }
          return comment;
        }),
        error: false,
        message: null,
      };
      break;
    }

    case actions.CREATE_NEW_REPLY_SUCCESS: {
      newState = {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment._id === action.data.comment_id) { // eslint-disable-line no-underscore-dangle
            return {
              ...comment,
              creatingReply: false,
              newReplyText: '',
              replies: [action.data.reply, ...comment.replies],
            };
          }
          return comment;
        }),
        newCommentText: '',
        error: false,
        message: null,
      };
      break;
    }

    case actions.CREATE_NEW_REPLY_FAILURE: {
      newState = {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment._id === action.commentId) { // eslint-disable-line no-underscore-dangle
            return {
              ...comment,
              creatingReply: false,
            };
          }
          return comment;
        }),
        error: true,
        message: action.payload.message,
      };
      break;
    }

    case actions.FETCH_POST_REQUEST: {
      newState = {
        ...state,
        fetchingPost: true,
      };
      break;
    }

    case actions.FETCH_POST_SUCCESS: {
      newState = {
        ...state,
        post: action.data,
        fetchingPost: false,
      };
      break;
    }

    case actions.FETCH_POST_FAILURE: {
      newState = {
        ...state,
        fetchingPost: false,
        error: true,
        message: action.payload.message,
      };
      break;
    }

    case actions.FETCH_COMMENTS_REQUEST: {
      newState = {
        ...state,
        fetchingComments: true,
      };
      break;
    }

    case actions.FETCH_COMMENTS_SUCCESS: {
      newState = {
        ...state,
        comments: [...action.data.comments],
        fetchingComments: false,
      };
      break;
    }

    case actions.FETCH_COMMENTS_FAILURE: {
      newState = {
        ...state,
        fetchingComments: false,
        error: true,
        message: action.payload.message,
      };
      break;
    }

    case actions.FETCH_REPLIES_REQUEST: {
      newState = {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment._id === action.commentId) { // eslint-disable-line no-underscore-dangle
            return {
              ...comment,
              fetchingReplies: true,
            };
          }
          return comment;
        }),
      };
      break;
    }

    case actions.FETCH_REPLIES_SUCCESS: {
      newState = {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment._id === action.data.comment_id) { // eslint-disable-line no-underscore-dangle
            return {
              ...comment,
              replies: [...action.data.replies],
              fetchingReplies: false,
            };
          }
          return comment;
        }),
      };
      break;
    }

    case actions.FETCH_REPLIES_FAILURE: {
      newState = {
        ...state,
        error: true,
        message: action.payload.message,
        comments: state.comments.map((comment) => {
          if (comment._id === action.commentId) { // eslint-disable-line no-underscore-dangle
            return {
              ...comment,
              fetchingReplies: false,
            };
          }
          return comment;
        }),
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

