import React, {Component} from 'react';
import "./Node.css";

export default class Node extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type
    };

    this.dv = Infinity;
    this.known = false;
    this.pv = null;
    this.row = this.props.row;
    this.col = this.props.col;
  }

  reset() {
    this.dv = Infinity;
    this.known = false;
    this.pv = null;
  }

  render() {
    return (
      <div
        id={`node-${this.row}-${this.col}`}
        className={`node node-${this.state.type}`}
      />
    );
  }
}