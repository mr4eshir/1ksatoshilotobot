const TelegramBot = require('node-telegram-bot-api') 
const config = require('./config')
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

const Users = require("./models/users");
const Messages = require("./models/messages")
const RandomNumber = require("./methods/randomNumber")
const Start = require("./commands/start")
const Ticket = require("./models/ticket")
var sha256 = require('js-sha256').sha256;

const DATABASE_CONECTION = 'mongodb://localhost/bots'
mongoose.connect(DATABASE_CONECTION);

const TOKEN = config.token
const bot = new TelegramBot(TOKEN, { polling:true })

var hash = sha256.create();
hash.update('Message to hash');
hash.hex();

Start

bot.onText(/Купить_билет/, (msg, match) => {
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: '111',
                        callback_data: JSON.stringify({
                            'command': 'Купить_билет',
                            'base': '111'
                        })
                    },
                    {
                        text: '222',
                        callback_data: JSON.stringify({
                            'command': 'Купить_билет',
                            'base': '222'
                        })
                    },
                ]
            ]
        }
    };
    // var hash = sha256(RandomNumber())
    bot.sendMessage(msg.chat.id, RandomNumber(), opts);
});

bot.onText(/Мои_билеты/, (msg, match) => {
    MongoClient.connect('mongodb://localhost/bots', function(err, db) {
        if (err) throw err;
        var dbo = db.db("bots");
        dbo.collection("tickets").find({}).toArray(function(err, result) {
          if (err) throw err;
        var tickets = result.reduce(function (msg, ticket) { 
            return ticket.numbers + "\n";
        }, '');
        db.close();
        const opts = {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: '333',
                        callback_data: JSON.stringify({
                            'command': 'Мои_билеты',
                            'base': '333'
                        })
                    }]
                ]
            }
        };
        // console.log(tickets)
        bot.sendMessage(msg.chat.id, tickets, opts);
        });
    });
});

bot.on('message', msg => {
    // console.log( msg)
    // console.log(typeof RandomNumber())
    const addUser = new Users({
        tlgid: msg.from.id,
        first_name: msg.from.first_name,
        last_name: msg.from.last_name
    });
    const messages = new Messages({
        tlgid: msg.chat.id,
        user: addUser._id,
        text: msg.text,
    });
    const ticket = new Ticket({
        user: addUser._id,
        hash: sha256(RandomNumber()),
        numbers: RandomNumber()
    })
    const { chat: { id }} = msg
    bot.sendMessage(id, 'Hello')
    return Promise.all([addUser.save(), messages.save(), ticket.save()])
})
