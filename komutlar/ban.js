const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");


exports.run = async(client, message, args) => {
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}
  
    let yetkili = ayarlar.banyetkili;
    let banlogkanal = ayarlar.banlog;
    let bansayı = db.fetch(`bansayısı_${message.author.id}`);
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let sebep = args.slice(1).join(' ');
    let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;
  
    if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);
    if(!user) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Banlamak için birisini etiketlemelisin!`)).then(x => x.delete({timeout: 3000}));
    if(!sebep) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Banlamak için bir sebep belirtmelisin!`)).then(x => x.delete({timeout: 3000}));
    if(user.id === message.author.id) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Kendini banlayamazsın.')).then(x => x.delete({timeout: 3000}));
    if(user.id === client.user.id) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Botu banlayamazsın.')).then(x => x.delete({timeout: 3000}));
    if(user.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription ('<a:qmi2:809010861162233857> Sunucu sahibini banlayamazsın.')).then(x => x.delete({timeout: 3000}));
    if (!ayarlar.sahip) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Sahibimin üzerinde komut kullanamazsın!`));


   message.guild.members.cache.get(user.id).ban({reason: `${sebep}`});
   db.add(`bansayısı_${message.author.id}`, 1);

    message.react(basarili);
     let sa = new Discord.MessageEmbed().setDescription(`${user} adlı kullanıcı, ${message.author.tag} tarafından \`${sebep}\` sebebi ile banlandı`)
       banlogkanal.send(sa);

};
 

 
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases:[],
	permlevel: 0
};

exports.help = {
	name: "ban"
}