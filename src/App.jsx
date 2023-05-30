import "./styles.scss";
import { useState } from "react";
import Board from "./components/Board";
import { calculateWinner } from "./winner";
import StatusMessage from "./components/StatusMessage";
import History from "./components/History";

function App() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), isXNext: false },
  ]);

  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const winners = calculateWinner(gamingBoard.squares);

  const handleSquareClikck = (pos) => {
    if (gamingBoard.squares[pos] || winners) return;

    setHistory((currentHistory) => {
      const isTraversing = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : history[history.length - 1];

      const nextSquareState = lastGamingState.squares.map(
        (Squareval, position) => {
          if (pos === position) return lastGamingState.isXNext ? "X" : "O";
          return Squareval;
        }
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return base.concat({
        squares: nextSquareState,
        isXNext: !lastGamingState.isXNext,
      });
    });

    setCurrentMove((move) => move + 1);
  };

  const moveTo = (move) => {
    setCurrentMove(move);
  };

  return (
    <div className="app">
      <StatusMessage winners={winners} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleSquareClikck={handleSquareClikck}
      />
      <h2>current game history</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
}

export default App;
