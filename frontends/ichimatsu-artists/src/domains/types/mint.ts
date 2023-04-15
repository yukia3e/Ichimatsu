export type MintRequestBody = {
  artistAddress: string;
  ipfsHash: string;
  nftContractAddress: string;
};

export type Metadata = {
  name: string;
  description: string;
  external_link: string;
  attributes?: Attribute[];
};

export type Attribute = {
  trait_type: string;
  value: string;
};

export type MintResponse = {
  taskId: string;
  statusUrl: string;
};

export type ErrorResponse = {
  error: string;
};
