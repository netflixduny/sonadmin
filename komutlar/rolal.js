const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")

var prefix = ayarlar.prefix;



exports.run = async (bot, message, args) => {
 
 if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}
  
      let kanal = ayarlar.botkomut;
      let basarili = ayarlar.basariliemoji;
      let basarisiz = ayarlar.basarisizemoji;
      let yetkili = ayarlar.logger;

  if(message.channel.id !== kanal) return message.react(basarisiz);

  
 if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);


  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if (!rMember) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:qmi2:809010861162233857> Rol almam için bir kişiyi etiketlemelisin!`)).then(x => x.delete({timeout: 3000}));
    let role = message.mentions.roles.first();

    if (!role) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Rol alabilmem için rolü belirtmelisiniz!`)).then(x => x.delete({timeout: 3000}));
    let aRole = message.mentions.roles.first();
    if (!aRole) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Etiketlediğiniz rolü sunucuda bulamıyorum!`)).then(x => x.delete({timeout: 3000}));

    if (!rMember.roles.cache.has(aRole.id)) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Bu rolü bu kullanıcıda görüyorum!')).then(x => x.delete({timeout: 3000}));  
     await (rMember.roles.remove(aRole.id));
 message.react(basarili)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rolçıkar', 'rolsil'],
  permLevel: "0"
};

exports.help = {
  name: "rolal",
  description: "Kişilere Rol Yetkisi Verir",
  usage: "rolver <mesaj>"
};