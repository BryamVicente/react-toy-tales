import React, { Component } from 'react';

class ToyCard extends Component {

  localClicker = (e) => {
    this.props.clickHandler(this.props.toy)
  }

  localClickerLiker = (e) => {
    this.props.likesCounter(this.props.toy)
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.name} className="toy-avatar" />
        <p>{this.props.toy.likes} Likes </p>
        <button onClick={this.localClickerLiker} className="like-btn">Like {'💚'}</button>
        <button onClick={this.localClicker} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }
}

export default ToyCard;
