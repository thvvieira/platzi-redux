import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import styles from './index.scss';

export default function PostItem(
  { username, createdAt, text, id, count = 0 },
) {
  const postPermalink = `/post/${id}`;
  const userPermalink = `/user/${username}`;
  return (
    <div className={cn('card mtb20', styles.item)}>
      <div className={styles.header}>
        <Link to={userPermalink}>
          {username}
        </Link>
        <span>
          {` | ${distanceInWordsToNow(new Date(createdAt))} ago`}
        </span>
      </div>
      <div className={cn('mtb40', styles.text)}>
        {text}
      </div>
      {
        id
          ? (
            <div className={styles['comments-cta']}>
              <Link to={postPermalink}>{`View Comments (${count})`}</Link>
            </div>
          )
          : (null)
      }
    </div>
  );
}
