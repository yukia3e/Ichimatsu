export type MintRequestBody = {
  contractAddress: string;
  to: string;
  quantity: number;
  baseURI: string;
  data: Uint8Array;
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
