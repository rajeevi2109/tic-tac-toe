import React, {Component, PureComponent} from 'react';
import '../index.css';

export default class Board extends Component {
  render() {
    return (
      <div className="board-container">
        {this.props.children}
      </div>
    )
  }
}