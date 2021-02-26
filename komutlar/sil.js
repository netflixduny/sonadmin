const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")


exports.run = function(client, message, args) {
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}
  
    let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;
        let yetkili = ayarlar.logger;

if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);
  
if(isNaN(args[0])) {
  var errembed = new Discord.MessageEmbed().setColor("RED").setDescription(`<a:qmi2:809010861162233857> Lütfen 1-100 arasında sayı belirtiniz!`)
return message.channel.send(errembed).then(x => x.delete({timeout: 3000}));
}
  
if (args[0] < 1) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("<a:qmi2:809010861162233857> **1** adetten az mesaj silemem!")).then(x => x.delete({timeout: 3000}));
if (args[0] > 100) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("<a:qmi2:809010861162233857> **100** adetten fazla mesaj silemem!")).then(x => x.delete({timeout: 3000}));
  
message.channel.bulkDelete(args[0]).then(deletedMessages => {
if (deletedMessages.size < 1) return message.reply("<a:qmi2:809010861162233857> Hiç mesaj silemedim! _(**14** günden önceki mesajları silemem!)_").then(x => x.delete({timeout: 3000}));
})
message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`<a:qmi1:809010834146983966> **${args[0]}** adet mesaj başarıyla silindi!`)).then(x => x.delete({timeout: 3000}));
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["sil", "mesaj-sil", "mesajları-sil"],
  permLevel: `Mesajları yönet yetkisine sahip olmak gerekir.`
};

exports.help = {
  name: 'sil',
  category: 'moderasyon',
  description: 'Belirtilen miktarda mesaj siler.',
  usage: '.sil <miktar>'
};