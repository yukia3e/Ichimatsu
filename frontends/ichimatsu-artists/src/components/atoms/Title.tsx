import type { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const Title: FC<Props> = ({ children }) => {
  return (
    <h1 className="font-semibold tracking-tight text-gray-900">{children}</h1>
  );
};

export default Title;
