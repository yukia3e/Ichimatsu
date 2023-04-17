import type { FC } from "react";
import FooterAreaOrganism from "@/components/organisms/FooterArea";
import useAuthStore from "@/stores/useAuthStore";

const FooterAreaEcosystem: FC = () => {
  const provider = useAuthStore((state) => state.provider);
  const isLoggedIn = provider !== null;

  return <FooterAreaOrganism isLoggedIn={isLoggedIn} />;
};

export default FooterAreaEcosystem;
