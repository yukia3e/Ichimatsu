import { FC } from "react";

type Props = {
  isLoggedIn?: boolean;
};

const HeroAreaOrganism: FC<Props> = ({ isLoggedIn }) => {
  return !isLoggedIn ? (
    <div className="relative px-6 pt-8 isolate lg:px-8 lg:pt-14">
      <div className="max-w-2xl py-32 mx-auto sm:py-48 lg:py-56">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Tagline
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa libero
          </p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default HeroAreaOrganism;
