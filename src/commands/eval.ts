import * as Discord from "discord.js";
import {config} from "../config"
const tokenuyari = "-- Gizli Mülk --"
export const preless = async (client, message, args, commands) => { 
  
if(!args[0]) {
    const embed = new Discord.MessageEmbed()
        .setDescription(`Hata`)
        .setTimestamp()
    message.channel.send({embed})
    return
}
const code = args.join(' ');
if(code.match(/(client.token)/g)) {
    const newEmbed = new Discord.MessageEmbed()
        .addField('Hata çıktı;', `\`\`\`xl\n${tokenuyari}\`\`\``)
        .setColor('#FF0000');
    message.channel.send(newEmbed);
    return
}

function clean(text) {
    if (typeof text !== 'string')
        text = require('util').inspect(text, { depth: 0 })
    text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
    return text;
};

const evalEmbed = new Discord.MessageEmbed()
try {
    var evaled = clean(await eval(code));
    if(evaled.startsWith('NDc4O')) evaled = tokenuyari;
    if (evaled.constructor.name === 'Promise') evalEmbed.setDescription(`\`\`\`\n${evaled}\n\`\`\``)
    else evalEmbed.setDescription(`\`\`\`xl\n${evaled}\n\`\`\``)
   
    message.channel.send(evaled, {code:"xl"});
}
catch (err) {
    evalEmbed.addField('Hata çıktı;', `\`\`\`xl\n${err}\n\`\`\``);
    evalEmbed.setColor('#FF0000');
    message.channel.send(evalEmbed);
}
}
export const ek = {
    komut: "eval",
    aciklama: "Sahip komutu",
    kategori: "sahip",
    perm:10,
    bakım: true
};