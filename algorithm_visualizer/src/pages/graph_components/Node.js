import "./Node.css";

export const Node = ({
  row,
  col,
  isFinish,
  isStart,
  isWall,
  mouseIsPressed,
  onMouseDown,
  onMouseEnter,
  onMouseUp
}) => {

  const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}>
    </div>
  );
}