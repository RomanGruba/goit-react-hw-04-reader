import React from 'react';
import PropTypes from 'prop-types';
import styles from './Publication.module.css';

const Publication = ({ items, currentItem }) => (
  <article className={styles.publication}>
    <h2 className={styles.publicationTitle}>{items[currentItem].title}</h2>
    <p className={styles.publicationP}>{items[currentItem].text}</p>
  </article>
);

Publication.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  currentItem: PropTypes.number.isRequired,
};

export default Publication;
