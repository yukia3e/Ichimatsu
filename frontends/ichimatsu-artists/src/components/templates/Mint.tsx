import type { FC } from "react";
import Title from "@/components/atoms/Title";
import FooterAreaEcosystem from "@/components/ecosystems/FooterArea";
import HeaderAreaEcosystem from "@/components/ecosystems/HeaderArea";
import MintEcosystem from "@/components/ecosystems/Mint";

const MintTemplate: FC = () => {
  return (
    <>
      <HeaderAreaEcosystem />
      <main className="container p-4 mx-auto">
        <Title>MintTemplate</Title>
        <MintEcosystem />
      </main>
      <FooterAreaEcosystem />
    </>
  );
};

export default MintTemplate;
