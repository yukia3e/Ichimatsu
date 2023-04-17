export type ResponseMint = {
  type: number; // 2
  chainid: number; // 80001
  nonce: number; // 10,
  maxPriorityFeePerGas: {
    _hex: string; // 0x59682f00
    _isBigNumber: boolean; // true
  };
  maxFeePerGas: {
    _hex: string; // 0x59682f00
    _isBigNumber: boolean; // true
  };
  gasPrice: {
    _hex: string; // 0x59682f00
    _isBigNumber: boolean; // true
  };
  gasLimit: {
    _hex: string; // 0x037910
    _isBigNumber: boolean; // true
  };
  to: string; // 0x0b35e45C031d8fcEA4e7db87DC9236323b941c6d
  value: {
    _hex: string; // 0x00
    _isBigNumber: boolean; // true
  };
  data: string; // 0x2a65aca400000000000;
  accessList: [];
  hash: string; // 0x99a430b52f8e7289bfdba9715c3f7cd7ea21f05992dc09e0ab05166e549b96ce;
  v: number; // 0
  r: string; // 0x000000000000
  s: string; // 0x000000000000
  from: string; // 0x0b35e45C031d8fcEA4e7db87DC9236323b941c6d
  confirmations: number; // 0
  waits: []; // [Function (anonymous)]
};
