import { config, emoji } from "./config";
import * as Discord from "discord.js";
import * as chalk from "chalk";
import * as fs from "fs";

interface ayarlarInt {
	token: string,
	prefix: string,
	version: string,
	klasor: string
};

const ayarlar: ayarlarInt = ({
	"token": "NzUxMzU5NDI3ODQzNTg4MjE5.X1H7_w.YR1an30Axw_83BMllR9rEOOqsHM",
	"prefix": "ts?",
	"version":"0.0.1",
	"klasor":"commands"
});

const commands: Discord.Collection = new Discord.Collection();
const client: Discord.Client = new Discord.Client();

fs.readdir("./commands", (err: any, files: string[]) => {
	if (err) return console.error(`${chalk.redBright("Hata çıktı;")}\n${err}\n\n${chalk.greenBright("Hatayı düzeltmen için bir kaç tavsiye vereceğim. İlk öncelikle ayarları doğru girdiğinden ve boş bırakmadığından emin ol. Daha sonra kendin eklediğin komutlara iyice bak ve örnek komutla karşılaştır. Hatan varsa düzelt. Eğer kodda hata olduğunu düşünüyorsan bildirmekten çekinme!")}`)
	else if (files.length == 0) return console.log(`${chalk.redBright("Üzgünüm ama hiçbir komut bulunamadı!")}`)
	else if (files.filter((f: string) => f.split(".").pop() == "js").length == 0) return console.log(`${chalk.redBright("Üzgünüm ama hiçbir komut bulunamadı!")}`)
	
	console.log(`${chalk.yellow(jsfiles.length)} komut yüklenecek.`)
	
	files.filter((f: string) => f.split(".").pop() == "js").forEach((f: string) => {
		const cmd = require(`./commands/${f}`);
		
		commands.set(props.ek.komut, props)
		console.log(`Yüklenen komut: ${props.ek.komut}`)
	});
});

client.on("ready", async() => {
	console.log(`--- ${client.user.username} Started ---`);
})

interface permListInt {
	level: number,
	tr_name: string, 
	dc_api_name: string
};

const permList: permListInt[] = [
	{ level: 1, tr_name: "Mesajları yönet", dc_api_name: "MANAGE_MESSAGES" },
	{ level: 2, tr_name: "Üyeleri at", dc_api_name: "KICK_MEMBERS" },
	{ level: 3, tr_name: "Üyeleri yasakla", dc_api_name: "BAN_MEMBERS" },
	{ level: 4, tr_name: "Mesajları yönet", dc_api_name: "MANAGE_MESSAGES" },
	{ level: 5, tr_name: "Emojileri yönet", dc_api_name: "MANAGE_EMOJIS" },
	{ level: 6, tr_name: "Kanalları yönet", dc_api_name: "MANAGE_CHANNELS" },
	{ level: 7, tr_name: "Rolleri yönet", dc_api_name: "MANAGE_ROLES" },
	{ level: 8, tr_name: "Yönetici", dc_api_name: "ADMINISTRATOR" },
	{ level: 9, tr_name: "Sunucu sahibi", dc_api_name: "GUILD_OWNER" },
	{ level: 10, tr_name: "Bot sahibi", dc_api_name: "BOT_OWNER" }
]; //  9 ve 10. permdek dc_api_name keyfi olarak yazdım. (Boş gözükmesin diye xd)

client.on("message", async(message: Discord.Message) => {
	if (message.author.bot || !message.content.startsWith(ayarlar.prefix)) return;
	const command: string = message.content.split(' ')[0].slice(ayarlar.prefix.length);
	const args: Array<string> = message.content.split(' ').slice(1);
	
	if (!commands.has(command)) return;
	const cmd: any = commands.get(command);
	
	if (cmd.ek.bakim && message.author.id !== config.devs) return message.channel.send(
		new Discord.MessageEmbed()
		.setDescription(`${emoji.no} **${cmd.ek.komut}** şuan bakımda!`)
		.setColor(config.hatarenk)
		.setTimestamp()
	);
	
	const perm: permListInt = permList.find((permission: permListInt) => permission.level == cmd.ek.perm);
	
	if (perm && ![9,10].includes(perm.level) && !message.member.hasPermission(perm.dc_api_name)) return message.channel.send(
		new Discord.MessageEmbed()
		.setDescription(`${emoji.no} Bu komutu kullanmak için **${perm.tr_name}** yetkisine sahip olmalısın!`)
		.setColor(config.hatarenk)
		.setTimestamp()
	);
	else if (perm && [9,10].includes(perm.level) && perm.level == 9 ? message.guild.ownerID !== message.author.id : message.author.id !== config.devs) return message.channel.send(
		new Discord.MessageEmbed()
		.setDescription(`${emoji.no} Bu komutu kullanmak için **${perm.tr_name}** olmalısın!`)
		.setColor(config.hatarenk)
		.setTimestamp()
	);
	
	return await cmd.preless(client, message, args, commands);
});

client.login(ayarlar.token)
