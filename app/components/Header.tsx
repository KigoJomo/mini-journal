import { FC } from "react";
import SignIn from "./sign-in";

const Header: FC = () => {
  return (
    <header className="w-full flex justify-between sticky top-0">
      <h1>My App Header</h1>
      <SignIn />
    </header>
  );
};

export default Header;