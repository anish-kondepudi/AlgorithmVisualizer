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
      col,
      onMouseDown,
      onMouseEnter,
      onMouseUp
    } = this.props;

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node node-${this.state.type}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}