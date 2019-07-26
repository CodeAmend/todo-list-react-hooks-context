import React from "react";

export default function Flash({ type, ...props }) {
  const elRef = React.useRef();

  React.useEffect(() => {
    window.requestAnimationFrame(() => {
      elRef.current.style["box-shadow"] = "0 0 0 2px red";
      elRef.current.style["transition"] = "none";
      window.requestAnimationFrame(() => {
        elRef.current.style["box-shadow"] = "0 0 0 2px transparent";
        elRef.current.style["transition"] = "all 2s ease";
      });
    });
  });

  return React.createElement(type, { ref: elRef, ...props });
}

