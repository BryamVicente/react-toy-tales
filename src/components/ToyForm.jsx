import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    name: "",
    image: ""
    // likes: 
  }

  onChangeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  localSubmitHandler = (e) => {
    e.preventDefault()
    console.log("submitted", e.target[0].value)
    this.props.submitHandler({name: e.target[0].value, image: e.target[1].value})
    this.setState({ name: "", image: ""})
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.localSubmitHandler} className="add-toy-form">
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" value={this.state.name} onChange={this.onChangeHandler} />
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" value={this.state.image} onChange={this.onChangeHandler} />
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
