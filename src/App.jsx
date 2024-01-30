import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'
  if(gameTurns.length>0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O'
  }
  return currentPlayer
}

function App() {
  //const [activePlayer, setActivePlayer] = useState('X')
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = deriveActivePlayer(gameTurns)

  let gameBoard = initialGameBoard

  for(const turn of gameTurns){
      const {rowIndex, colIndex} = turn.square
      gameBoard[rowIndex][colIndex] = turn.player
  }

  let winner

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = firstSquareSymbol
    }
  }

  const handleSelectedSquare = (rowIndex, colIndex)=>{
    setGameTurns(prev=>{
      
      const currentPlayer = deriveActivePlayer(prev)

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
        {winner && <p>You won, {winner}!</p>}
        <GameBoard onSelectSquare={handleSelectedSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
