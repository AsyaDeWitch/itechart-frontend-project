import { memo } from "react";
import "./about.scss";

const MemoizedAbout = memo(
  (): JSX.Element => (
    <div className="about">
      <h2>About page</h2>
    </div>
  )
);

MemoizedAbout.displayName = "About";

export default MemoizedAbout;
