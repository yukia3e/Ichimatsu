import type { FC } from "react";
import { SafeAuthSignInData } from "@safe-global/auth-kit";
import Button from "@/components/atoms/Button";
import SectionTitle from "@/components/atoms/SectionTitle";

type Props = {
  signInData: SafeAuthSignInData | null;
  showWalletConnectScanner: () => Promise<void>;
};

const AccountsAreaOrganism: FC<Props> = ({
  signInData,
  showWalletConnectScanner,
}) => {
  return (
    <section className="container flex flex-col mb-20 gap-4">
      <div className="w-full text-center">
        <SectionTitle>Account Info</SectionTitle>
      </div>
      <div className="mx-auto text-center lg:w-1/2 flex flex-wrap border-2 rounded-lg">
        <div className="w-full border bg-primary-300 text-md py-2 font-logo">
          Opensea Link
        </div>
        <div className="w-full text-sm border-b py-2">
          {signInData ? (
            <a
              href={`https://${
                process.env.NEXT_PUBLIC_OPENSEA_DOMAIN || "testnets.opensea.io"
              }/ja/${signInData.eoa}`}
              target="_blank"
              rel="noreferrer"
            >
              {signInData.eoa}
            </a>
          ) : (
            "No accounts connected"
          )}
        </div>
      </div>
      <div className="w-full text-center">
        <Button onClick={showWalletConnectScanner} design="primary">
          WalletConnectScanner
        </Button>
      </div>
    </section>
  );
};

export default AccountsAreaOrganism;
