var request = require("request");
var { challonge } = require('../config.json')
const Discord = require('discord.js');

module.exports = {
    name: 'tls',
    description: 'tls: tournament list. flags soon...',
    execute(message, arg) {

        request.get("https://api.challonge.com/v1/tournaments.json?api_key="+challonge, (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            let result = JSON.parse(body);
            //console.dir(result);

            let flag = arg;
            if (flag == '') {
                message.channel.send('**Torneo** || **Status**');
                console.log('Torneo || Status');
                result.forEach(element => {
                    message.channel.send('**'+element.tournament.name+':** '+element.tournament.progress_meter+'%');
                    console.log('**'+element.tournament.name+':** '+element.tournament.progress_meter+'%');
                });
            }
        });

    },
};