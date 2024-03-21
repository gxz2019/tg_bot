const { Bot } = require('grammy');

const { ProxyAgent } = require('./proxyAgent');

const { priceCommand } = require('./runestone');
const { coinPriceCommand } = require('./coin');
const { onTwitterUser } = require('./twitter');

const { TG_BOT_TOKEN } = require('./password');

// 创建一个 GrammY 机器人实例
const bot = new Bot(TG_BOT_TOKEN, {
  client: {
    baseFetchConfig: {
      agent: ProxyAgent, // 设置 Socks5 代理
      compress: true,
    },
  },
});

priceCommand(bot);

coinPriceCommand(bot);

onTwitterUser(bot);
// 启动机器人

bot.start();
