import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

const cx = classNames.bind(styles);

const Controls = ({
  onIncrement,
  onDecrement,
  prevBtnDisabled,
  nextBtnDisabled,
}) => (
  <section className={styles.controls}>
    <button
      type="button"
      onClick={onDecrement}
      className={cx({
        button: true,
        buttonDisabled: prevBtnDisabled === true,
      })}
    >
      Назад
    </button>
    <button
      type="button"
      className={cx({
        button: true,
        buttonDisabled: nextBtnDisabled === true,
      })}
      onClick={onIncrement}
    >
      Вперед
    </button>
  </section>
);

Controls.propTypes = {
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  prevBtnDisabled: PropTypes.bool.isRequired,
  nextBtnDisabled: PropTypes.bool.isRequired,
};

export default Controls;
