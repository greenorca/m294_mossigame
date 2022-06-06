import "./Board.css"
import React from "react"
import Board from "./Board"

class Game extends React.Component {
  constructor() {
		super()
		this.state = {
			time: new Date(),
    }
  }

  componentDidMount() {
		setInterval(()=>{
      this.setState({
        time: new Date(),
      })
    },1000)
	}

  render() {
    return (
      <div className="game">
        <h1>Game</h1>
          <Board />
        <h2>{
          this.state.time.getHours()+":"
          +this.state.time.getMinutes()+":"
          +this.state.time.getSeconds() }
        </h2>
      </div>
    )
  }

}

export default Game
