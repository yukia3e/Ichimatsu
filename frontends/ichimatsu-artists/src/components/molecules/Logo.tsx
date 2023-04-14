import type { FC } from "react";
import Link from "next/link";
import Logo from "@/components/atoms/Logo";

type Props = {
  isForTop?: boolean;
  isLoggedIn?: boolean;
};

const LogoMolecule: FC<Props> = ({ isForTop, isLoggedIn }) => {
  return isForTop ? (
    <h1>
      <Logo />
    </h1>
  ) : isLoggedIn ? (
    <Link href="/dashboard">
      <Logo />
    </Link>
  ) : (
    <Link href="/">
      <Logo />
    </Link>
  );
};

export default LogoMolecule;
