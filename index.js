import TelegramBot from 'node-telegram-bot-api' 
import config from './config'
const express = require('express')
const app = express()
const database = require('./database')

database.initializeMongo();


const TOKEN = config.token
const bot = new TelegramBot(TOKEN, { polling:true })

app.get('/botMessage', function (req, res) {
    database.Bots.find(function (err, bots) {
      if (err) res.status(500).send({ error: err });
      console.log(bots);
      res.json(bots);
    })
})

bot.on('message', msg => {
    console.log( msg)
    const { chat: { id }} = msg
    bot.sendMessage(id, 'Pong')
})
