import { memo } from "react";
import "./spinner.scss";

const MemoizedSpinner = memo(
  (): JSX.Element => (
    <>
      <div className="spinner" />
    </>
  )
);

MemoizedSpinner.displayName = "Spinner";

export default MemoizedSpinner;
