import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import cn from 'classnames';

import styles from './index.scss';
import PostCreator from '../../components/Creator';
import PostItem from '../../components/PostItem';
import { updateNewPostText, createNewPost, fetchPosts, refreshTimeStamps, emittedNewPost, showNewPostsAlert } from '../../actions/feedActions';
import { purgeToken } from '../../utils/authorization';

window.smoothScrollTop = function (duration, offset) {
  const startingY = window.pageYOffset;
  const elementY = 0 - offset;
  const targetY = document.body.scrollHeight - elementY < window.innerHeight
    ? document.body.scrollHeight - window.innerHeight
    : elementY;
  const diff = targetY - startingY;

  const easing = (t) => { // eslint-disable-line
    return t < 0.5
      ? 4 * t * t * t
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; // eslint-disable-line no-mixed-operators
  };
  let start;

  if (!diff) return;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    let percent = Math.min(time / duration, 1);
    percent = easing(percent);

    window.scrollTo(0, startingY + diff * percent); // eslint-disable-line no-mixed-operators

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
};

class FeedContainer extends Component {
  constructor(args) {
    super(args);
    this.socket = io();
    this.handlePostCreatorInputChange = this.handlePostCreatorInputChange.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.refreshTimeline = this.refreshTimeline.bind(this);

    this.state = {
      refreshInterval: null,
    };

    this.socket.on('fetchNewPost', (data) => {
      if (data) {
        this.props.dispatch(showNewPostsAlert());
      }
    });
  }

  componentWillMount() {
    this.props.dispatch(fetchPosts());
    if (!this.state.refreshInterval) {
      const refreshInterval = setInterval(() => {
        this.props.dispatch(refreshTimeStamps());
      }, 60000);
      this.setState({ refreshInterval });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.feed.postCreated === false && nextProps.feed.postCreated === true) {
      this.socket.emit('newPost', null);
      this.props.dispatch(emittedNewPost());
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.refreshInterval);
    this.setState({ refreshInterval: null });
  }


  handlePostCreatorInputChange(event) {
    if (event.target.name === 'post') { this.props.dispatch(updateNewPostText(event.target.value)); }
  }

  refreshTimeline(event) {
    event.preventDefault();
    window.smoothScrollTop(500, 0);
    this.props.dispatch(fetchPosts());
  }

  handleCreatePost(event) {
    event.preventDefault();
    this.props.dispatch(createNewPost());
  }

  handleLogout(event) { // eslint-disable-line class-methods-use-this
    event.preventDefault();
    window.location = '/';
    purgeToken();
  }

  render() {
    return (
      <div className={styles.container}>
        {
          this.props.feed.showNewPostAlert
            ? (
              <div
                className={cn(styles['floating-alert'], 'btn btn-primary')}
                onClick={this.refreshTimeline}
                role={'link'}
                tabIndex={'-1'}
              >
                {'Fetch New Posts ▴'}
              </div>
            )
            : (null)
        }

        <input value={'Log Out'} onClick={this.handleLogout} className={'mtb30 btn btn-primary'} />
        <div>{this.props.feed.error}</div>
        <PostCreator
          name={'post'}
          placeholder={'What do you want to tell the world?'}
          btnText={'Post'}
          handleInputChange={this.handlePostCreatorInputChange}
          createHandler={this.handleCreatePost}
          value={this.props.feed.newPostText}
        />

        {
          this.props.feed.posts.map(({
            username,
            _id: id,
            created_at: createdAt,
            text,
            comments_count: count,
          }) =>
            (<PostItem
              key={id}
              id={id}
              username={username}
              createdAt={createdAt}
              text={text}
              count={count}
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

export default connect(mapStateToProps)(FeedContainer);
