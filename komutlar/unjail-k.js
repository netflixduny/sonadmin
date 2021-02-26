const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
const db = require("quick.db")


exports.run = async (client, message, args) => {
  
  if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}
 
  let yetkili = ayarlar.jailyetkili;
  let jaillogkanal = ayarlar.jaillog;
  let kızrol1 = ayarlar.kızrol1;
  let kızrol2 = ayarlar.kızrol2;
  let cezalı = ayarlar.cezalı;
  let erkek3 = ayarlar.kızrol3;
  let basarili = ayarlar.basariliemoji;
  let basarisiz = ayarlar.basarisizemoji;

 
 
   if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz); 
  
let kullanıcı = message.mentions.users.first()|| message.guild.members.cache.get(args[0])
if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription('<a:qmi2:809010861162233857> Bir üye etiketlemen gerekiyor!'));
let user = message.mentions.users.first();
let rol = message.mentions.roles.first();
let member = message.guild.member(kullanıcı);
member.roles.add(kızrol1);//Verilecek Erkek Rol
member.roles.add(kızrol2);//Verilecek 2. Erkek Rol
member.roles.remove(cezalı);//Cezalı Rol

member.roles.add(erkek3);//Verilecek 2. Erkek Rol

   

const embed1 = new Discord.MessageEmbed().setColor('GREEN')
.setDescription(`Başarılı bir şekilde ${kullanıcı} adlı \`kız\` kullanıcı, ${message.author.tag} tarafından jailden çıkarıldı!`)
client.channels.cache.get(jaillogkanal).send(embed1);//Log Kanal İd
  
  
 message.react(basarili);

  
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unjail-k","ukız"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}

exports.help = {
  name: 'uk',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '!jail @etiket Sebep'
}