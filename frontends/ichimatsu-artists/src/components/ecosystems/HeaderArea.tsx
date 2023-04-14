import type { FC } from "react";
import HeaderAreaOrganism from "@/components/organisms/HeaderArea";

type Props = {
  isForTop?: boolean;
};

const HeaderEcosystem: FC<Props> = ({ isForTop }) => {
  const logout = () => {
    return;
  };
  const isLoggedIn = false;

  return (
    <HeaderAreaOrganism
      isForTop={isForTop}
      isLoggedIn={isLoggedIn}
      logout={logout}
    />
  );
};

export default HeaderEcosystem;
