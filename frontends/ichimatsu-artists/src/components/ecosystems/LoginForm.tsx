import { FC } from "react";
import LoginFormOrganism from "@/components/organisms/LoginForm";
import { useAuth } from "@/hooks/useAuth";

const LoginFormEcosystem: FC = () => {
  const [isWaitingLoadAuth, login, _logout] = useAuth();

  return (
    <LoginFormOrganism login={login} isWaitingLoadAuth={isWaitingLoadAuth} />
  );
};

export default LoginFormEcosystem;
