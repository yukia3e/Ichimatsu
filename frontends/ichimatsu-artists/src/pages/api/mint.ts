import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { GelatoRelayAdapter } from "@safe-global/relay-kit";
import {
  MetaTransactionData,
  MetaTransactionOptions,
  OperationType,
  RelayTransaction,
} from "@safe-global/safe-core-sdk-types";
import IchimatsuNFTABIJson from "@/contracts/IchimatsuNFT.sol/IchimatsuNFT.json";
import { URL_ALCHEMY_NODE_API } from "@/domains/alchemy/constants";
import { MintRequestBody } from "@/domains/types/mint";
import hexStringToNumber from "@/utils/hexToNum";
import { ethers, ContractInterface } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (process.env.SAFE_SPONSOR_ACCOUNT_PROXY_ADDRESS === undefined) {
    throw new Error("SAFE_SPONSOR_ACCOUNT_PROXY_ADDRESS is undefined");
  }
  if (process.env.NEXT_PUBLIC_CHAIN_ID === undefined) {
    throw new Error("NEXT_PUBLIC_CHAIN_ID is undefined");
  }

  const RPC_URL = URL_ALCHEMY_NODE_API;
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const sponsoredSafeSigner = new ethers.Wallet(
    "", //TODO: 存在しない、safeである必要あり
    provider
  );
  const sponsorSafeProxyAddress =
    process.env.SAFE_SPONSOR_ACCOUNT_PROXY_ADDRESS; // Safe from which the transaction will be sent. Replace with your Safe address
  const chainId = hexStringToNumber(process.env.NEXT_PUBLIC_CHAIN_ID);

  // Get Gelato Relay API Key: https://relay.gelato.network/
  const GELATO_RELAY_API_KEY = process.env.GELATO_RELAY_API_KEY;

  // Usually a limit of 21000 is used but for smart contract interactions, you can increase to 100000 because of the more complex interactions.
  const gasLimit = "100000";

  // Get the artist's address and mint information from the request
  const { artistAddress, metadatas, nftContractAddress } =
    req.body as MintRequestBody;

  // Create a contract instance for your NFT contract
  const IchimatsuNFTABI = IchimatsuNFTABIJson as unknown as ContractInterface;
  const nftContract = new ethers.Contract(
    nftContractAddress,
    IchimatsuNFTABI,
    provider
  );

  // Encode the mint function call with the appropriate arguments
  const data = nftContract.interface.encodeFunctionData("batchMintTo", [
    artistAddress,
    metadatas,
  ]);

  const safeTransactionData: MetaTransactionData = {
    to: nftContractAddress,
    data: data,
    value: "0",
    operation: OperationType.Call,
  };
  const options: MetaTransactionOptions = {
    gasLimit: ethers.BigNumber.from(gasLimit),
    isSponsored: true,
  };

  async function relayTransaction() {
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: sponsoredSafeSigner,
    });

    const safeSDK = await Safe.create({
      ethAdapter,
      safeAddress: sponsorSafeProxyAddress,
    });

    const relayAdapter = new GelatoRelayAdapter(GELATO_RELAY_API_KEY);

    const safeTransaction = await safeSDK.createTransaction({
      safeTransactionData,
    });

    const signedSafeTx = await safeSDK.signTransaction(safeTransaction);

    const encodedTx = safeSDK
      .getContractManager()
      .safeContract.encode("execTransaction", [
        signedSafeTx.data.to,
        signedSafeTx.data.value,
        signedSafeTx.data.data,
        signedSafeTx.data.operation,
        signedSafeTx.data.safeTxGas,
        signedSafeTx.data.baseGas,
        signedSafeTx.data.gasPrice,
        signedSafeTx.data.gasToken,
        signedSafeTx.data.refundReceiver,
        signedSafeTx.encodedSignatures(),
      ]);

    const relayTransaction: RelayTransaction = {
      target: sponsorSafeProxyAddress,
      encodedTransaction: encodedTx,
      chainId: chainId,
      options,
    };
    const response = await relayAdapter.relayTransaction(relayTransaction);

    return response;
  }

  try {
    const response = await relayTransaction();
    res.status(200).json({
      taskId: response.taskId,
      statusUrl: `https://relay.gelato.digital/tasks/status/${response.taskId}`,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
