import { memo } from "react";
import "./spinner.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedSpinner = memo(function Spinner(): JSX.Element {
  return (
    <>
      <div className="spinner" />
    </>
  );
});

export default MemoizedSpinner;
