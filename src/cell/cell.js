import React, { Component, PureComponent } from 'react';

export default class Cell extends Component {
  
  cellClicked() {
    this.props.cellClick(this.props.index);
  }
  render() {
    return (
      <div
        style={{
          width: '100px',
          height: '100px',
          border: '1px solid black',
          textAlign: 'center',
          lineHeight: '100px'
        }}
        onClick={this.cellClicked.bind(this)}
        >
        {this.props.children}
      </div>
    );
  }
}
