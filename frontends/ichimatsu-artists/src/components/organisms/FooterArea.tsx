import type { FC } from "react";
import LogoMolecule from "../molecules/Logo";

type Props = {
  isLoggedIn: boolean;
};

const FooterOrganism: FC<Props> = ({ isLoggedIn }) => {
  return (
    <footer className="bg-white">
      <div className="w-full p-2 mx-auto max-w-screen-xl md:py-8">
        <nav className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <LogoMolecule isLoggedIn={isLoggedIn} />
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-primary-500 sm:mb-0">
            <li>
              <a
                href="https://github.com/yukia3e"
                target="_blank"
                className="mr-4 hover:underline md:mr-6"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://github.com/yukia3e"
                target="_blank"
                className="mr-4 hover:underline md:mr-6"
                rel="noreferrer"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="https://github.com/yukia3e"
                target="_blank"
                className="mr-4 hover:underline md:mr-6"
                rel="noreferrer"
              >
                ETHGlobal Tokyo
              </a>
            </li>
          </ul>
        </nav>
        <hr className="my-6 border-primary-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-primary-500 sm:text-center">
          © 2023{" "}
          <a href="https://github.com/yukia3e" className="hover:underline">
            yukia3e
          </a>
          All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default FooterOrganism;
