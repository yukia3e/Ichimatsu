import type { FC } from "react";
import SectionTitle from "../atoms/SectionTitle";
import IchimatsuMintEcosystem from "../ecosystems/IchimatsuMint";

const MintAreaOrganism: FC = () => {
  return (
    <section className="container flex flex-col mb-20">
      <div className="w-full text-center">
        <SectionTitle>IchimatsuMint</SectionTitle>
      </div>
      <div className="w-full text-center">
        <IchimatsuMintEcosystem />
      </div>
    </section>
  );
};

export default MintAreaOrganism;
