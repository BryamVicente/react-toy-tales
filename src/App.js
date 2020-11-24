import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/toys")
    .then(r => r.json())
    .then(data => this.setState({ toys: data}))
  }

  // POST Request 
  submitHandler = (obj) => {
    
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: obj.name,
        image: obj.image,
        likes: 0
      })
    })
    .then(r => r.json())
    .then(newToy => this.setState({ toys: [...this.state.toys, newToy]}))
  }

  /// DELETE Request 
  clickHandler = (deletedObj) => {
  
    fetch(`http://localhost:3000/toys/${deletedObj.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      let copiedArray = [...this.state.toys]
      let list = copiedArray.filter(toy_obj => toy_obj.id !== deletedObj.id)
      this.setState({ toys: list})
    })
  }

  likesCounter = (likeObj) => {
    const updatedToys = [...this.state.toys]
    const oldToy = updatedToys.find(element => element.id === likeObj.id)

    fetch(`http://localhost:3000/toys/${likeObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({likes: ++oldToy.likes })
    })
    .then(r => r.json())
    .then(newLikes => {
      let copiedArray = [...this.state.toys]
      this.setState({ toys: copiedArray.filter(toy => (toy.id === likeObj.id) ? newLikes : toy)})
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm submitHandler={this.submitHandler}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} clickHandler={this.clickHandler} likesCounter={this.likesCounter}/>
      </>
    );
  }
}

export default App;
