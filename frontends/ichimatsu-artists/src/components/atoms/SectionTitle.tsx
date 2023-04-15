import type { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const SectionTitle: FC<Props> = ({ children }) => {
  return (
    <h2 className="font-logo pb-4 text-xl tracking-tight text-gray-900">
      {children}
    </h2>
  );
};

export default SectionTitle;
