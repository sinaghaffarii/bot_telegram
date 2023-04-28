const { addUnit } = require("../utils");
const moment = require("jalali-moment");

module.exports.startMessage = () => {
  return `سلام 
  من ربات سهام جو هستم
  اسم هر سهامی که دلت خواست رو هرزمانی میتونی برام بفرستی و من اطلاعاتشو بهت برگردونم
  
  لیست قابلیت های من
  /sybmol_list
  /best_symbols
  /comp_symbol 
  
  @karlaand_bot`;
};

module.exports.symbolDetails = (data) => {
  return `
  سهام: ${data.symbol}
  حجم معاملات: ${addUnit(data.volume)}
  
  درصد خرید حقیقی: ${data.realBuyPercent} %
  درصد فروش حقیقی: ${data.realSellPercent} %
  
  ورود و خروج پول حقیقی: ${addUnit(data["enter/exit"])}
  حجم میانگین ماه: ${addUnit(data.monthVolumeAvg)}
  
  سرانه خرید: ${addUnit(data.buyS)}
  سرانه فروش: ${addUnit(data.sellS)}
  قدرت خریدار به فروشنده: ${data.power}
  
  درصد معاملات: ${data.percent}% ${data.percent > 0 ? "سبز" : "قرمز"}
  درصد پایانی: ${data.finalPercent}% ${data.finalPercent > 0 ? "سبز" : "قرمز"}
  
  تاریخ: ${moment.locale("fa").format("D M")}
  ساعت: ${moment.locale("fa").format("HH;mm")}`;
};
