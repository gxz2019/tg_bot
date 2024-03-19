const { SocksProxyAgent } = require('socks-proxy-agent');
const axios = require('axios').default;

// 在这里填入你要监视价格的商品的 URL
const productUrl = 'https://www.okx.com/priapi/v1/nft/stats/collection/prices?inclOutlier=false&timeType=1&projectId=3206313&noWash=1&t=1710830088140';

// 创建一个 Axios 实例，并设置 Socks5 代理
const axiosInstance = axios.create({
  baseURL: productUrl, // 设置基础 URL
  httpsAgent: new SocksProxyAgent('socks5://127.0.0.1:1086'), // 设置 Socks5 代理
});

// 发送请求并获取价格的函数
async function getPrice() {
  try {
    const response = await axiosInstance.get();
    // 这里假设返回的数据结构是一个包含价格的对象，你需要根据实际情况来解析数据
    const { floorPrice } = response.data.data;
    console.log(floorPrice);
    return `${floorPrice.value} BTC`;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

const priceCommand = (bot) => {
  // 处理 /price 命令
  bot.command('price', async (ctx) => {
    const price = await getPrice();
    if (price !== null) {
      await ctx.reply(`RuneStone 当前地板价为：${price}`);
    } else {
      await ctx.reply('抱歉，无法获取价格。');
    }
  });
}
exports.priceCommand = priceCommand;