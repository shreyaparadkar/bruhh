require('dotenv').config();
const Discord = require('discord.js');

const cmds = require('./cmds');

const client = new Discord.Client();

const PREFIX = "!bruh ";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`some dumb shit`, {
        type: 'PLAYING'
    });
});

client.on('message', msg => {
    if (msg.author.bot === true) return;
    if (msg.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = msg.content
            .trim().
            substring(PREFIX.length)
            .split(/\s+/);
        if (CMD_NAME in cmds.endpointsFrom) {
            cmds.apiCall(msg, cmds.endpointsFrom[CMD_NAME], msg.author, false, "");
        } else if (CMD_NAME in cmds.endpointsNameAndFrom) {
            cmds.apiCall(msg, cmds.endpointsNameAndFrom[CMD_NAME], msg.author, true, args);
        } else if (CMD_NAME == "ffs") {
            rand = Math.floor(Math.random() * Object.keys(cmds.endpointsFrom).length);
            cmds.apiCall(msg, cmds.endpointsFrom[Object.keys(cmds.endpointsFrom)[rand]], msg.author, false, "");
        } else if (CMD_NAME == "help") {
            cmds.help(msg);
        }
    }
});

client.login(process.env.TOKEN);