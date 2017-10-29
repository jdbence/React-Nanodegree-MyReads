import React, { Component } from 'react';

export default class Card extends Component {
  
  render(){
    const { children } = this.props;
    return (
      <section className="card">
        {children}
      </section>
    );
  }
}