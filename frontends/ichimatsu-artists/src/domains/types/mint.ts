export type MintRequestBody = {
  artistAddress: string;
  metadatas: Metadata[];
  nftContractAddress: string;
};

export type Metadata = {
  name: string;
  description: string;
  image: string;
  // ... Any other metadata you want to include
};

export type MintResponse = {
  taskId: string;
  statusUrl: string;
};

export type ErrorResponse = {
  error: string;
};
