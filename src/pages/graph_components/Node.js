import { forwardRef } from "react"
import "./Node.scss";

export const Node = forwardRef((props, ref) => {
  const {row, col, type} = props;

  return (
    <div className="wrapper">
      <div
        ref={ref}
        id={`node-${row}-${col}`}
        className={type}
      >
        <div
          
        >

        </div>
      </div>
    </div>
  );
  
});