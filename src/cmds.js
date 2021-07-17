const axios = require('axios');
const Discord = require('discord.js');

const baseURL = "https://foaas.com";

const endpointsFrom = {
    asshole: "/asshole", awesome: "/awesome", bag: "/bag",
    because: "/because", bucket: "/bucket", flying: "/flying", ftfy: "/ftfy",
    fts: "/fts", give: "/give", idea: "/idea", immensity: "/immensity",
    life: "/life", maybe: "/maybe", me: "/me", mornin: "/mornin",
    no: "/no", programmer: "/programmer", question: "/question",
    ratarse: "/ratarse", retard: "/retard", rtfm: "/rtfm", sake: "/sake",
    shit: "/shit", single: "/single", thanks: "/thanks", that: "/that",
    this: "/this", too: "/too", tucker: "/tucker", what: "/what",
    yeah: "/yeah", zayn: "/zayn", zero: "/zero"
}

const endpointsNameAndFrom = {
    back: "/back", bday: "/bday", donut: "/donut", ing: "/ing",
    keep: "/keep", legend: "/legend", linus: "/linus", look: "/look",
    madison: "/madison", off: "/off", outside: "/outside", problem: "/problem",
    rockstar: "/rockstar", shakespeare: "/shakespeare", shutup: "/shutup",
    thinking: "/thinking", think: "/think", thumbs: "/thumbs", understand: "/understand",
    waste: "/waste", yoda: "/yoda", you: "/you"
}

const apiCall = async (msg, endpoint, from, nameExists, to) => {
    if (nameExists && to.length == 0) {
        msg.channel.send("Enter name of the receiver of this message!");
        return;
    }
    if (nameExists) {
        const res = await axios.get(baseURL + endpoint + "/" + to + "/" + from);
        const message = res.data.message
        const messageEmbed = new Discord.MessageEmbed().setDescription(message).setColor("BLURPLE")
        msg.channel.send(messageEmbed);
        return;
    }
    const res = await axios.get(baseURL + endpoint + "/" + from);
    const message = res.data.message
    const messageEmbed = new Discord.MessageEmbed().setDescription(message).setColor("BLURPLE")
    msg.channel.send(messageEmbed);
}

const help = (msg) => {
    let fromCmds = ""
    for (const x in endpointsFrom) {
        fromCmds+=x+" | "
    }
    let nameFromCmds = ""
    for (const x in endpointsNameAndFrom) {
        nameFromCmds+=x+" | "
    }
    const info = {
        desc: `This is a bot that uses FOAAS api to creatively tell off everyone you are pissed at!
        Use prefix "!bruh" before any of the commands listed below`,
        from: fromCmds,
        name: nameFromCmds
    }
    const messageEmbed = new Discord.MessageEmbed()
        .setTitle('BRUHHHH')
        .setDescription(info.desc)
        .addField('Use one of the following commands to tell people to f-off', info.from)
        .addField('Use one of the following commands to call out people and tell them particularly to piss off', info.name)
        .setColor("AQUA")
    msg.channel.send(messageEmbed);
}

module.exports = { endpointsFrom, endpointsNameAndFrom, apiCall, help };