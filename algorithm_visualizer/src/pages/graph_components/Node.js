import "./Node.css";

export const Node = ({key,row,col}) => {

  return (
    <div
    	key={key}
        id={`node-${row}-${col}`}
        className={`node`}>
    </div>
  );
}

// className={`node ${extraClassName}`}