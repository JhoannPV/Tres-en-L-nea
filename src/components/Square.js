function Square({value, onSquareClick, color}){
  return <button className={color} onClick={onSquareClick}>{value}</button>;
}

export default Square;