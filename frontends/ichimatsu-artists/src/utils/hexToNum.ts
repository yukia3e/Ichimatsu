const hexStringToNumber = (hexString: string): number => {
  if (hexString.startsWith("0x")) {
    hexString = hexString.slice(2);
  }

  return parseInt(hexString, 16);
};

export default hexStringToNumber;
