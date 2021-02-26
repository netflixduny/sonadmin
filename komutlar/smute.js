const Discord = require('discord.js')
const db = require('quick.db')
const ms = require("ms");
const ayarlar = require("../ayarlar.json");

const prefix = ayarlar.prefix;


exports.run = async (client ,message, args) =>{
  
    if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}
      let yetkili = ayarlar.muteyetkili;
      let ceza = ayarlar.cezalog;
      let basarili = ayarlar.basariliemoji;
      let basarisiz = ayarlar.basarisizemoji;
      let susturulmuş = ayarlar.susturulmuş;
      let mutelogkanal = ayarlar.mutelog;
      let mutesayı = db.fetch(`mutesayısı_${message.author.id}`);
      let mutekisi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
      let mutezaman = args[1];
      let sebep = args.slice(2,args.length).join(" ");

    if (!message.member.hasPermission("ADMINISTRATOR") & !message.member.roles.cache.get(yetkili) ) return message.react(basarisiz).then(x => x.delete({timeout: 3000})); //acebots  
    if (!mutekisi) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Lütfen bir kullanıcı etiketleyiniz!`)).then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= mutekisi.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
    if (!mutezaman) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Lütfen bir zaman giriniz! \n 1 Saniye = 1s \n 1 Dakika = 1m \n 1 Saat = 1h \n 1 Gün = 1d`));
    if(!sebep) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription("<a:qmi2:809010861162233857> Sesde Susturmak için sebep belirtmelisin!")).then(x => x.delete({timeout: 3000}));
    await mutekisi.voice.setMute(true, sebep);
    const logkanal = new Discord.MessageEmbed().setColor('GREEN').setDescription(`Başarılı bir şekilde ${mutekisi} adlı kullanıcı, ${message.author.tag} tarafından \`${sebep === "" ? "Sebep belirtilmemiş." : sebep}\` sebebi ile \`${args[1]}\` süresi boyunca susturuldu!`)
    client.channels.cache.get(mutelogkanal).send(logkanal)
  

  
 message.react(basarili)
  db.add(`mutesayısı_${message.author.id}`, 1);


  setTimeout(function() {
mutekisi.voice.setMute(false, sebep)
    message.channel.send(new Discord.MessageEmbed().setColor('#bae800').setDescription(`<@${mutekisi.id}> kullanıcısının mutelenme süresi sona erdi!`)
);
  }, ms(mutezaman));
};

exports.conf = {

  enabled: true,
  guildOnly: true,
  aliases: ["vmute"],
  permLevel: 0
};

exports.help = {

  name: "smute",
  description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar mute atar.",
  usage: "mute <@kullanıcı> <1sn/1dk/1sa/1g>"
};
