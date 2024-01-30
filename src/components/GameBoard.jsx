const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = ({onSelectSquare, turns}) => {
    let gameBoard = initialGameBoard

    for(const turn of turns){
        const {rowIndex, colIndex} = turn.square
        gameBoard[rowIndex][colIndex] = turn.player
    }

//   const [gameBoard, setGameBoard] = useState(initialGameBoard);

//   const handleSelectSquare = (rowIndex, colIndex) => {
//     setGameBoard((prev) => {
//       const updatedGameBoard = [...gameBoard.map((innerArr) => [...innerArr])];
//       updatedGameBoard[rowIndex][colIndex] = activePlayer;
//       return updatedGameBoard;
//     });

//     onSelectSquare()
//   };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>onSelectSquare(rowIndex,colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
