import { FC } from "react";
import LoginFormOrganism from "@/components/organisms/LoginForm";
import { useSafeAuth } from "@/hooks/useSafeAuth";

const LoginFormEcosystem: FC = () => {
  const [login, _] = useSafeAuth();

  return <LoginFormOrganism login={login} />;
};

export default LoginFormEcosystem;
