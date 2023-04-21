import React from "react";
import { Html } from "@react-three/drei";
import "./Model.css";

const Annotation = (props) => {
  return (
    <Html {...props} distanceFactor={100}>
      <div className="content">{props.children}</div>
    </Html>
  );
};

export default Annotation;
