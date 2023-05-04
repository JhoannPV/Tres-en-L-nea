import Square from "./Square";
import axios from "axios";

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  let dateHoy = new Date();
  let dateDia = dateHoy.getDate();
  let dateMes = dateHoy.getMonth() + 1;
  let dateAño = dateHoy.getFullYear();
  let dateHours = dateHoy.getHours();
  let dateMinutes = dateHoy.getMinutes();
  let dateSeconds = dateHoy.getSeconds();
  let dateTime;
  if (dateHours > 12) {
    if (dateHours === 13) {
      dateHours = 1;
    }
    if (dateHours === 14) {
      dateHours = 2;
    }
    if (dateHours === 15) {
      dateHours = 3;
    }
    if (dateHours === 16) {
      dateHours = 4;
    }
    if (dateHours === 17) {
      dateHours = 5;
    }
    if (dateHours === 18) {
      dateHours = 6;
    }
    if (dateHours === 19) {
      dateHours = 7;
    }
    if (dateHours === 20) {
      dateHours = 8;
    }
    if (dateHours === 21) {
      dateHours = 9;
    }
    if (dateHours === 22) {
      dateHours = 10;
    }
    if (dateHours === 23) {
      dateHours = 11;
    }
    if (dateHours === 24) {
      dateHours = 12;
    }
    dateTime = `${dateHours}:${dateMinutes}:${dateSeconds} p. m.`;
  } else {
    dateTime = `${dateHours}:${dateMinutes}:${dateSeconds} a. m.`;
  }
  let dateHoyModified = `${dateDia}/${dateMes}/${dateAño}`;
  let fechaActualModified = `${dateHoyModified} a las ${dateTime}`;

  console.log(dateHoyModified);
  console.log(dateTime);
  console.log(fechaActualModified);

  const winner = calculateWinner(squares);
  const empate = calcularEmpate(squares, winner);
  let status;
  if (winner) {
    status = "Ganador: " + winner.winner;
    const url = "https://64399062bd3623f1b9a3051a.mockapi.io/winners";
    const data = {
      createdAt: fechaActualModified,
      name: winner.winner,
      avatar: winner.winner,
    };
    axios.post(url, data);
  } else {
    status = "Siguiente Jugador: " + (xIsNext ? "X" : "O");
  }
  if (empate) {
    status = "Empate";
  }

  const squareColors = ["square", "square2"];
  let colorButton;

  function cambiarColor(i) {
    if (winner) {
      colorButton = winner.line;
      const [a, b, c] = colorButton;
      if (i === a || i === b || i === c) {
        return squareColors[1];
      } else {
        return squareColors[0];
      }
    } else {
      return squareColors[0];
    }
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          color={cambiarColor(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          color={cambiarColor(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          color={cambiarColor(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          color={cambiarColor(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          color={cambiarColor(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          color={cambiarColor(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          color={cambiarColor(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          color={cambiarColor(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          color={cambiarColor(8)}
        />
      </div>
    </>
  );
}
function calcularEmpate(squares, winner) {
  let arreglo = squares.slice();
  let numMoves = arreglo
    .map((el) => (el === "X" || el === "O" ? 1 : 0))
    .reduce((el, item) => el + item, 0);
  if (numMoves === 8) {
    let copiaArreglo = arreglo.map((el) => (el === null ? "X" : el));
    const winner2 = calculateWinner(copiaArreglo);
    if (!winner2) {
      return true;
    } else {
      return false;
    }
  }
  if (numMoves === 9 && !winner) {
    return true;
  } else {
    return false;
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
}

export default Board;
