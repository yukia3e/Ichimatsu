import type { FC } from "react";
import FooterAreaEcosystem from "@/components/ecosystems/FooterArea";
import HeaderAreaEcosystem from "@/components/ecosystems/HeaderArea";

const MintTemplate: FC = () => {
  return (
    <>
      <HeaderAreaEcosystem />
      <main className="container p-4 mx-auto">MintTemplate</main>
      <FooterAreaEcosystem />
    </>
  );
};

export default MintTemplate;
