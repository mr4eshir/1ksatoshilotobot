function botStart() {
    return bot.onText(/\/start/, (msg, match) => {
        const opts = {
            reply_to_message_id: msg.message_id,
            reply_markup: JSON.stringify({
                keyboard: [['Купить_билет', 'Мои_билеты'],['price', 'height', 'width']]
            }),
            resize_keyboard: true
        };
        bot.sendMessage(msg.chat.id, 'Hi. I am a simple bot. Have fun!', opts);
    });
}
module.exports = botStart;