import type { FC } from "react";
import Title from "@/components/atoms/Title";
import IchimatsuMintEcosystem from "../ecosystems/IchimatsuMint";

const MintOrganism: FC = () => {
  return (
    <section className="container">
      <Title>Ichimatsu Mint</Title>
      <IchimatsuMintEcosystem />
    </section>
  );
};

export default MintOrganism;
