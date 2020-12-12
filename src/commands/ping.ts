import * as Discord from "discord.js"

import {config} from "../config"
export const preless = async (client, message, args, commands) => {
   const msg = await message.channel.send("Bekle biraz. Gerekli verileri hesaplıyorum...");
	var ping = Math.round(message.createdTimestamp - msg.createdTimestamp)

	if(ping < 0) {
		var ping = Math.round(msg.createdTimestamp - message.createdTimestamp)
	}

	msg.edit(`Mesaj gecikme süresi: ${ping} milisaniye\nBot gecikme süresi: ${client.ws.ping} milisaniye`)
}
export const ek = {
    komut: "ping",
    aciklama: "Botun ping değerini ölçer",
    kategori:"genel",
    bakim:true
}