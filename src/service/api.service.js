const https = require('https');

function sendMessageTo(text, number) {
    try {
        let data = JSON.stringify({
            "messaging_product": "whatsapp",    
            "recipient_type": "individual",
            "to": "523231103856",
            "type": "text",
            "text": {
                "preview_url": true,
                "body": "Vista encodemx.com"
            }
        });        
        const options = {
            host: "graph.facebook.com",
            path: "/v19.0/373619872493809/messages",
            method: "POST",
            body: data,
            headers: {
                "Content-Type" : "application/json",
                Authorization: "Bearer EAANYUUZAE8DgBOwmZADzlr0kx2bEEjm7CNCgol56PL6Ixm3CVMZA9UuCgzb71FeM1gIE2lDUFvuDqwbjf14yAd68N8Qxg7P1qh4OKEZCinoY2ZCEiGkaHKno2TLsDlwuQwUpprvZCcNsjDnbd7rE7nuPXOMYKTZB7FIgbp7NZC98Jzrf1NvrnvEdmotPNRgWTG2rLI5OwmhwaJYANS9CUiO1hQrZCFmyTDZBEjwgUZD"
            }
        };
        console.log("Values request", JSON.stringify(options));
        const req = https.request(options, res => {
            res.on("data", d => {
                process.stdout.write(d);
            });
        });
    
        req.write(data);
        req.end();
    } catch (error) {
        console.log("Has error send message: ", JSON.stringify(error));
    }
}

module.exports = {
    sendMessageTo
}