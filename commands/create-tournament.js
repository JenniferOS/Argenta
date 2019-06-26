var request = require("request");
var { challonge } = require('../config.json')

module.exports = {
    name: 'create-tournament',
    description: 'Command for create tournaments with the challonge api',
    execute(message, args) {
        Request.post({
            "headers": { "content-type": "application/json" },
            "url": "https://api.challonge.com/v1/tournaments.json",
            "body": JSON.stringify({
                "api_key": challonge,
                "name": "the name of the tournament",
                "url": "5dbad23",
                "description": ""
            })
        }, (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            //console.dir(JSON.parse(body));
            message.channel.send('Torneo Creado');
        });
    },
};