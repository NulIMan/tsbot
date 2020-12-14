import {emoji} from "../config"
import * as croxy from "croxydb"
import * as adapter from "croxydb/adapters/jsondb"
const db = new croxy(adapter, {
	"dbName":"database",
	"dbFolder":"prelessdata",
	"noBlankData": true,
    "readable": true,
    "language": "tr"
})
export const preless = async (client, message, args, commands) => { 
  let user = message.mentions.users.first() || client.users.cache.get(args[0])
  if(!user) return message.channel.send(`${emoji.no} Bir **Kullanıcı** Girermisin`)
  if(db.get(`karaliste.${user.id}`)) {
 db.set(`karaliste.${user.id}`, args.slice(1).join(" "))
  message.channel.send(`${emoji.yes} Başarılı bir şekilde **${user.tag}** karalisteden çıkarıldı`)
  
  }else{
  db.set(`karaliste.${user.id}`, args.slice(1).join(" "))
  message.channel.send(`${emoji.yes} Başarılı bir şekilde **${user.tag}** karalisteye **${args.slice(1).join(" ")}** sebebiyle alındı`)
  }
}
export const ek = {
    komut:"karaliste",
    aciklama:"Botun karalistesini yönetir",
    perm:10,
    bakım:true,
    kategori:"sahip"
}
