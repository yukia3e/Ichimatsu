import { FC, SyntheticEvent } from "react";
import Button from "@/components/atoms/Button";

type Props = {
  login: (event: SyntheticEvent<Element, Event>) => Promise<void>;
  isWaitingLoadAuth: boolean;
};

const LoginFormOrganism: FC<Props> = ({ login, isWaitingLoadAuth }) => {
  return (
    <section className="p-2 text-center">
      {!isWaitingLoadAuth ? (
        <Button onClick={login} design="primary">
          Sign In
        </Button>
      ) : (
        <>Loading...</>
      )}
    </section>
  );
};

export default LoginFormOrganism;
