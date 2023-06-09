export type ConstructorRequestBody = {
  name: string;
  symbol: string;
  royaltyRecipient?: string;
  royaltyBps?: number;
};

export interface DeployResponse {
  contractAddress: string;
}

export interface ErrorResponse {
  error: string;
}
