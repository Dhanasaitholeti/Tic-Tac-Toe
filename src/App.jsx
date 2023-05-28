import "./styles.scss";
import { useState } from "react";
import Board from "./components/Board";
import { calculateWinner } from "./winner";
import StatusMessage from "./components/StatusMessage";
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);

  const winners = calculateWinner(squares);

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
      <StatusMessage winners={winners} isXNext={isXNext} squares={squares} />
      <Board squares={squares} handleSquareClikck={handleSquareClikck} />
    </div>
  );
}

export default App;
