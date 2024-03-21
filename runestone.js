const { getAxiosInstance } = require('./axios');
const { getCoinPrice } = require('./coin');
const { URL_LIST } = require('./constants');

// 发送请求并获取价格的函数
async function getPrice() {
  try {
    const response = await getAxiosInstance(URL_LIST.runeStoneInfo).get();
    const btcPrice = await getCoinPrice({
      fullAddress: URL_LIST.btcInfo
    });
    // 这里假设返回的数据结构是一个包含价格的对象，你需要根据实际情况来解析数据
    const { floorPrice } = response.data.data;
    console.log(floorPrice.value, 'floorPrice', btcPrice);
    const runePriceUSDT = Number(floorPrice.value) * btcPrice;
    return {
      runeStone: runePriceUSDT,
      btcPrice: btcPrice
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

const priceCommand = (bot) => {
  // 处理 /price 命令
  bot.command('price', async (ctx) => {
    const priceObj = await getPrice();
    const { runeStone, btcPrice } = priceObj;
    const text = `BTC 当前价格为：${btcPrice} USDT\nRuneStone 当前地板价为：${runeStone} USDT`;
    if (priceObj !== null) {
      await ctx.reply(text);
    } else {
      await ctx.reply('抱歉，无法获取价格。');
    }
  });
}
exports.priceCommand = priceCommand;