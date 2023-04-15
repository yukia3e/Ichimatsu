import type { FC } from "react";
import Title from "@/components/atoms/Title";
import FooterAreaEcosystem from "@/components/ecosystems/FooterArea";
import HeaderAreaEcosystem from "@/components/ecosystems/HeaderArea";
import MintAreaEcosystem from "@/components/ecosystems/MintArea";

const MintTemplate: FC = () => {
  return (
    <>
      <HeaderAreaEcosystem />
      <main className="container p-4 mx-auto">
        <Title>Mint</Title>
        <MintAreaEcosystem />
      </main>
      <FooterAreaEcosystem />
    </>
  );
};

export default MintTemplate;
