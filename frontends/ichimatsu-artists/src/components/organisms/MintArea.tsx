import type { FC } from "react";
import SectionTitle from "../atoms/SectionTitle";
import IchimatsuMintEcosystem from "../ecosystems/IchimatsuMint";

const MintAreaOrganism: FC = () => {
  return (
    <section className="container">
      <SectionTitle>IchimatsuMint</SectionTitle>
      <IchimatsuMintEcosystem />
    </section>
  );
};

export default MintAreaOrganism;
