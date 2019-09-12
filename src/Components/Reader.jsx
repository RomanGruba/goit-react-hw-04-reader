import React, { Component } from 'react';
import queryString from 'query-string';
import styles from './Reader.module.css';
import items from './publications.json';
import Publication from './Publication/Publication';
import Counter from './Counter/Counter';
import Controls from './Controls/Controls';

const getItemFromLocation = location => queryString.parse(location.search).item;

export default class Reader extends Component {
  state = {
    publicationItem: 0,
    prevBtnDisabled: false,
    nextBtnDisabled: false,
  };

  componentDidMount() {
    if (this.state.publicationItem === 0) {
      this.setState({ prevBtnDisabled: true });
      this.props.history.push({
        ...this.props.location,
        search: `item=1`,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const currentItemFromLocation = getItemFromLocation(this.props.location);
    const previousItemFromLocation = getItemFromLocation(prevProps.location);

    if (currentItemFromLocation !== previousItemFromLocation) {
      this.setState({ publicationItem: currentItemFromLocation - 1 });
    }
    if (previousItemFromLocation > items.length) {
      this.setState({ prevBtnDisabled: true });
    }

    if (getItemFromLocation(this.props.location) > items.length) {
      this.props.history.replace({
        search: `item=1`,
      });
      this.setState({ publicationItem: 0 });
    }

    if (prevState.publicationItem === 1 && this.state.publicationItem === 0) {
      this.setState({ prevBtnDisabled: true });
    }
    if (prevState.publicationItem === 1 && this.state.publicationItem === 0) {
      this.setState({ prevBtnDisabled: true });
    }
    if (
      prevState.publicationItem === items.length &&
      this.state.publicationItem < items.length
    ) {
      this.setState({ nextBtnDisabled: false });
    }
  }

  handleIncrement = () => {
    const beforeLast = items.length - 2;
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
    const beforeLast = items.length - 2;
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
    this.props.history.push({
      ...this.props.location,
      search: `item=${this.state.publicationItem}`,
    });
  };

  render() {
    const { prevBtnDisabled, nextBtnDisabled } = this.state;
    const { location } = this.props;
    let currentItemFromLocation = 1;
    if (getItemFromLocation(location)) {
      currentItemFromLocation = getItemFromLocation(location);
    }
    if (getItemFromLocation(location) > items.length) {
      currentItemFromLocation = 1;
    }
    return (
      <div className={styles.reader}>
        <Publication currentItem={+currentItemFromLocation - 1} items={items} />
        <Counter currentItem={+currentItemFromLocation - 1} items={items} />
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
