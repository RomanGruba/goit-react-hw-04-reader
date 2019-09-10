import React from 'react';
import PropTypes from 'prop-types';
import styles from './Counter.module.css';

const Counter = ({ currentItem, items }) => (
  <p className={styles.counter}>{`${currentItem + 1}/${items.length}`}</p>
);

Counter.propTypes = {
  currentItem: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Counter;
