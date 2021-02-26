const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
const db = require("quick.db")


exports.run = async (client, message, args) => {
 
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}
  
      let yetkili = ayarlar.muteyetkili;
      let susturulmuş = ayarlar.susturulmuş;
      let mutelogkanal = ayarlar.mutelog;
      let basarili = ayarlar.basariliemoji;
      let basarisiz = ayarlar.basarisizemoji;


  
   if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);
let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription('<a:qmi2:809010861162233857> Bir üye etiketlemen gerekiyor!'));
let user = message.mentions.users.first();
let rol = message.mentions.roles.first();
let member = message.guild.member(kullanıcı);
member.roles.remove(susturulmuş);//ALINACAK ROL

   

const embed1 = new Discord.MessageEmbed()
.setDescription(`${kullanıcı} adlı kullanıcı <@${message.author.id}> tarafından susturulması kaldırıldı.`) 
client.channels.cache.get(mutelogkanal).send(embed1);//KANAL İD
  
 message.react(basarili);

  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unmute","um"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}

exports.help = {
  name: 'u..m',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '!jail @etiket Sebebe'
}