const Discord = require('discord.js');
const db = require("quick.db")

const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}
 
  let yetkili = ayarlar.jailyetkili;
  let jaillogkanal = ayarlar.jaillog;
  let erkekrol1 = ayarlar.erkekrol1;
  let erkekrol2 = ayarlar.erkekrol2;
  let cezalı = ayarlar.cezalı;
  let erkek3 = ayarlar.erkekrol3;
  let basarili = ayarlar.basariliemoji;
  let basarisiz = ayarlar.basarisizemoji;
 
  
   if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);  
  
let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription('<a:qmi2:809010861162233857> Bir üye etiketlemen gerekiyor!')).then(x => x.delete({timeout: 3000}));
let user = message.mentions.users.first();
let rol = message.mentions.roles.first();
let member = message.guild.member(kullanıcı);
member.roles.add(erkekrol1);//Verilecek Erkek Rol
member.roles.add(erkekrol2);//Verilecek 2. Erkek Rol,
member.roles.add(erkek3);
member.roles.remove(cezalı);

   

const embed1 = new Discord.MessageEmbed()
.setDescription(` Başarılı bir şekilde ${kullanıcı} adlı \`erkek\` kullanıcı, ${message.author.tag} tarafından jailden çıkarıldı!`)
client.channels.cache.get(jaillogkanal).send(embed1);//Log Kanal İd
  
   message.react(basarili);

  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unjail-e","uerkek"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}

exports.help = {
  name: 'ue',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '!jail @etiket Sebep'
}