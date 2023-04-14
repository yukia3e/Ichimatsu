import type { FC } from "react";
import Link from "next/link";
import Logo from "@/components/atoms/Logo";

const FooterOrganism: FC = () => {
  return (
    <footer className="bg-white">
      <div className="w-full p-2 mx-auto max-w-screen-xl md:py-8">
        <nav className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center mb-4 sm:mb-0">
            <Logo />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <Link href="/" className="mr-4 hover:underline md:mr-6">
                XXX
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                XXX
              </Link>
            </li>
          </ul>
        </nav>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
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
