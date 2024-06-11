const https = require('https');

function sendMessageTo(text, number) {
    try {
        const data = verifyText(text);
        sendRequestMessage(data);
    } catch (error) {
        console.log("Has error send message: ", JSON.stringify(error));
    }
}

function responseButtons(replyData, number) {
    try {
        const data = verifyReplyBtn(replyData);
        sendRequestMessage(data);
    } catch (error) {
        console.log("Has error send message: ", JSON.stringify(error));
    }
}

//MARK: - FUNC PROCESS RESPONSE
function sendRequestMessage(data) {
    const options = getOptions(data);
    console.log("Data", data);
    console.log("Options", JSON.stringify(options));
    const req = https.request(options, res => {
        res.on("data", d => {
            process.stdout.write(d);
        });
    });
    req.write(data);
    req.end();
}

function getOptions(data) {
    return {
        host: "graph.facebook.com",
        path: "/v19.0/373619872493809/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAANYUUZAE8DgBO0ZAzGZBNifCyAg9eYECdKE7RbbLxGQDPls2kSVpK9fNQIloEzvBY27jEhtDIZCaT63DWZAwd3ROVoyYXUiZBWlGpHWroArx5mLfi6cVoCrk9qbNCM2XiPGvWdProM7iY60T32HpYA2wjjy6IVxmh8Se1HRqKbeUtuUu5ykFeirnalsBPz5Hqht8VwTdbR3RAO18tMqONs3OMXoomaDKnSTwZD"
        }
    };
}

function verifyText(text) {
    text = text.toLowerCase();
    let bodyMessage = "";
    if(text.includes("hola")) {
        bodyMessage = getTextPlain(1);
        return JSON.stringify(getMessage(bodyMessage));
    } else if(text.includes("información") || text.includes("info")) {
        bodyMessage = getTextPlain(2);
        return JSON.stringify(getMessagesButtons(bodyMessage, 1));
    }
}

function verifyReplyBtn(btnData) {
    let bodyMessage = "";
    if(btnData.id == "btn-gd2") {
        bodyMessage = `${getTextPlain(3)} ${getAppName(2)}`;
        return JSON.stringify(getMessagesButtons(bodyMessage, 2, "GD2"));
    } else if(btnData.id == "btn-gd3") {
        bodyMessage = `${getTextPlain(3)} ${getAppName(3)}`;
        return JSON.stringify(getMessagesButtons(bodyMessage, 2, "GD3"));
    } else if(btnData.id == "btn-gd4") {
        bodyMessage = `${getTextPlain(3)} ${getAppName(4)}`;
        return JSON.stringify(getMessagesButtons(bodyMessage, 2, "GD4"));
    } else {
        return getMenuOptions(btnData.id);
    }
}

function getMenuOptions(id) {
    let bodyMessage = "";
    if(id.includes("btn-linkApp")) {
        if(id.includes("GD2")) {
            bodyMessage = `${getTextPlain(5)} ${getLinkApp(2)}`;
        } else if(id.includes("GD3")) {
            bodyMessage = `${getTextPlain(5)} ${getLinkApp(3)}`;
        } else {
            bodyMessage = `${getTextPlain(5)} ${getLinkApp(4)}`;
        }
        return JSON.stringify(getMessage(bodyMessage));
    }
    if(id.includes("btn-linkManual")) {
        if(id.includes("GD2")) {
            bodyMessage = `${getTextPlain(4)} ${getLinkManual(2)}`;
        } else if(id.includes("GD3")) {
            bodyMessage = `${getTextPlain(4)} ${getLinkManual(3)}`;
        } else {
            bodyMessage = `${getTextPlain(4)} ${getLinkManual(4)}`;
        }
        return JSON.stringify(getMessage(bodyMessage));
    }
    if(id.includes("btn-emailSupport")) {
        bodyMessage = getTextPlain(6);
        return JSON.stringify(getMessage(bodyMessage));
    }
}

function getMessage(body) {
    return {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "523231103856",
        "type": "text",
        "text": {
            "preview_url": true,
            "body": body
        }
    };
}

function getMessagesButtons(body, typeMenu, idApp) {
    return {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "523231103856",
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": body
            },
            "action": {
                "buttons": getBtnMenuAplication(typeMenu, idApp)
            }
        }
    }
}

function getBtnMenuAplication(type, idApp) {
    switch (type) {
        case 1:
            return [
                {
                    "type": "reply",
                    "reply": {
                        "id": "btn-gd2",
                        "title": "Gastos Diarios 2"
                    }
                },
                {
                    "type": "reply",
                    "reply": {
                        "id": "btn-gd3",
                        "title": "Gastos Diarios 3"
                    }
                },
                 {
                    "type": "reply",
                    "reply": {
                        "id": "btn-gd4",
                        "title": "Gastos Diarios 4"
                    }
                }
            ]
        case 2:
            return [
                {
                    "type": "reply",
                    "reply": {
                        "id": `btn-linkApp${idApp}`,
                        "title": "Obtener aplicación"
                    }
                },
                {
                    "type": "reply",
                    "reply": {
                        "id": `btn-linkManual${idApp}`,
                        "title": "Manual de uso"
                    }
                },
                 {
                    "type": "reply",
                    "reply": {
                        "id": `btn-emailSuppor${idApp}`,
                        "title": "Ayuda/Sporte"
                    }
                }
            ]
        default:
            break;
    }
}

function getTextPlain(type) {
    switch (type) {
        case 1:
            return `Hola ¿Como estas?\nEn que podemos ayudarte`;
        case 2: 
            return `Por favor, indiquenos, ¿Cuál es la aplicación que está utilizando?`;
        case 3:
            return `Seleccione una opción para su aplicación de:`;
        case 4:
            return `Puedes consultar el manual de usuario desde el siguiente enlace:`
        case 5:
            return `Descarga y prueba la aplicación desde Google Play: `
        case 6:
            return `Si presentas inconvenientes mayores contactate a soporte: support@encodemx.com`;
        default:
            return "No pudimos identificar lo que solicitas, intente de nuevo."
    }
}

function getLinkApp(version) {
    switch (version) {
        case 2:
            return "https://play.google.com/store/apps/details?id=mic.app.gastosdiarios_clasico";
        case 3: 
            return "https://play.google.com/store/apps/details?id=mic.app.gastosdiarios";
        case 4: 
            return "https://play.google.com/store/apps/details?id=com.encodemx.gastosdiarios4";
        default:
            break;
    }
}

function getLinkManual(version) {
    switch (version) {
        case 2:
            return "https://encodemx.com/daily-expenses-2";
        case 3: 
            return "https://encodemx.com/daily-expenses-3";
        case 4: 
            return "https://encodemx.com/daily-expenses-4";
        default:
            break;
    }
}

function getAppName(version) {
    switch (version) {
        case 2:
            return `Gastos Diarios 2`;
        case 3:
            return `Gastos Diarios 3`;
        case 4:
            return `Gastos Diarios 4`;
        default:
            break;
    }
}

module.exports = {
    sendMessageTo,
    responseButtons   
}