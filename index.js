const TelegramBot = require('node-telegram-bot-api') 
const config = require('./config')
const mongoose = require('mongoose');

const Users = require("./models/users");
const Messages = require("./models/messages")

const DATABASE_CONECTION = 'mongodb://localhost/bots'
mongoose.connect(DATABASE_CONECTION);

const TOKEN = config.token
const bot = new TelegramBot(TOKEN, { polling:true })

bot.onText(/\/start/, (msg, match) => {
    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            keyboard: [['😁price', 'height', 'width']]
        }),
        resize_keyboard: true
    };
    bot.sendMessage(msg.chat.id, 'Hi. I am a simple bot. Have fun!', opts);
});

bot.onText(/price/, (msg, match) => {
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: 'EUR',
                        callback_data: JSON.stringify({
                            'command': 'price',
                            'base': 'EUR'
                        })
                    },
                    {
                        text: 'USD',
                        callback_data: JSON.stringify({
                            'command': 'price',
                            'base': 'USD'
                        })
                    }
                ]
            ]
        }
    };
    bot.sendMessage(msg.chat.id, 'Choose currency', opts);
});

bot.on('message', msg => {
    console.log( msg)
    const addUser = new Users({
        tlgid: msg.from.id,
        first_name: msg.from.first_name,
        last_name: msg.from.last_name
    });
    const messages = new Messages({
        tlgid: msg.chat.id,
        user: addUser._id,
        text: msg.text,
    })
    const { chat: { id }} = msg
    bot.sendMessage(id, 'Pong')
    return Promise.all([addUser.save(), messages.save()])
})
