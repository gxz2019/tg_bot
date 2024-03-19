const messageCommand = (bot) => {
  bot.on('message', async (ctx) => {
  
    ctx.reply('Sorry, I encountered an error while processing your request.')
  });
};

exports.messageCommand = messageCommand;