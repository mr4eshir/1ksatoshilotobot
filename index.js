const TelegramBot = require('node-telegram-bot-api') 
const config = require('./config')
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

const Users = require("./models/users");
const Messages = require("./models/messages")
const RandomNumber = require("./methods/randomNumber")
const Ticket = require("./models/ticket")
var sha256 = require('js-sha256').sha256;

const getTicketIds  = require("./methods/getTicketIds")

const DATABASE_CONECTION = 'mongodb://localhost/bots'
mongoose.connect(DATABASE_CONECTION);

const TOKEN = config.token
const bot = new TelegramBot(TOKEN, { polling:true })

var hash = sha256.create();
hash.update('Message to hash');
hash.hex();

let dbo = ''; // Mongo connection

MongoClient.connect('mongodb://localhost/bots', (err, db) => {
    if (err) throw err;
    dbo = db.db("bots");
});

bot.onText(/\/start/, (msg, match) => {
    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            keyboard: [['Купить_билет'],['Мои_билеты']]
        }),
        resize_keyboard: true
    };
    bot.sendMessage(msg.chat.id, 'Hi. I am a simple bot. Have fun!', opts);
});

// bot.onText(/Купить_билет/, (msg, match) => {
//     const opts = {
//         reply_markup: {
//             inline_keyboard: [
//                 [{
//                         text: '111',
//                         callback_data: JSON.stringify({
//                             'command': 'Купить_билет',
//                             'base': '111'
//                         })
//                     },
//                     {
//                         text: '222',
//                         callback_data: JSON.stringify({
//                             'command': 'Купить_билет',
//                             'base': '222'
//                         })
//                     },
//                 ]
//             ]
//         }
//     };
//     // var hash = sha256(RandomNumber())
//     bot.sendMessage(msg.chat.id, RandomNumber(), opts);
// });

// var test = exports.orders_get_all = (req, res, next) => {
//     Ticket.find()
//       .select("tickets user")
//       .populate("user")
//       .exec()
//       .then (i => {
//         i.map(user => {
//             return user.user.map(x => {
//                 return x.tlgid
//             })
//         })
//     })
// };



// bot.onText(/Мои_билеты/, (msg, match) => {
//         const opts = {
//             reply_markup: {
//                 inline_keyboard: [
//                     [{
//                         text: '333',
//                         callback_data: JSON.stringify({
//                             'command': 'Мои_билеты',
//                             'base': '333'
//                         })
//                     }]
//                 ]
//             }
//         };
//         bot.sendMessage(msg.chat.id, tickets, opts);
//         });
//     });
// });


bot.on('message',  async msg => {
    const user = await Users.findOne({'tlgid': msg.from.id}).exec().then((user) => {
        console.log('index 1 user: ', user);
        if (user) return user;
        let new_user = new Users({
            tlgid: msg.from.id,
            first_name: msg.from.first_name,
            last_name: msg.from.last_name
        });
        return Users.findOneAndUpdate({'tlgid': msg.from.id}, new_user, {
            'new': true,
            'upsert': true
        }).exec().then((user)=>user);
    });

    console.log('index 2 user: ', user);
    // bot.sendMessage(msg.chat.id, user.tlgid, {});
    const messages = new Messages({
        tlgid: msg.chat.id,
        user: user,
        text: msg.text,
    });
    const ticket = new Ticket({
        user: user,
        hash: sha256(RandomNumber()),
        numbers: RandomNumber()
    })
    return Promise.all([messages.save(), ticket.save()]);
})
