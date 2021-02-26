const Discord = require("discord.js");
const db = require("quick.db")
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
     let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;
        let yetkili = ayarlar.logger;


  if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}
  
if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);



  let every = message.guild.roles.cache.find(r => r.name === "@everyone");
  message.channel.createOverwrite(every, {
    SEND_MESSAGES: null
  });


 message.react(basarili);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sohbet-a"],
  permLevel: 0
};

exports.help = {
  name: 'sohbet-aç',
  description: 'İstediğiniz kişiyi uyarır.',
  usage: 'aç'
};