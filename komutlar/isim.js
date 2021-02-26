
const discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

 


exports.run = async (client, message, args) => {
  
    let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;
    let yetkili = ayarlar.kayıtyetkili;
    let kayıtsız = ayarlar.kayıtsız;
    let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`);
    let erkekkayıt = db.fetch(`erkekkayıtsayı_${message.author.id}`);
    let genelsohbet1 = ayarlar.genelsohbet;
    let kayıtsohbet2 = ayarlar.kayıtsohbet;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let isim = args[1];
    let yaş = args[2];
  
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Bot kullanımı şuanda kapalıdır. Lütfen sonra tekrar deneyiniz!'))}
}
  
  
  if (!message.member.roles.cache.get(yetkili) & !message.member.hasPermission("ADMINISTRATOR")) return message.react(basarisiz);
  if (!member) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> İsmini değiştireceğin kullanıcıyı belirtmelisin!`));
  if (!isim) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Bir isim belirtmelisin! `));
  if (!yaş) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Bir yaş belirtmelisin! `));
  if(yaş < 15) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Kullanıcısının Yaşı **15**'den küçük olduğu için kayıt edemiyorum.`)).then(message => message.delete({timeout: 4000}));
  if (!ayarlar.sahip) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`<a:qmi2:809010861162233857> Sahibimin üzerinde komut kullanamazsın!`));
 
  var number = 1;
let stat = db.get(`isim.${message.guild.id}`);


let isimler = stat.filter(x => x.user === member.id).map(x => `\`${number++}.\` \` ${x.name} | ${x.age}\``).join("\n")


  
if(member.user.username.includes('そ')) {
    

member.setNickname(`そ ${isim} | ${yaş}`);
message.channel.send(new discord.MessageEmbed().setAuthor(member.user.username, member.user.avatarURL({dynamic: true})).setDescription(`<a:qmi1:809010834146983966> Başarılı bir şekilde ${member} kullanıcının ismini \`そ ${isim} | ${yaş}\` şeklinde değiştirdim.`).setColor('GREEN')).then(message => message.delete({timeout: 4000}));
}
else{
member.setNickname(`• ${isim} | ${yaş}`);
  
  
message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(`<a:qmi1:809010834146983966> Başarılı bir şekilde ${member} kullanıcının ismini  \`• ${isim} | ${yaş}\` şeklinde değiştirdim.`)).then(message => message.delete({timeout: 4000}));
  

  const embed = new discord.MessageEmbed().setColor('GREEN').setDescription(`Önceki isimleri\n${isimler}`)
message.channel.send(embed).then(message => message.delete({timeout: 4000}));;
  
  db.push(`isim.${message.guild.id}`, 
{user: member.id,  name: isim, age: yaş});
  

};
message.react(basarili)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["i"],
    permLevel: 0
};

exports.help = {
    name: "isim"
}

