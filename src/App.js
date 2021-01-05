import React from 'react';
import './App.css';

class App extends React.Component {
 constructor(){
   super()

   this.state = {
     topText: "",
     bottomText: "",
     defImg: "https://i.imgflip.com/1ur9b0.jpg",
     imagesGen: []
   }
   this.handleChange = this.handleChange.bind(this)
   this.handleSubmit = this.handleSubmit.bind(this)
 }

 componentDidMount(){
   fetch('https://api.imgflip.com/get_memes')
   .then(response=> response.json())
   .then(response => {
     const {memes} = response.data
     this.setState({
      imagesGen: memes
     })
   })
 }


 handleChange(event){
  const {name,value} = event.target
  this.setState({
    [name]: value
  })
 }

handleSubmit(event){
  event.preventDefault()
  const randNum = Math.floor(Math.random() * this.state.imagesGen.length)
  const randImgGen = this.state.imagesGen[randNum].url
  this.setState({
    defImg: randImgGen
  })
}

 render(){
   return (
     <div>
      <div>
        <form onSubmit={this.handleSubmit} className = "header">
          <input 
          type = "text"
          placeholder = "Top Text"
          name = "topText"
          onChange = {this.handleChange}
          value = {this.state.topText}
          />
          <input 
          type = "text"
          placeholder = "Bottom Text"
          name = "bottomText"
          onChange = {this.handleChange}
          value = {this.state.bottomText}
          />
          <button>Generate</button>
        </form>
      </div>
            <div className="contain">
              <img src= {this.state.defImg} alt="tester" />
            <div className="text">
            <h2 className="top">{this.state.topText}</h2>
            <h2 className="bottom">{this.state.bottomText}</h2>
            </div>
            </div>
      </div>
   )
 }

}

export default App;
