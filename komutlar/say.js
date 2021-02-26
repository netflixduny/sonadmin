const ayarlar = require("../ayarlar.json");


const Discord = require("discord.js");
const db = require("quick.db")



exports.run = function(client, message, args) {
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}
  
      let kanal = ayarlar.botkomut;
      let basarili = ayarlar.basariliemoji;
      let basarisiz = ayarlar.basarisizemoji;
        let yetkili = ayarlar.logger;

  if(message.channel.id !== kanal) return message.react(basarisiz);
  if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);

  
  let toplam = message.guild.memberCount;
  let online = message.guild.members.cache.filter( only => only.presence.status != "offline").size;
   const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0
      
    let textChannels = message.guild.channels.cache.filter(m => m.type == "text").size;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;    let boost = message.guild.premiumSubscriptionCount
   let tag = message.guild.members.cache.filter(m => m.user.username.includes("そ")).size;
  
  const acebots = new Discord.MessageEmbed().setAuthor('Querencia İstatistik').setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })).setFooter('qmi Tarafından Yapılmıştır.')
  .setDescription(`<a:qmi6:809042600862023700> **Sunucudaki Kullanıcı Sayısı** ${toplam}
 <a:qmi6:809042600862023700> **Tagımızı Bulunduran Kullanıcı Sayısı** ${tag}
  <a:qmi6:809042600862023700> **Sesli Kanallarda Bulunan Kullanıcı Sayısı** ${count}
  <a:qmi6:809042600862023700> **Sunucudaki Boost Sayısı** ${boost}`);
  message.channel.send(acebots).then(x => x.delete({timeout: 15000}));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "!say",
  desscription: "!say"
}; 