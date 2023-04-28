const { Telegraf } = require("telegraf");
const { startMessage } = require("./MessageHandler");
const config = require("./config");

const symbolList = require('./data.json')



const bot = new Telegraf(config.get("bot_token"));

bot.start((ctx) => ctx.reply(startMessage));

bot.on("text" , (ctx) => {
  const text = ctx.message.text;
  // چون میدونیم تعداد کاراکتر های سهامامون از 6 تا بیشتر نیست میتونیم این شرط رو بذاریم
  if(text.length <= 6) {
    const symbol = symbolList.find(item => item.symbol === text) 
    console.log(symbolّ)
  }
})




bot.launch();
