const https = require('https');

function sendMessageTo(text, number) {
    try {
        var body = "";
        text = text.toLowerCase();
        if(text.includes("hola")) {
            body =`Hola ¿Como estas?\nEn que podemos ayudarte`;
        } else {
            body = `Hola\n\n¡Gracias por escribirnos!\n\n¿Cuál es la aplicación que utiliza?\n\n1) Gastos Diarios 2\n2) Gastos Diarios 3\n3) Gastos Diarios 4\n4)Gastos de compra\n\nEnvie la opcion de su respuesta\n\nSaludos\nEncodemx`
        }
        let data = JSON.stringify({
            "messaging_product": "whatsapp",    
            "recipient_type": "individual",
            "to": "523231103856",
            "type": "text",
            "text": {
                "preview_url": true,
                "body": body
            }
        });        
        const options = {
            host: "graph.facebook.com",
            path: "/v19.0/373619872493809/messages",
            method: "POST",
            body: data,
            headers: {
                "Content-Type" : "application/json",
                Authorization: "Bearer EAANYUUZAE8DgBO0ZAzGZBNifCyAg9eYECdKE7RbbLxGQDPls2kSVpK9fNQIloEzvBY27jEhtDIZCaT63DWZAwd3ROVoyYXUiZBWlGpHWroArx5mLfi6cVoCrk9qbNCM2XiPGvWdProM7iY60T32HpYA2wjjy6IVxmh8Se1HRqKbeUtuUu5ykFeirnalsBPz5Hqht8VwTdbR3RAO18tMqONs3OMXoomaDKnSTwZD"
            }
        };
        /* console.log("Values request", JSON.stringify(options)); */
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