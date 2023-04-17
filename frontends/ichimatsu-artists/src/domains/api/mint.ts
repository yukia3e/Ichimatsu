import {
  ErrorResponse,
  MintRequestBody,
  MintResponse,
} from "@/domains/types/mint";

const mintNFTs = async (
  artistAddress: string,
  ipfsHash: string,
  nftContractAddress: string,
  quantity: number
): Promise<string | undefined> => {
  try {
    const body: MintRequestBody = {
      contractAddress: nftContractAddress,
      to: artistAddress,
      quantity: quantity,
      baseURI: `ipfs://${ipfsHash}/`,
      data: new Uint8Array(), // TODO: set data
    };
    const response = await fetch("/api/mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data: MintResponse = (await response.json()) as MintResponse;
      console.error(`txAddress: ${data.txAddress}`);

      return data.txAddress;
    } else {
      const error: ErrorResponse = (await response.json()) as ErrorResponse;
      console.error(`Error: ${error.error}`);
    }
  } catch (error) {
    console.error(`Error: ${error}`); // eslint-disable-line
  }
};

export default mintNFTs;
