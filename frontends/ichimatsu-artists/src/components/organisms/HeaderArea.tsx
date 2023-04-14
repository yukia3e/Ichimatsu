import type { FC, MouseEventHandler } from "react";
import Button from "../atoms/Button";
import LogoMolecule from "../molecules/Logo";

type Props = {
  isForTop?: boolean;
  isLoggedIn?: boolean;
  logout?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

const HeaderAreaOrganisms: FC<Props> = ({ isForTop, isLoggedIn, logout }) => {
  return (
    <header className="flex flex-wrap items-center justify-between w-full p-2 bg-white drop-shadow">
      <LogoMolecule isForTop={isForTop} />
      {!isLoggedIn ? <></> : <Button onClick={logout}>ログアウト</Button>}
    </header>
  );
};

export default HeaderAreaOrganisms;
