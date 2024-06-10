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
    } catch (error) {
        res.status(400).send(error);
    }
}

const recive = (req, res) => {
    res.send("Recivido");
}

module.exports = {
    verify,
    recive
}