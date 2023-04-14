import type { FC } from "react";
import HeroAreaOrganism from "@/components/organisms/HeroArea";

const HeroAreaEcosystem: FC = () => {
  const isLoggedIn = false;

  return <HeroAreaOrganism isLoggedIn={isLoggedIn} />;
};

export default HeroAreaEcosystem;
