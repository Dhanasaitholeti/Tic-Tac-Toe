import "./styles.scss";
import { useState } from "react";
import Board from "./components/Board";
import { calculateWinner } from "./winner";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);

  const winners = calculateWinner(squares);
  const nextPlayer = isXNext ? "X" : "O";
  const statusMsg = winners
    ? `winner is ${winners}`
    : `Next player is ${nextPlayer}`;

  console.log(winners);

  const handleSquareClikck = (pos) => {
    if (squares[pos]) return;

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
      <h1>{statusMsg}</h1>
      <Board squares={squares} handleSquareClikck={handleSquareClikck} />
    </div>
  );
}

export default App;
