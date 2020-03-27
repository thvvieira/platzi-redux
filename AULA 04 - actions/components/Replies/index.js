/* eslint no-underscore-dangle: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import cn from 'classnames';
import ReplyCreator from '../Creator';

import styles from './index.scss';

export default function Replies({ commentId, replies, newReplyText = '', updateNewReply, createNewReply, className }) {
  return (
    <div className={cn(className, 'mtb20')}>
      {
        replies
          ? replies.map(reply => (
            <div key={reply._id} className={cn('ptb10', styles.reply)}>
              <div className={styles.header}>
                <span>
                  <Link to={`/user/${reply.username}`}>
                    {reply.username}
                  </Link>
                </span>
                <span className={styles.separated}>
                  {`${distanceInWordsToNow(new Date(reply.created_at))} ago`}
                </span>
              </div>
              <div className={styles.text}>
                {reply.text}
              </div>
            </div>
          ))
          : null
      }
      <div className={cn('mtb20')}>
        <ReplyCreator
          value={newReplyText}
          btnText={'Reply'}
          name={`reply_${commentId}`}
          placeholder={'Write a reply..'}
          createHandler={event => createNewReply(commentId, newReplyText, event)}
          handleInputChange={event => updateNewReply(commentId, event)}
        />
      </div>
    </div>
  );
}
