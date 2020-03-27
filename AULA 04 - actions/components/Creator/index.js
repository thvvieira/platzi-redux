import React from 'react';
import cn from 'classnames';

import styles from './index.scss';

const Creator = ({ btnText, name, value, handleInputChange, createHandler, placeholder }) => (
  <form className={cn('card', styles.container)} onSubmit={createHandler}>
    <textarea
      type={'text'}
      name={name}
      className={styles['post-text']}
      placeholder={placeholder}
      onChange={handleInputChange}
      value={value}
    />
    <input type={'submit'} value={btnText} className={'btn btn-primary mtb10'} />
  </form>
);

export default Creator;
