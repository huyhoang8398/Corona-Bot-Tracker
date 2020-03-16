const Discord = require('discord.io');
const logger = require('winston');
const Request = require('request');
const https = require('https')
var unirest = require('unirest');

var body = '';
var bodyVietnam = '';

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

        var reqByCountry = unirest("GET", "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php");

        reqByCountry.headers({
          "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
          'Accept': 'application/json',
          'Content-Type':'application/json',
          "x-rapidapi-key": process.env.apiKey
        });
        reqByCountry.end(function (res) {
          if (res.error) throw new Error(res.error);
          bodyVietnam = JSON.parse(res.body);
          console.log(bodyVietnam.countries_stat[56]);
          bodyVietnam = bodyVietnam.countries_stat[56];
          console.log(typeof(bodyVietnam));
          return bodyVietnam;
          // console.log(res.body);
        });
        // console.log(bodyVietnam);
        // console.log(typeof (bodyVietnam));

        req.headers({
          "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
          'Accept': 'application/json',
          'Content-Type':'application/json',
          "x-rapidapi-key": process.env.apiKey
        });

        req.end(function (res) {
          if (res.error) throw new Error(res.error);
          body = JSON.parse(res.body);
          return body;
          // console.log(res.body);
          // console.log(typeof(res));
        });
        // console.log(body);
        // console.log(typeof (body));
        bot.sendMessage({
          to: channelID,
          message: 'Current Corona Virus Statistics \n' + '\n' +
            ':mask:' + ' ' + 'Confirmed: ' + body.total_cases + '\n' + '\n' +
            ':skull:' + ' ' + 'Deaths: ' + body.total_deaths + '\n' + '\n' +
            ':repeat:' + ' ' + 'Recovered: ' + body.total_recovered + '\n' + '\n' +
            ':mask:' + ' ' + 'New cases: ' + body.new_cases + '\n' + '\n' +
            ':skull_crossbones:' + ' ' + 'New Deaths: ' + body.new_deaths + '\n' + '\n' +
            '------------------------------------' + '\n' + '\n' +
            'Current Corona Virus Statistics in Vietnam \n' + '\n' +
            ':mask:' + ' ' + 'Confirmed: ' + bodyVietnam.cases + '\n' + '\n' +
            ':skull:' + ' ' + 'Deaths: ' + bodyVietnam.deaths + '\n' + '\n' +
            ':repeat:' + ' ' + 'Recovered: ' + bodyVietnam.total_recovered + '\n' + '\n' +
            ':mask:' + ' ' + 'New cases: ' + bodyVietnam.new_cases + '\n' + '\n' +
            ':skull_crossbones:' + ' ' + 'New Deaths: ' + bodyVietnam.new_deaths + '\n' + '\n' +
            ':skull_crossbones:' + ' ' + 'Serious Critical: ' + bodyVietnam.serious_critical + '\n' + '\n' +
            ':date:' + ' ' + 'Statistic taken at: ' + body.statistic_taken_at
        })
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
          //          message: '╭∩╮( ° ͜ʖ͡°)╭∩╮ ' + '<@371660303672541197>'
          message: 'https://media.discordapp.net/attachments/538397759741362179/688128156174909568/69424511_2564724586917511_6843079252783398912_n.png?width=759&height=566'
        })
        break;
      case 'dota':
        bot.sendMessage({
          to: channelID,
          message: 'let\'s play some dota!  ' + '@everyone' + '  ໒( ” •̀ ᗜ •́ ” )७'
        })
        break;
      case 'regret':
        bot.sendMessage({
          to: channelID,
          message: 'I immediately regret this decision' + ':cold_face:'
        })
        break;
      case 'thanks':
        bot.sendMessage({
          to: channelID,
          message: 'Thank you ' + '@everyone' + ':heart:' + ':heart:' + ':heart:'
        })
        break;
      case 'phicong':
        bot.sendMessage({
          to: channelID,
          message: 'stfu ' + '<@425894408714452993>' + ':mask:'
        })
    }
  }
});
