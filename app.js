const TelegramBot = require('node-telegram-bot-api')
const generate = require('./generator')

const token = process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true})

let header = ''
let text = ''

bot.on('message', async (message) => {
  if (command(message, '/set_header')) {
    const candidate = message.text.split(' ').slice(1).join(' ')
    if (candidate.length < 1 || candidate.length > 36) {
      return bot.sendMessage(message.chat.id, `length: ${candidate.length}\nНе соответствует лимитам длины`)
    }
    header = candidate
    return bot.sendMessage(message.chat.id, `header: ${header}`)
  } 
  
  if (command(message, '/set_text')) {
    const candidate = message.text.split(' ').slice(1).join(' ')
    if (candidate.length < 10 || candidate.length > 115) {
      return bot.sendMessage(message.chat.id, `length: ${candidate.length}\nНе соответствует лимитам длины`)
    }
    text = candidate
    return bot.sendMessage(message.chat.id, `text: ${text}`)
  }

  if (command(message, '/info')) {
    return bot.sendMessage(message.chat.id, (header.length || text.length) ? `${header}\n\n${text}` : 'Пусто')
  } 

  if (command(message, '/generate')) {
    await generate(header, text)
    return bot.sendPhoto(message.chat.id, './out.png')
  }
})

function command(message, command) {
  return message.text.split(' ').includes(command)
}