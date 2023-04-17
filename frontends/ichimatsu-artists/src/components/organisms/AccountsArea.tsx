import type { FC } from "react";
import { SafeAuthSignInData } from "@safe-global/auth-kit";
import SectionTitle from "../atoms/SectionTitle";

type Props = {
  signInData: SafeAuthSignInData | null;
};

const AccountsAreaOrganism: FC<Props> = ({ signInData }) => {
  return (
    <section className="container flex flex-col mb-20">
      <div className="w-full text-center">
        <SectionTitle>Account Info</SectionTitle>
      </div>
      <div className="mx-auto text-center lg:w-1/2 text-sm flex flex-wrap">
        {signInData ? signInData.eoa : "No accounts connected"}
      </div>
    </section>
  );
};

export default AccountsAreaOrganism;
