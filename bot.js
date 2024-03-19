const { Bot } = require('grammy');
const { SocksProxyAgent } = require('socks-proxy-agent');

const { priceCommand } = require('./runestone');
const { messageCommand } = require('./message');
const { coinPriceCommand } = require('./coin');

const botKey = '6140709898:AAEyDcq41y0J6o4bIHnXR0Ddmnx20nPIR-Y';

// 创建一个 GrammY 机器人实例
const bot = new Bot(botKey, {
  client: {
    baseFetchConfig: {
      agent: new SocksProxyAgent('socks5://127.0.0.1:1086'), // 设置 Socks5 代理
      compress: true,
    },
  },
});

priceCommand(bot);

coinPriceCommand(bot);

messageCommand(bot);

// 启动机器人

bot.start();
