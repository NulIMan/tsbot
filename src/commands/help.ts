import * as Discord from "discord.js";
import {config} from "../config"
export const preless = async (client, message, args, commands) => { 
    const help = {}
		commands.forEach((command) => {
			const cat = command.ek.kategori;
			if (!help.hasOwnProperty(cat)) help[cat] = [];
			help[cat].push(`\`${command.ek.komut} » ${command.ek.aciklama}\``);
		})
	   var embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setTimestamp()
  
	.setFooter(`${commands.size} komut var`);
    for (const kategori in help) {
        embed.addField(kategori.charAt(0).toUpperCase() + kategori.slice(1), help[kategori].ek.aciklama.join("\n"));
     }
    message.channel.send(embed);
};

export const ek = {
    komut: "yardım",
    aciklama: "Yardım Komutu",
    kategori: "genel",
    bakım:true
};