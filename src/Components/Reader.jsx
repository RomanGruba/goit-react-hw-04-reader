import React, { Component } from 'react';
import styles from './Reader.module.css';
import items from './publications.json';
import Publication from './Publication/Publication';
import Counter from './Counter/Counter';
import Controls from './Controls/Controls';

export default class Reader extends Component {
  constructor(items) {
    super(items);
    this.state = {
      publicationItem: 0,
      prevBtnDisabled: true,
      nextBtnDisabled: false,
    };
  }

  handleIncrement = () => {
    const beforeLast = this.props.items.length - 2;
    this.setState(prevState => {
      const nextBtnD = prevState.publicationItem === beforeLast;

      let prevBtnD = false;
      if (this.prevBtnDisabled && prevState.publicationItem === 1) {
        prevBtnD = false;
      }

      return {
        publicationItem: prevState.publicationItem + 1,
        prevBtnDisabled: prevBtnD,
        nextBtnDisabled: nextBtnD,
      };
    });
    this.props.history.push({
      ...this.props.location,
      search: `item=${this.state.publicationItem + 2}`,
    });
  };

  handleDecrement = () => {
    const beforeLast = this.props.items.length - 2;
    this.setState(prevState => {
      const prevBtnD = prevState.publicationItem === 1;

      let nextBtnD = false;
      if (this.nextBtnDisabled && prevState.publicationItem === beforeLast) {
        nextBtnD = false;
      }
      return {
        publicationItem: prevState.publicationItem - 1,
        prevBtnDisabled: prevBtnD,
        nextBtnDisabled: nextBtnD,
      };
    });
  };

  render() {
    const currentItem = this.state.publicationItem;
    const { prevBtnDisabled, nextBtnDisabled } = this.state;
    return (
      <div className={styles.reader}>
        <Publication currentItem={currentItem} items={items} />
        <Counter currentItem={currentItem} items={items} />
        <Controls
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          prevBtnDisabled={prevBtnDisabled}
          nextBtnDisabled={nextBtnDisabled}
        />
      </div>
    );
  }
}
