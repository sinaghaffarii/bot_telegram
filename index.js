const { Telegraf } = require("telegraf");

const bot = new Telegraf("5861658044:AAGq_1RV48iz07ckU6orc2onQiCCMC504dg");

// ----------------- Middleware ----------------

const getUserRole = (user) => {
  const roles = ["طلایی", "نقره ای", "برنزی"];
  const index = Math.floor(Math.random() * roles.length);
  return roles[index];
};

bot.on("text", (ctx) => {
  ctx.reply("پیام", {
    reply_markup: {
      inline_keyboard: [
        [
          //این آرایه تعداد سطرو نشون میده
          {
            text: "دکمه 1",
            callback_data: "buttonClick",
          },
          {
            text: "دکمه 2",
            callback_data: "buttonClick1",
          },
        ],
      ],
    },
  });

  const role = getUserRole(ctx.from);
  ctx.state.from = role;
  next();
});

// --------------------------------- OR -----------------

bot.use((ctx, next) => {
  // این برای زمانیه که وقتی پیامی ارسال کردیم بهمون این دکمه ها رو نشون بده
  ctx.reply("شما یه پیام ارسال کردید", {
    reply_markup: {
      keyboard: [
        [
          //این آرایه تعداد سطرو نشون میده
          {
            text: "دکمه 1",
            callback_data: "1",
          },
          {
            text: "دکمه 2",
            callback_data: "2",
          },
        ],
        [
          {
            text: "دکمه 3",
            callback_data: "3",
          },
          {
            text: "دکمه 4",
            callback_data: "4",
          },
          {
            text: "دکمه 5",
            callback_data: "5",
          },
          {
            text: "دکمه 6",
            callback_data: "6",
          },
        ],
        [
          {
            text: "دکمه 7",
            callback_data: "7",
          },
        ],
      ],
    },
  });

  const role = getUserRole(ctx.from);
  ctx.state.from = role;
  next();
});

// ---------------------------------------------

bot.start((ctx) => {
  console.log(ctx.message.chat);
  console.log(ctx.message.from); // برای دریافت اطلاع کاربر
  // return ctx.reply("سلام، من ربات هستم");
  return ctx.telegram.sendMessage(
    ctx.chat.id,
    `سلام
  من یه ربات فروشگاهیم 
  برای دیدن محصولات میتونی روی لینک پایین کیلک کنی
  /products
  
  برای تنظیمات هم میتونی روی این کلیک کنی
  /settings
  
  @karlaand_bot`
  );
});

bot.action("buttonClick", (ctx) => {
  ctx.reply("شما دکمه یک را زدید");
});

bot.hears(/^محصول/, (ctx) => {
  ctx.reply("دوره ساخت ربات با js");
  // ------------- /^محصول/
  // اکر به این صورت باشه یعنی اگر سوال با این کلمه شروع شده باشه این جمله رو بهش نشون بده
  // ------------ /.محصول./
  // این یعنی در هر جای سوال این کلمه رو دیدی کاریت نباشه این جمله رو نشون بده
});

bot.command(["products", "Products", "محصولات"], (ctx) => {
  // بر اساس rolemon لیست متفاوت نشون میدیم

  const role = ctx.state.role;
  ctx.reply(`شما طرح ${role} را خریداری کردید پس...`);
});

bot.settings((ctx) => {
  ctx.reply("تنظیمات");
});

bot.help((ctx) => {
  ctx.reply("راهنمایی");
});

// -------------------------- updated types --------------------------

bot.on("text", (ctx) => ctx.reply("سلام شما یه متن فرستادید"));
bot.on("text", (ctx) => ctx.reply("شما یه ویس فرستادید"));
bot.on("edited_message", (ctx) => ctx.reply("شما پیامتون رو ویرایش کردید"));

// --------------------------- event handlers ------------------------

// مثلا داخل یک کانال رباتمون رو ادمین کردیم و میگیم این کار هارو بکن

bot.mention("آی دی همون ربات مورد نظر", (ctx) => {
  ctx.reply("شما یک نفر رو منشن کردید");
});

bot.hashtag("تبلیغ", async (ctx) => {
  console.log(ctx.message);
  await ctx.deleteMessage(ctx.message.message_id); // پیام مورد نظر پاک میشه
  const tempMessage = await ctx.reply(`کاربر عزیز ${ctx.message.from.first_name} 
  ارسال هشتگ در این گروه ممنوع استیه 
  یه بار دیگه از اینا بفرستی
  ریمو میشی`);
  setTimeout(() => {
    // پیام ربات رو بعد از 1/5 ثانیه پاک کن
    ctx.deleteMessage(tempMessage.message_id);
  }, 1500);
});

bot.launch();
