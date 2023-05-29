import "./styles.scss";
import { useState } from "react";
import Board from "./components/Board";
import { calculateWinner } from "./winner";
import StatusMessage from "./components/StatusMessage";
function App() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), isXNext: false },
  ]);

  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const winners = calculateWinner(gamingBoard.squares);

  const handleSquareClikck = (pos) => {
    if (squares[pos] || winners) return;

    setSquares((currentSquares) => {
      return currentSquares.map((Squareval, position) => {
        if (pos === position) return isXNext ? "X" : "O";

        return Squareval;
      });
    });
    setIsXNext(!isXNext);
  };
  return (
    <div className="app">
      <StatusMessage winners={winners} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleSquareClikck={handleSquareClikck}
      />
    </div>
  );
}

export default App;
