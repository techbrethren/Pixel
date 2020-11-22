import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

interface SpinnerProps {
  className: string;
}

export default function Spinner(props: SpinnerProps) {
  return (
    <Loader
      className={props.className}
      type="Circles"
      color="#2a6b9c"
      height={250}
      width={250}
      timeout={0}
    />
  );
}
