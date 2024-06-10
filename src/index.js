const express = require('express');
const router = require('./routes/route');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", router);
app.listen(PORT, () => {
    console.log("Initial server on: "+PORT);
});