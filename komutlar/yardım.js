const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {
  
   if(db.fetch(`bakim`)) {
  if(message.author.id !== ayarlar.sahip) {return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription('<a:qmi2:809010861162233857> Şuanda bot kullanımı kapalıdır. Daha sonra tekrar deneyiniz.'))}
}

    let kanal = ayarlar.botkomut;
    let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;
  
  if(message.channel.id !== kanal) return message.react(basarisiz);


const ace = new Discord.MessageEmbed()
.setFooter('qmi Tarafından Yapılmıştır.')
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
.setDescription(`
> **\`${prefix}pp -> .pp veya .pp @üye\`** 
> **\`${prefix}sicil -> .sicil veya .sicil @üye\`** 
> **\`${prefix}yetki -> .yetki <giriş orta üst alty ortay üsty yönetim> @üye\`** 
> **\`${prefix}rolver -> .rolver @üye @rol\`** 
> **\`${prefix}rolal -> .rolal @üye @rol\`** 
> **\`${prefix}ban -> .ban @üye <sebep>\`** 
> **\`${prefix}git -> .git @üye\`** 
> **\`${prefix}çek -> .çek @üye\`** 
> **\`${prefix}say -> .say\`** 
> **\`${prefix}sohbet-aç -> .sohbet-aç\`** 
> **\`${prefix}sohbet-kapat -> .sohbet-kapat\`** 
> **\`${prefix}mute -> .mute @üye <Süre> <Sebep>\`** 
> **\`${prefix}unmute -> .unmute @üye\`** 
> **\`${prefix}smute -> .mute @üye <Süre> <Sebep>\`** 
> **\`${prefix}sunmute -> .unmute @üye\`** 
> **\`${prefix}jail -> .jail @üye <Sebep>\`** 
> **\`${prefix}unjail-e (Erkek İçin) -> .ue @üye\`** 
> **\`${prefix}unjail-k (Kız İçin) -> .uk @üye\`** `)
 message.channel.send(ace)
  
  const acee = new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
  .setFooter('qmi Tarafından Yapılmıştır.')
.setAuthor(`Orenda Kayıt Botu Yardım Menüsü`)
.setDescription(`
> **\`${prefix}erkek -> .e @üye\`** 
> **\`${prefix}kız -> .k @üye\`** 
> **\`${prefix}isim -> .i @üye <İsim> <Yaş>\`** `)
 message.channel.send(acee);
}
//evet
exports.conf = {
	enabled : true,
	guildOnly : false,
	aliases : ['help'],
	permLevel : 0
}

exports.help = {
	name : 'yardım',
	description : 'Komut kategorilerini atar',
	usage : '!yardım'
}