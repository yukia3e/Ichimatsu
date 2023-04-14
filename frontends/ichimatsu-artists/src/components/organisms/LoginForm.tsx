import { FC, SyntheticEvent } from "react";
import Button from "@/components/atoms/Button";

type Props = {
  login: (event: SyntheticEvent<Element, Event>) => Promise<void>;
};

const LoginFormOrganism: FC<Props> = ({ login }) => {
  return (
    <section className="p-2 text-center">
      <Button onClick={login} design="primary">
        Sign In
      </Button>
    </section>
  );
};

export default LoginFormOrganism;
