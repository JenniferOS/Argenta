var request = require("request");
var { challonge } = require('../config.json')
const Discord = require('discord.js');

module.exports = {
    name: 'tournament',
    description: 'tls: tournament list. flags soon...',
    execute(message, arg) {
        let [ arg1 ] = arg;
        request.get("https://api.challonge.com/v1/tournaments/"+arg1+".json?api_key="+challonge, (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            let result = JSON.parse(body);
            //console.dir(result);
            var startedAt = "";
            if (result.tournament.started_at == null) {
                startedAt = "tournament hasn't started yet";
            }else {
                startedAt = result.tournament.started_at;
            }

            const exampleEmbed = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTitle(result.tournament.name)
                .setURL(result.tournament.full_challonge_url)
                .setAuthor(message.author.username)
                .setDescription(result.tournament.name)
                .setThumbnail(message.author.avatarURL)
                .addBlankField()
                .addField('Description', result.tournament.name, true)
                .addField('Status', result.tournament.progress_meter + '%')
                .addField('Created at', result.tournament.created_at)
                .addField('Started at', startedAt)
                .addField('Tournament Type', result.tournament.tournament_type)
                .addField('Game name', result.tournament.game_name)
                .setTimestamp()
                .setImage(result.tournament.live_image_url)
                .setFooter('Momo', 'https://github.com/jenniferos');

            message.channel.send(exampleEmbed);
            
        });

    },
};