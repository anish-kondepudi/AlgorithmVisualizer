import { forwardRef } from "react"
import "./Node.css";

export const Node = forwardRef((props, ref) => {
  const {row, col} = props;

  return (
    <div className="wrapper">
      <div
        ref={ref}
        id={`node-${row}-${col}`}
        className={'node-empty'}
      />
    </div>
  );
  
});