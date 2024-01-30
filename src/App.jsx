import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";

function App() {
  const [activePlayer, setActivePlayer] = useState('X')
  const [gameTurns, setGameTurns] = useState([])

  const handleSelectedSquare = (rowIndex, colIndex)=>{
    setActivePlayer((prev)=> prev === 'X' ? 'O' : 'X')
    setGameTurns(prev=>{
      let currentPlayer = 'X'
      if(prev.length>0 && prev[0].player === 'X'){
        currentPlayer = 'O'
      }

      const updatedTurns = [ {square: {rowIndex, colIndex}, player: currentPlayer}, ...gameTurns]

      return updatedTurns
    })
  } 

  return (
    <main>
      <div id="game-container">
        {/* players */}
        <ol id="players" className="highlight-player">
          <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'}/>
          <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'}/>
        </ol>
        {/* game board */}
        <GameBoard onSelectSquare={handleSelectedSquare} turns={gameTurns}/>
      </div>
    </main>
  );
}

export default App;
