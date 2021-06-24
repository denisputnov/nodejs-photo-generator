const TelegramBot = require('node-telegram-bot-api')
const generate = require('./generator')

const token = process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true})

let header = ''
let text = ''

bot.on('message', async (message) => {
  if (command(message, '/info')) {
    return bot.sendMessage(message.chat.id, (header.length || text.length) ? `${header}\n\n${text}` : 'Пусто')
  } 

  if (command(message, '/generate')) {
    await generate(header, text)
    return bot.sendPhoto(message.chat.id, './out.png')
  }

  if (message.text.length > 1 && message.text.length <= 40) {
    header = message.text
    return bot.sendMessage(message.chat.id, (header.length || text.length) ? `${header}\n\n${text}` : 'Пусто')
  }

  if (message.text.length > 40) {
    text = message.text
    return bot.sendMessage(message.chat.id, (header.length || text.length) ? `${header}\n\n${text}` : 'Пусто')
  }
})

function command(message, command) {
  return message.text.split(' ').includes(command)
}