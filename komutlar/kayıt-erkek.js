
const discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

 


exports.run = async (client, message, args) => {
  
    let erkekrolcuk = ayarlar.erkekrol1;
    let erkekrolcuk2 = ayarlar.erkekrol2;
    let erkekrolcuk3 = ayarlar.erkekrol3;
    let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;
    let yetkili = ayarlar.kayıtyetkili;
    let kayıtsız = ayarlar.kayıtsız;
    let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`);
    let erkekkayıt = db.fetch(`erkekkayıtsayı_${message.author.id}`);
    let genelsohbet1 = ayarlar.genelsohbet;
    let kayıtsohbet2 = ayarlar.kayıtsohbet;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let isim = args[1]; 
    let yaş = args[2]; 
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Bot kullanımı şuanda kapalıdır. Lütfen sonra tekrar deneyiniz!'))}
}
  
  
   


 if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);
 if (!member) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Erkek olarak kaydedeceğin kullanıcıyı belirtmelisin!`));
 if (!ayarlar.sahip) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Sahibimin üzerinde komut kullanamazsın!`));

  member.roles.remove(kayıtsız);
  member.roles.add(erkekrolcuk);
  member.roles.add(erkekrolcuk2);
  member.roles.add(erkekrolcuk3);
  

  
message.react(basarili)

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["e"],
    permLevel: 0
};

exports.help = {
    name: "erkek"
}

