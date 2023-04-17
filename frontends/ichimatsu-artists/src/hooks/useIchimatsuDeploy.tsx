import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import deployContract from "@/domains/api/deploy";
import { DeployFormSchema, deployFormSchema } from "@/schemas/deloyForm";
import useAuthStore from "@/stores/useAuthStore";
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
  const authSignInData = useAuthStore((state) => state.authSignInData);
  const [nftContractAddress, setNftContractAddress] = useState<string>("");
  const [isWaitingDeploy, setIsWaitingDeploy] = useState(false);

  const {
    register: registerDeploy,
    handleSubmit: handleSubmitDeploy,
    formState: { errors: deployErrors },
    watch: watchDeploy,
  } = useForm<DeployFormSchema>({
    resolver: yupResolver(deployFormSchema),
    defaultValues: {
      name: "[EVENT NAME] NFT",
      symbol: "ENF",
      royaltyRecipient: authSignInData ? authSignInData.eoa : "",
      royaltyBps: 1000,
    },
  });

  const deploy = async () => {
    const name = watchDeploy("name");
    const symbol = watchDeploy("symbol");
    const royaltyRecipient = watchDeploy("royaltyRecipient");
    const royaltyBps = watchDeploy("royaltyBps");

    setIsWaitingDeploy(true);
    try {
      const nftContractAddress = await deployContract(
        name,
        symbol,
        royaltyRecipient,
        royaltyBps
      );

      if (!nftContractAddress) throw new Error("nftContractAddress is empty");

      setNftContractAddress(nftContractAddress);
    } catch (e) {
      console.error(e);
    } finally {
      setIsWaitingDeploy(false);
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
