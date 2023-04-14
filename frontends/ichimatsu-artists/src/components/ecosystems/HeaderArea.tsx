import type { FC } from "react";
import HeaderAreaOrganism from "@/components/organisms/HeaderArea";
import { useSafeAuth } from "@/hooks/useSafeAuth";
import useSafeAuthStore from "@/stores/useSafeAuthStore";

type Props = {
  isForTop?: boolean;
};

const HeaderEcosystem: FC<Props> = ({ isForTop }) => {
  const [_, logout] = useSafeAuth();
  const provider = useSafeAuthStore((state) => state.provider);
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
