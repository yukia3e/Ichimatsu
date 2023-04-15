import type { FC } from "react";
import Link from "next/link";
import SectionTitle from "@/components/atoms/SectionTitle";

const DashboardLinksAreaOrganism: FC = () => {
  return (
    <section className="container flex flex-col mb-20">
      <div className="w-full text-center">
        <SectionTitle>Features</SectionTitle>
      </div>
      <div className="w-full text-center">
        <Link href="/mint" className="text-xl text-primary-500">
          IchimatsuMint
        </Link>
      </div>
    </section>
  );
};

export default DashboardLinksAreaOrganism;
