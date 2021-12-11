import { memo, useEffect } from "react";
import Navbar from "./elements/navbar";

const MemoizedHeader = memo((props: { title: string }): JSX.Element => {
  useEffect(() => {
    document.title = props.title;
  }, []);

  return (
    <div>
      <header>
        <Navbar title={props.title} />
      </header>
    </div>
  );
});

MemoizedHeader.displayName = "Header";

export default MemoizedHeader;
