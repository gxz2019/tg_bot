const { SocksProxyAgent } = require('socks-proxy-agent');
const axios = require('axios').default;

// 在这里填入你要监视价格的商品的 URL
const getAddressUrl = (address) => {
  return `https://www.okx.com/priapi/v1/dx/trade/multi/v3/quote?amount=1&chainId=501&toChainId=501&toTokenAddress=11111111111111111111111111111111&fromTokenAddress=${address}&slippage=0.01&slippageType=1&pmm=1&gasDropType=0&forbiddenBridgeTypes=0&dexIds=277%2C279%2C278%2C72%2C73%2C76%2C79%2C78%2C77%2C103%2C284%2C292%2C291&t=1710833897707`;
}

const getAxiosInstance = (address) => {
  return axios.create({
    baseURL: getAddressUrl(address), // 设置基础 URL
    httpsAgent: new SocksProxyAgent('socks5://127.0.0.1:1086'), // 设置 Socks5 代理
  });
}

// 发送请求并获取价格的函数
async function getPrice(address) {
  try {
    const response = await getAxiosInstance(address).get();
    const { singleChainSwapInfo, commonDexInfo } = response.data.data;
    const tokenName = commonDexInfo?.fromToken?.tokenName;
    if (!tokenName) {
      return '无效地址'
    }
    return `tokenName: ${tokenName} \n price: ${singleChainSwapInfo.receiveAmount} SOL`;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

const coinPriceCommand = (bot) => {
  // 处理 /price 命令
  bot.command('address', async (ctx) => {
    const address = ctx?.update?.message?.text?.match(/\/address\s+(\S+)/)[1];
    console.log(address, '......')
    const price = await getPrice(address);
    if (price !== null) {
      await ctx.reply(price);
    } else {
      await ctx.reply('抱歉，无法获取价格。');
    }
  });
}
exports.coinPriceCommand = coinPriceCommand;