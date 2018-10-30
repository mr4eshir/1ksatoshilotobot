const TelegramBot = require('node-telegram-bot-api') 
const config = require('./config')
const mongoose = require('mongoose');

const Users = require("./models/users");
const Messages = require("./models/messages")

const DATABASE_CONECTION = 'mongodb://localhost/bots'
mongoose.connect(DATABASE_CONECTION);

const TOKEN = config.token
const bot = new TelegramBot(TOKEN, { polling:true })

bot.on('message', msg => {
    console.log( msg)
    const addUser = new Users({
        tlgid: msg.from.id,
        first_name: msg.from.first_name,
        last_name: msg.from.last_name
    });
    const messages = new Messages({
        tlgid: msg.chat.id,
        text: msg.text
    })
    const { chat: { id }} = msg
    bot.sendMessage(id, 'Pong')
    return Promise.all([addUser.save(), messages.save()])
})
