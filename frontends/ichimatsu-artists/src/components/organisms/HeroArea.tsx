import { FC } from "react";

type Props = {
  isLoggedIn?: boolean;
};

const HeroAreaOrganism: FC<Props> = ({ isLoggedIn }) => {
  return !isLoggedIn ? (
    <section className="relative px-6 pt-8 isolate lg:px-8 lg:pt-14">
      <div className="max-w-2xl py-32 mx-auto sm:py-48 lg:py-56">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Tagline
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-8">
            &quot;Ichimatsu&quot; is the first step for live music artists to
            explore new possibilities with web3.
          </p>
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default HeroAreaOrganism;
