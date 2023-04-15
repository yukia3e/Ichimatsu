export type ConstructorRequestBody = {
  name: string;
  symbol: string;
  royaltyRecipient?: string;
  royaltyBps?: number;
};

export interface DeployResponse {
  taskId: string;
  statusUrl: string;
}

export interface ErrorResponse {
  error: string;
}
