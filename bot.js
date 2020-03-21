const Discord = require('discord.io');
const logger = require('winston');
const unirest = require('unirest');
const fetch = require('node-fetch');

var body = '';
let url = "https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest?iso2=VN";
var req = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php";
let settings = { method: "Get" };
let settings2 = {
  "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  "x-rapidapi-key": process.env.apiKey
};

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

        fetch(req, setting2)
          .then(res = res.json())
          .then((json) => {
            var statsAll = {
              confirmed = 0,
              deaths = 0,
              recovered = 0,
              new_cases = 0,
              new_deaths = 0,
            };
            json.forEach(obj => {
              statsAll.recovered += obj.recovered;
              statsAll.confirmed += obj.confirmed;
              statsAll.deaths += obj.deaths;
              statsAll.new_cases += obj.new_cases;
              statsAll.new_deaths += obj.new_deaths;
            })
          })

        fetch(url, settings)
          .then(res => res.json())
          .then((json) => {
            var stats = {
              confirmed: 0,
              deaths: 0,
              recovered: 0
            };
            json.forEach(obj => {
              stats.recovered += obj.recovered;
              stats.confirmed += obj.confirmed;
              stats.deaths += obj.deaths;
            });
        bot.sendMessage({
          to: channelID,
          message: 'Current Corona Virus Statistics \n' +
            ':mask:' + ' ' + 'Confirmed: ' + body.total_cases + '\n' +
            ':skull:' + ' ' + 'Deaths: ' + body.total_deaths + '\n' +
            ':repeat:' + ' ' + 'Recovered: ' + body.total_recovered + '\n' +
            ':mask:' + ' ' + 'New cases: ' + body.new_cases + '\n' +
            ':skull_crossbones:' + ' ' + 'New Deaths: ' + body.new_deaths + '\n' + '\n' +
            '------------------------------------' + '\n' + '\n' +
            'Current Corona Virus Statistics in Vietnam \n' +
            ':mask:' + ' ' + 'Confirmed: ' + stats.confirmed + '\n' +
            ':skull:' + ' ' + 'Deaths: ' + stats.deaths + '\n' +
            ':repeat:' + ' ' + 'Recovered: ' + stats.recovered + '\n' +
            ':date:' + ' ' + 'Statistic taken at: ' + body.statistic_taken_at
        })
      });

    // console.log(typeof (body));
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
