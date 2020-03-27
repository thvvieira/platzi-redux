import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './index.scss';
import {
  editUserDetails,
  createUser,
} from '../../actions/userActionCreators';

class RegisterContainer extends Component {
  constructor(args) {
    super(args);

    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleRegister(e) {
    e.preventDefault();
    this.props.dispatch(createUser());
  }

  handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.props.dispatch(editUserDetails(key, value));
  }

  render() {
    return (
      <div className={styles.container}>
        <form onSubmit={this.handleRegister} className={'card'}>
          <h1 className={cn('mtb10', styles.heading)}>{'Register'}</h1>
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
            type="password"
            name="passwordConfirm"
            onChange={this.handleChange}
            value={this.props.user.passwordConfirm}
            placeholder="Confirm Password"
          />
          <input
            type="submit"
            value="Register"
            className={cn('btn btn-primary mtb10', styles['register-button'])}
          />
          {
            this.props.user.message
              ? <div>{this.props.user.message}</div>
              : null
          }
          <div className={cn('mtb10', styles.cta)}>
            <p>
              {'Already have an account?'}
              <span>
                <Link to="/login">
                  {'Login here'}
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

export default connect(mapStateToProps)(RegisterContainer);
