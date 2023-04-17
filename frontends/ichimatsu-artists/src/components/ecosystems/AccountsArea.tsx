import type { FC } from "react";
import AccountsAreaOrganism from "@/components/organisms/AccountsArea";
import useAuthStore from "@/stores/useAuthStore";

const AccountsAreaEcosystem: FC = () => {
  const safeAuthSignInData = useAuthStore((state) => state.authSignInData);
  const torusPlugin = useAuthStore((state) => state.torusPlugin);
  const showWalletConnectScanner = async () => {
    await torusPlugin?.showWalletConnectScanner();
  };

  return (
    <AccountsAreaOrganism
      signInData={safeAuthSignInData}
      showWalletConnectScanner={showWalletConnectScanner}
    />
  );
};

export default AccountsAreaEcosystem;
