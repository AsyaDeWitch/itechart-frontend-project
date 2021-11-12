import { useEffect } from "react";
import Navbar from "./navbar";

export default function Header(props: {
  title: string;
  userName: string;
  // onSignIn(user: User): void;
  // onSignOut(): void;
  // isLoggedIn: boolean;
}): JSX.Element {
  useEffect(() => {
    document.title = props.title;
  }, []);

  return (
    <div>
      <header>
        <Navbar
          title={props.title}
          userName={props.userName}
          onSignIn={props.onSignIn}
          onSignOut={props.onSignOut}
          isLoggedIn={props.isLoggedIn}
        />
      </header>
    </div>
  );
}
