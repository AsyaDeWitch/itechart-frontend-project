import { memo } from "react";
import styles from "styled-components";

const About = styles.div`
  padding-bottom: 37.9vw;
  margin: 1.5vw;
  font-size: 1.1vw;
`;

const MemoizedAbout = memo(
  (): JSX.Element => (
    <About>
      <h2>About page</h2>
    </About>
  )
);

MemoizedAbout.displayName = "About";

export default MemoizedAbout;
