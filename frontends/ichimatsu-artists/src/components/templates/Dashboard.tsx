import type { FC } from "react";
import DashboardLinksAreaEcosystem from "@/components/ecosystems/DashboardLinksArea";
import FooterAreaEcosystem from "@/components/ecosystems/FooterArea";
import HeaderAreaEcosystem from "@/components/ecosystems/HeaderArea";
import Title from "../atoms/Title";
import AccountsAreaEcosystem from "../ecosystems/AccountsArea";

const DashboardTemplate: FC = () => {
  return (
    <>
      <HeaderAreaEcosystem />
      <main className="container p-4 mx-auto">
        <Title>Dashboard</Title>
        <DashboardLinksAreaEcosystem />
        <AccountsAreaEcosystem />
      </main>
      <FooterAreaEcosystem />
    </>
  );
};

export default DashboardTemplate;
