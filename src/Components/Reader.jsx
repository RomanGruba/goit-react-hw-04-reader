import React, { Component } from 'react';
import queryString from 'query-string';
import styles from './Reader.module.css';
import items from './publications.json';
import Publication from './Publication/Publication';
import Counter from './Counter/Counter';
import Controls from './Controls/Controls';

const getItemFromLocation = location => queryString.parse(location.search).item;

export default class Reader extends Component {
  constructor(items) {
    super(items);
    this.state = {
      publicationItem: 0,
      prevBtnDisabled: false,
      nextBtnDisabled: false,
    };
  }

  componentDidMount() {
    const currentItemFromLocation = getItemFromLocation(this.props.location);
    if (currentItemFromLocation === 1) {
      this.setState({ prevBtnDisabled: true });

      this.props.history.push({
        ...this.props.location,
        search: `item=${this.state.publicationItem + 2}`,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.publicationItem);
    console.log(prevProps.location !== this.props.location);
    console.log(prevProps.location);
    console.log(this.props.location);
    // if (prevProps !== this.props) {
    //   this.props.history.push({
    //     ...this.props.location,
    //     search: `item=${this.state.publicationItem}`,
    //   });
    // }
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
    this.props.history.push({
      ...this.props.location,
      search: `item=${this.state.publicationItem}`,
    });
  };

  render() {
    // const currentItem = this.state.publicationItem;
    const { prevBtnDisabled, nextBtnDisabled } = this.state;
    const { location } = this.props;
    const currentItemFromLocation = getItemFromLocation(location);
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
