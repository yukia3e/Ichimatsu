import { FC } from "react";
import LoginFormOrganism from "@/components/organisms/LoginForm";
import { useAuth } from "@/hooks/useAuth";

const LoginFormEcosystem: FC = () => {
  const [login, _] = useAuth();

  return <LoginFormOrganism login={login} />;
};

export default LoginFormEcosystem;
