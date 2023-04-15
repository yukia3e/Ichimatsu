import type { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const Title: FC<Props> = ({ children }) => {
  return (
    <h1 className="font-logo tracking-tight text-gray-900 mb-4">{children}</h1>
  );
};

export default Title;
