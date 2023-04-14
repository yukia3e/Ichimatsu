import type { FC, MouseEventHandler } from "react";
import Button from "@/components/atoms/Button";
import LogoMolecule from "@/components/molecules/Logo";

type Props = {
  isForTop?: boolean;
  isLoggedIn?: boolean;
  logout?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

const HeaderAreaOrganisms: FC<Props> = ({ isForTop, isLoggedIn, logout }) => {
  return (
    <header className="flex flex-wrap items-center justify-between w-full p-2 bg-white drop-shadow">
      <LogoMolecule isForTop={isForTop} isLoggedIn={isLoggedIn} />
      {!isLoggedIn ? <></> : <Button onClick={logout}>Sign Out</Button>}
    </header>
  );
};

export default HeaderAreaOrganisms;
