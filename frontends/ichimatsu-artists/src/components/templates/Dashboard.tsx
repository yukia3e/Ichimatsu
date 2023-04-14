import type { FC } from "react";
import DashboardLinksAreaEcosystem from "@/components/ecosystems/DashboardLinksArea";
import FooterAreaEcosystem from "@/components/ecosystems/FooterArea";
import HeaderAreaEcosystem from "@/components/ecosystems/HeaderArea";

const DashboardTemplate: FC = () => {
  return (
    <>
      <HeaderAreaEcosystem />
      <main className="container p-4 mx-auto">
        <DashboardLinksAreaEcosystem />
      </main>
      <FooterAreaEcosystem />
    </>
  );
};

export default DashboardTemplate;
