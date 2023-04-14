import type { FC } from "react";
import FooterAreaEcosystem from "@/components/ecosystems/FooterArea";
import HeaderAreaEcosystem from "@/components/ecosystems/HeaderArea";
import HeroAreaEcosystem from "@/components/ecosystems/HeroArea";

const IndexTemplate: FC = () => {
  return (
    <>
      <HeaderAreaEcosystem isForTop={true} />
      <main className="container p-4 mx-auto">
        <HeroAreaEcosystem />
        XXXX
      </main>
      <FooterAreaEcosystem />
    </>
  );
};

export default IndexTemplate;
