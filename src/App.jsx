import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {X: 'Player 1', O: 'Player 2'}

const INITIAL_GAME_BOARD = [
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

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArr=>[...innerArr])]

  for(const turn of gameTurns){
      const {rowIndex, colIndex} = turn.square
      gameBoard[rowIndex][colIndex] = turn.player
  }

  return gameBoard
}

function deriveWinner(gameBoard, players) {
  let winner

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol]
    }
  }
  return winner
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = deriveActivePlayer(gameTurns)
  let gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, players)
  const isDraw = gameTurns.length === 9 && !winner

  const handleSelectedSquare = (rowIndex, colIndex)=>{
    setGameTurns(prev=>{
      const currentPlayer = deriveActivePlayer(prev)
      const updatedTurns = [ {square: {rowIndex, colIndex}, player: currentPlayer}, ...gameTurns]

      return updatedTurns
    })
  }
  
  const handleRestart = ()=>{
    setGameTurns([])
  }

  const handlePlayerNameChange = (symbol, newName)=>{
    setPlayers(prev=> ({...prev, [symbol]: newName}))
  }

  return (
    <main>
      <div id="game-container">
        {/* players */}
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {/* game board */}
        {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectedSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
