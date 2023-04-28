const { Telegraf } = require("telegraf");
const { startMessage, symbolDetails } = require("./MessageHandler");
const config = require("./config");

const symbolList = require("./data.json");
const { symbolButtonList } = require("./transformer");

const bot = new Telegraf(config.get("bot_token"));

bot.start((ctx) => ctx.reply(startMessage));

bot.on("text", (ctx) => {
  const text = ctx.message.text;
  // چون میدونیم تعداد کاراکتر های سهامامون از 6 تا بیشتر نیست میتونیم این شرط رو بذاریم
  if (text.length <= 6) {
    const symbol = symbolList.find((item) => item.symbol === text);
    ctx.reply(symbolDetails(symbol), {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "نمودار سهام",
              callback_data: "chart_" + text,
            },
            {
              text: "این سهام خوبه آیا؟",
              callback_data: "question_" + text,
            },
          ],
        ],
      },
    });
  } else ctx.reply("من سهام رو پیدا نکردم");
});

bot.action(/^chart_/, (ctx) => {
  const text = ctx.match.input.split("_")[1];
  // check from document replyWithPhoto
  ctx.replyWithPhoto(
    {
      source: "./img/chart.jpg",
    },
    {
      caption: "نمودار سهام" + text,
    }
  );
});

bot.command("symbol_list" , ctx => {
  ctx.reply("لیست سهام ها توی دکمه ها وجود داره میتونی روی هر کدوم کلیک کنی و جزئیاتش رو ببینی.", {
    reply_markup: {
      keyboard: symbolButtonList(symbolList)
    }
  })
})

bot.launch();
