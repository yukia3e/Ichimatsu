import type { FC } from "react";
import HeaderAreaOrganism from "@/components/organisms/HeaderArea";
import { useAuth } from "@/hooks/useAuth";
import useAuthStore from "@/stores/useAuthStore";

type Props = {
  isForTop?: boolean;
};

const HeaderEcosystem: FC<Props> = ({ isForTop }) => {
  const [_isWaitingLoadAuth, _login, logout] = useAuth();
  const provider = useAuthStore((state) => state.provider);
  const isLoggedIn = provider !== null;

  return (
    <HeaderAreaOrganism
      isForTop={isForTop}
      isLoggedIn={isLoggedIn}
      logout={logout}
    />
  );
};

export default HeaderEcosystem;
