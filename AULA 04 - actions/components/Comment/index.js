import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import Replies from '../Replies';

import styles from './index.scss';

const Comment = ({ username, id, createdAt, text, handleReplyRequest,
  replies, newReplyText, updateNewReply, createNewReply, count }) => {
  const userPermalink = `/user/${username}`;
  return (
    <div className={cn('ptb10', styles.item)}>
      <div className={styles.header}>
        <span>
          <Link to={userPermalink}>
            {username}
          </Link>
        </span>
        <span className={styles.separated}>
          {`${distanceInWordsToNow(new Date(createdAt))} ago`}
        </span>
        <span className={styles.separated}>
          <a onClick={event => handleReplyRequest(id, event)} role={'link'} tabIndex={'-1'}>{`View Replies (${count || 0})`}</a>
        </span>
      </div>
      <div className={cn('ptb10', styles.text)}>
        {text}
      </div>
      { replies
        ? (
          <Replies
            commentId={id}
            newReplyText={newReplyText}
            updateNewReply={updateNewReply}
            createNewReply={createNewReply}
            replies={replies}
            className={styles.replies}
          />
        )
        : null
      }

    </div>
  );
};

export default Comment;
