import { memo } from "react";
import "./spinner.scss";

function Spinner(): JSX.Element {
  return (
    <>
      <div className="spinner" />
    </>
  );
}

export default memo(Spinner);
