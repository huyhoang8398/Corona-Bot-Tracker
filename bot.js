const Discord = require('discord.io');
const logger = require('winston');
const Request = require('request');
const https = require('https')

const apiCaseOption = {
  hostname: 'apigw.nubentos.com',
  path: '/t/nubentos.com/ncovapi/1.0.0/cases',
  port: 443,
  method: 'GET',
  headers: {
    Accept: "application/json",
    Authorization: process.evn.apiKey
  }
}

const apiSuspectedOption = {
  hostname: 'apigw.nubentos.com',
  path: '/t/nubentos.com/ncovapi/1.0.0/cases/suspected',
  port: 443,
  method: 'GET',
  headers: {
    Accept: "application/json",
    Authorization: process.evn.apiKey
  }
}

const apiDeathOption = {
  hostname: 'apigw.nubentos.com',
  path: '/t/nubentos.com/ncovapi/1.0.0/deaths',
  port: 443,
  method: 'GET',
  headers: {
    Accept: "application/json",
    Authorization: process.evn.apiKey
  }
}

const apiRecoveredOption = {
  hostname: 'apigw.nubentos.com',
  path: '/t/nubentos.com/ncovapi/1.0.0/recovered',
  port: 443,
  method: 'GET',
  headers: {
    Accept: "application/json",
    Authorization: process.evn.apiKey
  }
}

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

        https.get(apiCaseOption, (response) => {

          var resultCase = ''
          response.on('data', function (chunk) {
            resultCase += chunk;
          });

          response.on('end', function () {
            resultCase = JSON.parse(resultCase);
            // console.log(typeof(resultCase));
            console.log(resultCase[0].cases);
          });

        });

        https.get(apiDeathOption, (response) => {

          var resultDeath = ''
          response.on('data', function (chunk) {
            resultDeath += chunk;
          });

          response.on('end', function () {
            resultDeath = JSON.parse(resultDeath);

            console.log(resultDeath[0].data);
          });

        });

        https.get(apiRecoveredOption, (response) => {

          var resultRecovered = ''
          response.on('data', function (chunk) {
            resultRecovered += chunk;
          });

          response.on('end', function () {
            resultRecovered = JSON.parse(resultRecovered);

            console.log(resultRecovered[0].data);
          });

        });

        https.get(apiSuspectedOption, (response) => {

          var resultSuspected = ''
          response.on('data', function (chunk) {
            resultSuspected += chunk;
          });

          response.on('end', function () {
            resultSuspected = JSON.parse(resultSuspected);

            console.log(resultSuspected[0].data);
          });

        });


        bot.sendMessage({
          to: channelID,
          message: 'Current Corona Virus Statistics \n' + '\n' + ':mask:' + ' ' + 'Confirmed: ' + resultCase[0].cases + '\n' + '\n'
            + ':mask:' + ' ' + 'Suspected: ' + resultSuspected[0].data + '\n' + '\n'
            + ':skull:' + ' ' + 'Deaths: ' + resultDeath[0].data + '\n' + '\n' +
            ':repeat:' + ' ' + 'Recovered: ' + resultRecovered[0].data
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
