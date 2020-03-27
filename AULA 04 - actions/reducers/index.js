import { combineReducers } from 'redux';

import Feed from './FeedReducer';
import Profile from './ProfileReducer';
import Post from './PostReducer';
import User from './UserReducer';

export default combineReducers({
  Feed,
  Profile,
  Post,
  User,
});
