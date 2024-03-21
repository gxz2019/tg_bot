const { getAxiosInstance } = require('./axios');

// 发送请求并获取价格的函数
async function getPrice(address) {
  try {
    const url = address?.fullAddress || getSolAddressInfo(address);
    const response = await getAxiosInstance(url).get();
    if (address?.fullAddress) {
      return response.data.data.latestPrice;
    }
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
    const price = await getPrice(address);
    if (price !== null) {
      await ctx.reply(price);
    } else {
      await ctx.reply('抱歉，无法获取价格。');
    }
  });
}
exports.coinPriceCommand = coinPriceCommand;
exports.getCoinPrice = getPrice;