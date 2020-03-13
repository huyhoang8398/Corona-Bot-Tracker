const Discord = require('discord.io');
const logger = require('winston');
const Request = require('request');
const https = require('https')
var unirest = require("unirest");

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
        var req = unirest("GET", "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php");

        req.headers({
          "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
          "x-rapidapi-key": process.env.apiKey
        });
        
        
        req.end(function (res) {
          if (res.error) throw new Error(res.error);
          res=JSON.parse(res.body);

          console.log(res);
          console.log(typeof(res));
        });

        // bot.sendMessage({
        //   to: channelID,
        //   message: 'Current Corona Virus Statistics \n' + '\n' + ':mask:' + ' ' + 'Confirmed: ' + outputCase + '\n' + '\n'
        //     + ':mask:' + ' ' + 'Suspected: ' + outputSuspec + '\n' + '\n'
        //     + ':skull:' + ' ' + 'Deaths: ' + outputDeath + '\n' + '\n' +
        //     ':repeat:' + ' ' + 'Recovered: ' + outputRecover
        // })
        break;
      case 'nlag':
        bot.sendMessage({
          to: channelID,
          message: '( ° ͜ʖ͡°)╭∩╮ ' + '<@343101922405777408>'
        })
        break;
      case 'bald':
        bot.sendMessage({
          to: channelID,
          message: '╭∩╮( ° ͜ʖ͡°)╭∩╮ ' + '<@371660303672541197>'
        })
        break;
      case 'dota':
        bot.sendMessage({
          to: channelID,
          message: 'let\'s play some dota!  ' + '@everyone' + '  ໒( ” •̀ ᗜ •́ ” )७'
        })
        break;
    }
  }
});