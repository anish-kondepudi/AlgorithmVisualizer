import React, {Component} from 'react';
import "./Node.css";

export default class Node extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type
    };
  }

  render() {
    const {
      row,
      col
    } = this.props;

    return (
      <div
        id={`${row}-${col}`}
        className={`node node-${this.state.type}`}
      />
    );
  }
}