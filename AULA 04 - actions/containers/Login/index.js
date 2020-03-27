import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './index.scss';
import {
  editUserDetails,
  loginUser,
} from '../../actions/userActionCreators';

class LoginContainer extends Component {
  constructor(args) {
    super(args);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.dispatch(loginUser());
  }

  handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.props.dispatch(editUserDetails(key, value));
  }

  render() {
    return (
      <div className={styles.container}>
        <form onSubmit={this.handleLogin} className={'card'}>
          <h1 className={cn('mtb10', styles.heading)}>{'Login'}</h1>
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
            value={this.props.user.username}
            placeholder="Enter Username"
          />
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.props.user.password}
            placeholder="Enter Password"
          />
          <input
            type="submit"
            value="Login"
            className={cn('btn btn-primary mtb10', styles['login-button'])}
          />
          {
            this.props.user.message
              ? <div>{this.props.user.message}</div>
              : null
          }
          <div className={cn('mtb10', styles.cta)}>
            <p>
              {"Don't have an account?"}
              <span>
                <Link to="/register">
                  {'Register here'}
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.User,
});

export default connect(mapStateToProps)(LoginContainer);
