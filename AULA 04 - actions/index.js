import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import FeedContainer from './containers/Feed';
import ProfileContainer from './containers/Profile';
import PostContainer from './containers/Post';
import RegisterContainer from './containers/Register';
import LoginContainer from './containers/Login';

import { requireAuthentication, redirectIfAuthenticated } from './utils/authorization';
import store from './store';
import './styles/index.scss';

const APP_CONTAINER_NAME = 'app-container';

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route
          exact
          path="/"
          render={() => (
            requireAuthentication()
              ? <Redirect to="/login" />
              : <FeedContainer />
          )}
        />
        <Route
          exact
          path="/register"
          render={() => (
            redirectIfAuthenticated()
              ? <Redirect to="/" />
              : <RegisterContainer />
          )}
        />
        <Route
          exact
          path="/login"
          render={() => (
            redirectIfAuthenticated()
              ? <Redirect to="/" />
              : <LoginContainer />
          )}
        />
        <Route
          exact
          path="/user/:user_id"
          render={props => (
            requireAuthentication()
              ? <Redirect to="/login" />
              : <ProfileContainer {...props} />
          )}
        />
        <Route
          exact
          path="/post/:post_id"
          render={props => (
            requireAuthentication()
              ? <Redirect to="/login" />
              : <PostContainer {...props} />
          )}
        />
      </div>
    </Router>
  </Provider>
);

window.addEventListener('DOMContentLoaded', () => {
  let appContainer = document.getElementById(APP_CONTAINER_NAME);

  if (!appContainer) {
    appContainer = document.createElement('DIV');
    appContainer.id = APP_CONTAINER_NAME;
    document.body.appendChild(appContainer);
  }

  render(<App />, appContainer);
});
