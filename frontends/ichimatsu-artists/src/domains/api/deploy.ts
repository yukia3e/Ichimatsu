import {
  ConstructorRequestBody,
  DeployResponse,
  ErrorResponse,
} from "@/domains/types/deploy";

const deployContract = async (
  name: string,
  symbol: string,
  royaltyRecipient?: string,
  royaltyBps?: number
): Promise<string | undefined> => {
  try {
    const body: ConstructorRequestBody = {
      name,
      symbol,
      royaltyRecipient,
      royaltyBps,
    };
    const response = await fetch("/api/deploy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data: DeployResponse = (await response.json()) as DeployResponse;

      return data.contractAddress;
    } else {
      const error: ErrorResponse = (await response.json()) as ErrorResponse;
      console.error(`Error: ${error.error}`);
    }
  } catch (error) {
    console.error(`Error: ${error}`); // eslint-disable-line
  }
};
export default deployContract;
