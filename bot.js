const Discord = require('discord.io');
const logger = require('winston');
const Request = require('request');

const Api = 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22confirmed%22%7D%2C%20%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22deaths%22%7D%2C%20%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22recovered%22%7D%5D';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
  token: process.env.API_TOKEN,
 // token: auth.token,
  autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            // Just add any case commands if you want to..
            case 'corona':
                Request({
                    url: Api,
                    method: 'GET',
                    json: true,
                    gzip: true,
                }, (err, res, body) => {
                    var stats = {
                        confirmed: 0,
                        deaths: 0,
                        recovered: 0
                    };
                    body.features.forEach(obj => {
                        stats.recovered += obj.attributes.recovered;
                        stats.confirmed += obj.attributes.confirmed;
                        stats.deaths += obj.attributes.deaths;
                    });
                    console.log(stats.recovered);
                    console.log(stats.confirmed);
                    console.log(stats.deaths);
                    bot.sendMessage({
                        to: channelID,
                        message: 'Current Corona Virus Statistics \n' + '\n' + ':mask:' + ' ' + 'Confirmed: ' + stats.confirmed + '\n' + '\n'
                            + ':skull:' + ' ' + 'Deaths: ' + stats.deaths + '\n' + '\n' +
                            ':repeat:' + ' ' + 'Recovered: ' + stats.recovered
                    })
                })
                break;
            case 'nlag':
                bot.sendMessage({
                    to: channelID,
                    message: 'Fuck ' + '<@343101922405777408>'
                })
                break;
        }
    }
});
