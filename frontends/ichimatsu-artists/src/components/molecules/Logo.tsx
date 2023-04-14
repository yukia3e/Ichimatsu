import type { FC } from "react";
import Link from "next/link";
import Logo from "@/components/atoms/Logo";

type Props = {
  isForTop?: boolean;
};

const LogoMolecule: FC<Props> = ({ isForTop }) => {
  return isForTop ? (
    <h1>
      <Logo />
    </h1>
  ) : (
    <Link href="/">
      <Logo />
    </Link>
  );
};

export default LogoMolecule;
