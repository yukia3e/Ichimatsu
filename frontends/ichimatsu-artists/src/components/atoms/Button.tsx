import type { FC, MouseEventHandler, PropsWithChildren } from "react";
import Link from "next/link";

type Props = {
  design?: "primary" | "secondary" | "tertiary";
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  className?: string;
} & PropsWithChildren;

const Button: FC<Props> = ({ design, href, onClick, className, children }) => {
  let baseClasses = "";
  switch (design) {
    case "primary":
      baseClasses =
        "text-sm font-semibold text-white border-2 border-primary-600 hover:border-primary-500 rounded-md bg-primary-600 px-3.5 py-2.5 shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600";
      break;
    case "secondary":
      baseClasses =
        "text-sm font-semibold bg-white border-2 border-primary-600 hover:border-primary-500 rounded-md px-3.5 py-2.5 text-primary-600 hover:text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600";
      break;
    case "tertiary":
      baseClasses =
        "text-sm font-semibold border-2 border-white px-3.5 py-2.5 text-primary-600 hover:text-primary-500";
      break;
    default:
      baseClasses =
        "text-sm font-semibold px-3.5 py-2.5 text-primary-600 hover:text-primary-500";
      break;
  }

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses || ""} ${className || ""}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`${baseClasses || ""} ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
