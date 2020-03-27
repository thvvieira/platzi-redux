import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './index.scss';

import PostItem from '../../components/PostItem';
import { fetchPosts, refreshTimeStamps } from '../../actions/feedActions';

class ProfileContainer extends Component {
  constructor(args) {
    super(args);
    this.state = {
      refreshInterval: null,
    };
  }

  componentWillMount() {
    const { user_id: author } = this.props.match.params;
    this.props.dispatch(fetchPosts(author));
    if (!this.state.refreshInterval) {
      const refreshInterval = setInterval(() => {
        this.props.dispatch(refreshTimeStamps());
      }, 60000);
      this.setState({ refreshInterval });
    }
  }

  componentWillUnmount() {
    console.log('unmounted');
    clearInterval(this.state.refreshInterval);
    this.setState({ refreshInterval: null });
  }

  render() {
    return (
      <div className={styles.container}>

        <Link to="/" className={cn('mtb20 back')}>{'Go Back'}</Link>

        <div>{this.props.feed.error}</div>

        <h1 className={cn('mtb20')}>{`Viewing posts for : ${this.props.match.params.user_id}`}</h1>

        {
          this.props.feed.posts.map(({ username, _id: id, created_at: createdAt, text }) =>
            (<PostItem
              key={id}
              id={id}
              username={username}
              createdAt={createdAt}
              text={text}
            />),
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state.Feed,
});

export default connect(mapStateToProps)(ProfileContainer);
