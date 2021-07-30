import "./Node.css";

export const Node = ({row,col,id}) => {

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node`}>
    </div>
  );
}