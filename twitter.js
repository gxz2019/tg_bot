const { TwitterApi } = require('twitter-api-v2');
const {
  TWITTER_APP_KEY,
  TWITTER_APP_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_SECRET
} = require('./password');

// Twitter API 配置
const twitterClient = new TwitterApi(TWITTER_ACCESS_TOKEN);

// 监听指定 Twitter 用户的推文
const userId = 'beifangdegui';
console.log(twitterClient, 'twitterClient');
const onTwitterUser = (bot) => {
  setInterval(async () => {
    const user = await twitterClient.v2.userByUsername(userId);
    console.log(user, 'user');
    // try {
    //   const tweets = await twitterClient.v2.timeline('user', { userId: userId, count: 5 });
    //   console.log(tweets, 'tweets');
    //   tweets.forEach(tweet => {
    //     // 发送推文到 Telegram
    //     const message = `新推文来自 ${tweet.author.username}: ${tweet.text}`;
    //     bot.api.sendMessage('TELEGRAM_CHAT_ID', message); // 将 'TELEGRAM_CHAT_ID' 替换为您希望发送消息的 Telegram 聊天或频道的 ID
    //   });
    // } catch (error) {
    //   console.error('获取推文时出错：', error);
    // }
  }, 600); // 每分钟检查一次新推文
};

exports.onTwitterUser = onTwitterUser;
