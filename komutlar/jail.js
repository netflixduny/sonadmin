const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
const db = require('quick.db');


exports.run = async (client, message, args) => {
  
     if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}
    
    let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;
    let yetkili = ayarlar.jailyetkili;
    let jaillogkanal = ayarlar.jaillog;
    let cezalı = ayarlar.cezalı;
    let jailsayı = db.fetch(`jailsayısı_${message.author.id}`);
    let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let member = message.guild.member(kullanıcı);
    let reason = args.slice(1).join(" ");




   if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);
   if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription('<a:qmi2:809010861162233857> Jaile atabilmek için bir kullanıcı belirtmelisin!')).then(x => x.delete({timeout: 3000}));
   if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
   if(!reason) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("<a:qmi2:809010861162233857> Jaile atmak için sebep belirtmelisin!")).then(x => x.delete({timeout: 3000}));
   if (!ayarlar.sahip) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Sahibimin üzerinde komut kullanamazsın!`));

member.roles.cache.forEach(r => {
member.roles.add(cezalı);
member.roles.remove(r.id);
});
  

const logkanal = new Discord.MessageEmbed().setColor('GREEN').setDescription(`Başarılı bir şekilde ${kullanıcı} adlı kullanıcı, ${message.author.tag} tarafından \`${reason}\` sebebi ile jaile atıldı. `)
client.channels.cache.get(jaillogkanal).send(logkanal);
    db.add(`jailsayısı_${message.author.id}`, 1); 

return message.react(basarili)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ceza","cezalandır"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}

exports.help = {
  name: 'jail',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '.jail @etiket Sebep'
}