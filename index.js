require('dotenv').config();
const Markup = require('telegraf/markup');
const {
	Telegraf
} = require('telegraf');
const mogilev = require('./statistics/mogilev');
const gomel = require('./statistics/gomel');
const grodno = require('./statistics/grodno');
const minskaya = require('./statistics/minskaya');
const minsk = require('./statistics/minsk');
const vitebsk = require('./statistics/vitebsk');
const brest = require('./statistics/brest');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
	ctx.reply(
		`
Привет, ${ctx.message.from.first_name}!
Узнай последнюю статистику по коронавирусу в Беларуси. Выбери область, и мы покажем количество случаев по районам этой области. Если у тебя есть информация о новых случаях, напиши нам @InfiekcionkaBot.

`,
		Markup.keyboard([
			['Минск'],
			['Минская', 'Витебская'],
			['Могилёвская', 'Гомельская'],
			['Брестская', 'Гродненская']
		])
		.resize()
		.extra()
	)
);

bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('Могилёвская', (ctx) => ctx.reply(mogilev));
bot.hears('Минская', (ctx) => ctx.reply(minskaya));
bot.hears('Гомельская', (ctx) => ctx.reply(gomel));
bot.hears('Гродненская', (ctx) => ctx.reply(grodno));
bot.hears('Брестская', (ctx) => ctx.reply(brest));
bot.hears('Витебская', (ctx) => ctx.reply(vitebsk));
bot.hears('Минск', (ctx) => ctx.reply(minsk));

bot.launch();