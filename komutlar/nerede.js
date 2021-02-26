const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args ) => {
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}
  
       let basarisiz = ayarlar.basarisizemoji;
       let kanal = ayarlar.botkomut;
       let yetkili = ayarlar.logger;

  if(message.channel.id !== kanal) return message.react(basarisiz);

  
     let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
  if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);
if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Bir Kullanıcı Belirtmelisin!`));
  let kullanıcıkanal = kullanıcı.voice.channel;

  

  
if (!ayarlar.sahip) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Sahibimin üzerinde komut kullanamazsın!`));
if(!kullanıcıkanal) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("<a:qmi2:809010861162233857>  Etiketlediğin Kullanıcı Sesli Kanalda Değil!"));

if(kullanıcıkanal) {
message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${kullanıcı} adlı kullanıcı **${kullanıcıkanal}** kanalında bulunmakta!`))
};
 };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['nerede'],
  permLevel: 0
};

exports.help = {
  name: 'nerde',
  açıklama: ''
};