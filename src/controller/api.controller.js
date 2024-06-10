const verify = (req, res) => {
    res.send("Verificado");
}

const recive = (req, res) => {
    res.send("Recivido");
}

module.exports = {
    verify,
    recive
}