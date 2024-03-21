const getSolAddressInfo = (address) => {
  return `https://www.okx.com/priapi/v1/dx/trade/multi/v3/quote?amount=1&chainId=501&toChainId=501&toTokenAddress=11111111111111111111111111111111&fromTokenAddress=${address}&slippage=0.01&slippageType=1&pmm=1&gasDropType=0&forbiddenBridgeTypes=0&dexIds=277%2C279%2C278%2C72%2C73%2C76%2C79%2C78%2C77%2C103%2C284%2C292%2C291&t=1710833897707`;
};

exports.getSolAddressInfo = getSolAddressInfo;