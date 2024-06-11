const serviceMessage = require('../service/api.service');

const verify = (req, res) => {
    try {
        const accessToken = "TOKEN_WEB_FOR_META";
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if(challenge && token && (accessToken == token)) {
            res.send(challenge);
        } else {
            res.status(400).send({error: 'can not get token or challenge'});
        }
        console.log(req);
    } catch (error) {
        res.status(400).send(error);
    }
}

const recive = (req, res) => {
    try {
        const entry = (req.body["entry"])[0];
        const change = (entry.changes[0]);
        const value = change.value;
        const messages = value.messages;
        if(messages) {
            const message = messages[0];
            const number = message.from;
            const text = message.text.body;
            serviceMessage.sendMessageTo(text, number);
            res.send("EVENT_RECEIVED");
        }
    } catch (error) {
        console.log("Controller error:", JSON.stringify(error));
        res.send("EVENT_RECEIVED");
    }
}

module.exports = {
    verify,
    recive
}