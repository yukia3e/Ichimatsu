import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import deployContract from "@/domains/api/deploy";
import { DeployFormSchema, deployFormSchema } from "@/schemas/deloyForm";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";

export const useIchimatsuDeploy = (): [
  UseFormRegister<DeployFormSchema>,
  UseFormHandleSubmit<DeployFormSchema>,
  FieldErrors<DeployFormSchema>,
  () => void,
  boolean,
  string
] => {
  const [nftContractAddress, setNftContractAddress] = useState<string>("");
  const [isWaitingDeploy, setIsWaitingDeploy] = useState(false);

  const {
    register: registerDeploy,
    handleSubmit: handleSubmitDeploy,
    formState: { errors: deployErrors },
    watch: watchDeploy,
  } = useForm<DeployFormSchema>({
    resolver: yupResolver(deployFormSchema),
  });

  const deploy = async () => {
    const name = watchDeploy("name");
    const symbol = watchDeploy("symbol");
    const royaltyRecipient = watchDeploy("royaltyRecipient");
    const royaltyBps = watchDeploy("royaltyBps");

    setIsWaitingDeploy(true);
    try {
      const _deployRes = await deployContract(
        name,
        symbol,
        royaltyRecipient,
        royaltyBps
      );

      // TODO: アドレスの設定
      setNftContractAddress("");
      setIsWaitingDeploy(false);
    } catch (e) {
      console.error(e);
    }
  };

  return [
    registerDeploy,
    handleSubmitDeploy,
    deployErrors,
    deploy,
    isWaitingDeploy,
    nftContractAddress,
  ];
};
