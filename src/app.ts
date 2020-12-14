import * as Discord from "discord.js"
import * as Eris from "eris"
import * as fs from "fs"
import * as chalk from "chalk"
import {config} from "./config"
import {emoji} from "./config"
import * as croxy from "croxydb"
import * as adapter from "croxydb/adapters/jsondb"
const db = new croxy(adapter, {
	"dbName":"database",
	"dbFolder":"prelessdata",
	"noBlankData": true,
    "readable": true,
    "language": "tr"
})
const ayarlar = ({
	"token": "NzUxMzU5NDI3ODQzNTg4MjE5.X1H7_w.YR1an30Axw_83BMllR9rEOOqsHM",
	"prefix": "ts?",
	"version":"0.0.1",
	"klasor":"commands"
  });
  const commands = new Discord.Collection()
  const client: Discord.Client = new Discord.Client();

fs.readdir(`./src/commands/`, async(err, files) => {
	console.log(files || err)
var jsfiles = files.filter(f => f.split(".").pop() === "ts")

	if(jsfiles.length <= 0) {
		console.log(`${chalk.redBright("Üzgünüm ama hiçbir komut bulunamadı!")}`)
	} else {
		if (err) {
			console.error(`${chalk.redBright("Hata çıktı;")}\n${err}\n\n${chalk.greenBright("Hatayı düzeltmen için bir kaç tavsiye vereceğim. İlk öncelikle ayarları doğru girdiğinden ve boş bırakmadığından emin ol. Daha sonra kendin eklediğin komutlara iyice bak ve örnek komutla karşılaştır. Hatan varsa düzelt. Eğer kodda hata olduğunu düşünüyorsan bildirmekten çekinme!")}`)
		}
		console.log(`${chalk.yellow(jsfiles.length)} komut yüklenecek.`)

		jsfiles.forEach(f => {
			let props = require(`./${ayarlar.klasor}/${f}`)
			commands.set(props.ek.komut, props)
			
			console.log(`Yüklenen komut: ${props.ek.komut}`)
		})
	}
})

client.on("message", async message => {
	if (message.author.bot) return
	if (!message.content.startsWith(ayarlar.prefix)) return
	var command = message.content.split(' ')[0].slice(ayarlar.prefix.length)
	var args = message.content.split(' ').slice(1)
	
	if (commands.has(command)) {
	var cmd = commands.get(command) as any
			if (db.get(`${message.author.id}.karaliste`)) {
		const embed = new Discord.MessageEmbed()
			.setDescription(`${emoji.no} Hey sen **${db.get(`${message.author.id}.karaliste`)}** Sebebiyle Karalisteye Alınmışsın!`)
			.setColor(config.hatarenk)
			.setTimestamp()
		message.channel.send({embed})
		return
	}		
	if(cmd.ek.bakim) {
		if (message.author.id !== config.devs) {
			const embed = new Discord.MessageEmbed()
				.setDescription(`${emoji.no} **${cmd.ek.komut}** şuan bakımda!`)
				.setColor(config.hatarenk)
				.setTimestamp()
			message.channel.send({embed})
			return
		}
	}
	if(cmd.ek.perm === 1) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			const embed = new Discord.MessageEmbed()
				.setDescription(`${emoji.no} Bu komutu kullanmak için **Mesajları Yönet** yetkisine sahip olmalısın!`)
				.setColor(config.hatarenk)
				.setTimestamp()
			message.channel.send({embed})
			return
		}
	}
	if(cmd.ek.perm === 2) {
		if (!message.member.hasPermission("KICK_MEMBERS")) {
			const embed = new Discord.MessageEmbed()
				.setDescription(`${emoji.no} Bu komutu kullanmak için **Üyeleri Atma** yetkisine sahip olmalısın!`)
				.setColor(config.hatarenk)
				.setTimestamp()
			message.channel.send({embed})
			return
		}}
	if(cmd.ek.perm === 3) {
			if (!message.member.hasPermission("BAN_MEMBERS")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`${emoji.no} Bu komutu kullanmak için **Üyeleri Yasaklama** yetkisine sahip olmalısın!`)
					.setColor(config.hatarenk)
					.setTimestamp()
				message.channel.send({embed})
				return
			}
		}
			if(cmd.ek.perm === 4) {
				if (!message.member.hasPermission("MANAGE_MESSAGES")) {
					const embed = new Discord.MessageEmbed()
						.setDescription(`${emoji.no} Bu komutu kullanmak için **Mesajları Yönet** yetkisine sahip olmalısın!`)
						.setColor(config.hatarenk)
						.setTimestamp()
					message.channel.send({embed})
					return
				}
			}
				if(cmd.ek.perm === 5) {
					if (!message.member.hasPermission("MANAGE_EMOJIS")) {
						const embed = new Discord.MessageEmbed()
							.setDescription(`${emoji.no} Bu komutu kullanmak için **Emojileri  Yönet** yetkisine sahip olmalısın!`)
							.setColor(config.hatarenk)
							.setTimestamp()
						message.channel.send({embed})
						return
					}
				}
					if(cmd.ek.perm === 6) {
							if (!message.member.hasPermission("MANAGE_CHANNELS")) {
								const embed = new Discord.MessageEmbed()
									.setDescription(`${emoji.no} Bu komutu kullanmak için **Kanalları Yönet** yetkisine sahip olmalısın!`)
									.setColor(config.hatarenk)
									.setTimestamp()
								message.channel.send({embed})
								return
							}
						}
					if(cmd.ek.perm === 7) {
									if (!message.member.hasPermission("MANAGE_ROLES")) {
										const embed = new Discord.MessageEmbed()
											.setDescription(`${emoji.no} Bu komutu kullanmak için **Rolleri Yönet** yetkisine sahip olmalısın!`)
											.setColor(config.hatarenk)
											.setTimestamp()
										message.channel.send({embed})
										return
									}
								}
					if(cmd.ek.perm === 8) {
						if (!message.member.hasPermission("ADMINISTRATOR")) {
							const embed = new Discord.MessageEmbed()
								.setDescription(`${emoji.no} Bu komutu kullanmak için **Yönetici** yetkisine sahip olmalısın!`)
								.setColor(config.hatarenk)
								.setTimestamp()
							message.channel.send({embed})
							return
						}
					}
						if(cmd.ek.perm === 9) {
							if (message.guild.ownerID !== message.author.id) {
								const embed = new Discord.MessageEmbed()
									.setDescription(`${emoji.no} Bu komutu kullanmak için **Sunucu Sahibi** Olmalısın!`)
									.setColor(config.hatarenk)
									.setTimestamp()
								message.channel.send({embed})
								return
							}
						}				
						if(cmd.ek.perm === 10) {
							if (message.author.id !== config.devs) {
								const embed = new Discord.MessageEmbed()
									.setDescription(`${emoji.no} Bu komutu kullanmak için **Bot Kurucusu** Olmalısın!`)
									.setColor(config.hatarenk)
									.setTimestamp()
								message.channel.send({embed})
								return
							}
						}
	const sdb = new croxy(adapter, {
							"dbName":message.guild.id,
							"dbFolder":"preless-sunucu",
							"noBlankData": true,
							"readable": true,
							"language": "tr"
						})
		cmd.preless(client, message, args, commands, sdb)
	}
})

client.on("ready", async() => {
	console.log(`--- ${client.user.username} Started ---`)
})
  client.login(ayarlar.token)
  
