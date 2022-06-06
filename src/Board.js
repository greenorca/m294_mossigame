import "./Board.css"
import React from "react"

class Mossi extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      x : props.x,
      y : props.y,
      click: props.click,
      age: Date.now()
    }
  }
  render(){
    const style = {top: this.state.y, left: this.state.x}
    return (
      <img className="mossi" src="img/mosquito.png" alt="" style={style} onClick={this.state.click} age={this.state.age}/>
    )
  }
}

class Board extends React.Component {
  constructor(){
    super()
    this.state = {
      mossis: [],
      score: 0,
      level: 0,
      is_running: false
    }
    /* das ist biz wüest... eigene Funktionen müssen "angemeldet" werden, damit sie auf this zugreifen können */
    this.mossiCatched = this.mossiCatched.bind(this)
    this.removeOldMossis = this.removeOldMossis.bind(this)
    this.generateRandomMossi = this.generateRandomMossi.bind(this)
  }

  mossiCatched(event){
    this.setState({
      score: this.state.score+1,
    })
    event.target.age=0
    event.target.src="img/mosquito_dead.pnp"
    console.log(this.state.score)
  }

  generateRandomMossi(){
    if (Math.random()>0.8){
      this.state.mossis.push(
        < Mossi x={ Math.random()* 500 } y={ Math.random()*400 } click={ this.mossiCatched } age={Date.now()} key={Date.now()}/>
    )}
  }

  removeOldMossis(){
    this.setState({
      mossis : this.state.mossis.filter(
        function(m){
          return Date.now()-m.props.age < this.state.maxAge
        }
      )
    })
  }

  componentDidMount() {
    if (this.state.is_running===false){
  		setInterval(()=>{
        this.generateRandomMossi()
        this.removeOldMossis()
      },
        500)
      this.setState({
        is_running: true
      })
    }
	}

  render() {
    return (
      <div>
        <div id="board">
           <React.Fragment>
            { this.state.mossis }
          </React.Fragment>
        </div>
        <div className="state">
          <div className="score">Score: {this.state.score}</div>
        </div>
      </div>

    )
  }
}

export default Board
