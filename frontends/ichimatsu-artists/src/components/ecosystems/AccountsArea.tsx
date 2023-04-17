import type { FC } from "react";
import AccountsAreaOrganism from "@/components/organisms/AccountsArea";
import useSafeAuthStore from "@/stores/useSafeAuthStore";

const AccountsAreaEcosystem: FC = () => {
  const safeAuthSignInData = useSafeAuthStore(
    (state) => state.safeAuthSignInData
  );

  return <AccountsAreaOrganism signInData={safeAuthSignInData} />;
};

export default AccountsAreaEcosystem;
