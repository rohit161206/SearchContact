import React from "react";

function Button({ Click, className, name, imageSrc, altText }) {
  return (
    <button onClick={Click} className={className}>
      {imageSrc && <img src={imageSrc} alt={altText || "Button Icon"} className="button-icon" />}
      {name}
    </button>
  );
}

export default Button;
