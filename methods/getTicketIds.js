const Ticket = require("../models/ticket");

async function getTicketIds() {
    try {
        const result = await Ticket
        .find()
        .select("tickets user")
        .populate("user")
        .exec()
        return result
        .map(result => result.user)
        .map(users => users[0].tlgid)
    } 
    catch (err) {
        console.log(err)
    }
}

module.exports = getTicketIds;