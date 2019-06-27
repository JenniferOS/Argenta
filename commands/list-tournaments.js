var request = require("request");
var { challonge } = require('../config.json')

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
                //message.channel.send('**Tournament** || **Id**');
                //console.log('Torneo || Status');
                let msgHeader = "**Tournament** || **Id**";
                let msg = "";
                result.forEach(element => {
                    msg = msg + '**'+ element.tournament.name + ':** ' + element.tournament.url + '\n';
                });
                message.channel.send(msgHeader + '\n\n' + msg);
            } else if (flag == '-D') {
                // bandera -D significa Details
                let msg = "";
                result.forEach(element => {
                    msg = msg + '`Tournament: `' +  '**__' + element.tournament.name + '__**' + '\n' 
                          + 'Description: ' + element.tournament.description + '\n'
                          + 'id: ' + element.tournament.url + '\n'
                          + 'Status: ' + element.tournament.progress_meter + '%' + '\n\n';
                });

                message.channel.send(msg);
            }
        });

    },
};