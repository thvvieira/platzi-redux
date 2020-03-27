import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './index.scss';

import PostItem from '../../components/PostItem';
import Comment from '../../components/Comment';
import CommentCreator from '../../components/Creator';

import { updateNewCommentText, createNewComment,
  fetchPost, fetchComments, fetchReplies, updateNewReply, createNewReply,
} from '../../actions/postActions';

class PostContainer extends Component {
  constructor(args) {
    super(args);

    this.handleCommentCreatorInputChange = this.handleCommentCreatorInputChange.bind(this);
    this.handleCreateComment = this.handleCreateComment.bind(this);
    this.handleReplyRequest = this.handleReplyRequest.bind(this);
    this.updateNewReply = this.updateNewReply.bind(this);
    this.createNewReply = this.createNewReply.bind(this);
  }
  componentWillMount() {
    const { post_id: postId } = this.props.match.params;
    this.props.dispatch(fetchPost(postId));
    this.props.dispatch(fetchComments(postId));
  }

  handleCommentCreatorInputChange(event) {
    if (event.target.name === 'comment') { this.props.dispatch(updateNewCommentText(event.target.value)); }
  }

  handleCreateComment(event) {
    const { post_id: postId } = this.props.match.params;
    event.preventDefault();
    this.props.dispatch(createNewComment(postId));
  }

  handleReplyRequest(commentId, event) {
    event.preventDefault();
    this.props.dispatch(fetchReplies(commentId));
  }

  updateNewReply(commentId, event) {
    if (event && event.target && event.target.value) {
      this.props.dispatch(updateNewReply(commentId, event.target.value));
    }
  }

  createNewReply(commentId, text, event) {
    event.preventDefault();
    this.props.dispatch(createNewReply(commentId, text));
  }

  render() {
    const { post } = this.props.post;
    return (
      <div className={styles.container}>

        <Link to="/" className={cn('mtb20 back')}>{'Go Back'}</Link>

        <div>{this.props.post.error}</div>

        <PostItem
          key={post.id}
          username={post.username}
          createdAt={post.created_at}
          text={post.text}
        />

        <div className={styles.comments}>
          {
            this.props.post.comments
              .map(({
                username,
                _id: id,
                created_at: createdAt,
                text, replies,
                newReplyText,
                replies_count: count,
              }) => (
                <Comment
                  key={id}
                  id={id}
                  count={count}
                  username={username}
                  createdAt={createdAt}
                  text={text}
                  handleReplyRequest={this.handleReplyRequest}
                  replies={replies}
                  newReplyText={newReplyText}
                  updateNewReply={this.updateNewReply}
                  createNewReply={this.createNewReply}
                />
              ))
          }
          <div className={cn('mtb20')}>
            <CommentCreator
              name={'comment'}
              placeholder={'Comment on this thread'}
              btnText={'Comment'}
              handleInputChange={this.handleCommentCreatorInputChange}
              createHandler={this.handleCreateComment}
              value={this.props.post.newCommentText}
            />
          </div>
        </div>

      </div>
    );
  }
}
const mapStateToProps = state => ({
  post: state.Post,
});

export default connect(mapStateToProps)(PostContainer);
