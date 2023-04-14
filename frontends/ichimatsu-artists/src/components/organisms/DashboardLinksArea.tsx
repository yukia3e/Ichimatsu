import type { FC } from "react";
import Link from "next/link";
import SectionTitle from "../atoms/SectionTitle";

const DashboardLinksAreaOrganism: FC = () => {
  return (
    <section className="container">
      <SectionTitle>DashboardLinksAreaOrganism</SectionTitle>
      <Link href="/mint">Mint</Link>
    </section>
  );
};

export default DashboardLinksAreaOrganism;
