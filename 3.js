const { Client, Intents, MessageEmbed } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ["MESSAGE", "USER", "REACTION"] });
const warns = require("./warns.json");
const fs = require('fs');
const ms = require('ms');
bot.on("ready", async () => {
    console.log('The bot is active.');
    bot.user.setActivity('Moderate', {type: 'LISTENING'});
});
bot.on('messageCreate', async message => {
    if (message.author.bot || message.channel.type === 'dm') return;
    let prefix = '!';
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let member = message.mentions.members.first();
    //Your muted role id goes here.
    //You should deny the "SEND_MESSAGES" permission for this role.
    const mutedroleid = '965554396672983104';
    const mutedrole = message.guild.roles.cache.get(mutedroleid);
    const roomroleid = '965554396672983106';
    const roomrole = message.guild.roles.cache.get(roomroleid);
    const textroleid = '965554396672983103';
    const textrole = message.guild.roles.cache.get(textroleid);
    const muzroleid = '965554396626833450';
    const muzrole = message.guild.roles.cache.get(muzroleid);
    //MUTE COMMAND
    //!mute @Member time(s, m, d, h) reason
 if(message.channel.id == "965554398480703492") {
  if (cmd === `${prefix}mute`) {
        const user = message.mentions.users.first();
        if (!user) return message.reply("Пожалуйста укажите правильно команду **!mute <@user> [время] [причина]**");
        const target = message.guild.members.cache.get(user.id);
        if(user.id === message.author.id) return message.reply("Вы не можете замутить себя.");
        if(target.roles.cache.has(mutedroleid)) return message.reply("Этот пользователь уже имеет роль мута");
        if(!mutedrole) return message.reply("Не могу найти роль мута.");
    
        const reason = args.slice(2).join(" ");
        let time = args[1];
        if (!time) time = "1h";

        target.roles.add(mutedrole.id);
        const embed = new MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`${user} был замучен ${message.author} на ${ms(ms(time))}.\nПричина: **${reason != "" ? reason : "-"}**`)

        message.channel.send({ embeds: [embed] });
    
        setTimeout(() => {
            target.roles.remove(mutedrole.id);
            const unmute = new MessageEmbed()
            .setColor("#00aaaa")
            .setDescription(`${user} был размучен.`);
            message.channel.send({ embeds: [unmute] });
            member.send({embeds:[unmuting]}).catch(() =>{})
        }, ms(time));
          var embeds = new MessageEmbed()
          .setTitle('Вы были замьючены!')
          .setColor("RANDOM")
          .setDescription(`**Вы получили мут на время ${ms(ms(time))} \nПричина: **${reason != "" ? reason : "-"}** | мут выдал: ${message.author}**`)
          .setTimestamp()
          member.send({embeds:[embeds]}).catch(() =>{})
          var unmuting = new MessageEmbed()
          .setTitle('Вы были размьючены!')
          .setColor("RANDOM")
          .setDescription(`**Вы были размьючены на сервере Send!**`)
          .setTimestamp()
    }
    //UNMUTE COMMAND
    //!unmute @Member reason
    if (cmd === `${prefix}unmute`) {
        const user = message.mentions.users.first();
        if (!user) return message.reply("Пожалуйста укажите правильно команду. **!unmute <@user> [причина]**");
        const target = message.guild.members.cache.get(user.id);
        if(!target.roles.cache.has(mutedroleid)) return message.reply("Данный пользователь не замучен");
        if(user.id === message.author.id) return message.reply("Вы не можете размутить себя. ):");
        if(!mutedrole) return message.reply("Не могу найти роль мута");

        const reason = args.slice(1).join(" ");
        target.roles.remove(mutedrole.id);
        const unmute = new MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`${user} был размучен ${message.author}.\nПричина: **${reason != "" ? reason : "-"}**`);
        message.channel.send({ embeds: [unmute] });
        member.send({embeds:[unmutin]}).catch(() =>{})
        var unmutin = new MessageEmbed()
          .setTitle('Вы были размьючены!')
          .setColor("RANDOM")
          .setDescription(`**Вы были размьючены на сервере Send \nПричина: **${reason != "" ? reason : "-"}**`)
          .setTimestamp()
    }
 if (cmd === `${prefix}textmute`) {
    const user = message.mentions.users.first();
    if (!user) return message.reply("Пожалуйста укажите правильно команду **!textmute <@user> [время] [причина]**");
    const target = message.guild.members.cache.get(user.id);
    if(user.id === message.author.id) return message.reply("Вы не можете замутить себя.");
    if(target.roles.cache.has(textroleid)) return message.reply("Этот пользователь уже имеет роль текстового мута!");
    if(!textrole) return message.reply("Не могу найти роль мута.");

    const reason = args.slice(2).join(" ");
    let time = args[1];
    if (!time) time = "1h";

    target.roles.add(textrole.id);
    const embedtxt = new MessageEmbed()
    .setColor("#00aaaa")
    .setDescription(`${user} получил текстовый мут ${message.author} на ${ms(ms(time))}.\nПричина: **${reason != "" ? reason : "-"}**`)

    message.channel.send({ embeds: [embedtxt] });

    setTimeout(() => {
        target.roles.remove(textrole.id);
        const untext = new MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`У ${user} был снят текстовый мут.`);
        message.channel.send({ embeds: [untext] });
        member.send({embeds:[untxt]}).catch(() =>{})
    }, ms(time));
      var embeds = new MessageEmbed()
      .setTitle('Вы получили мут!')
      .setColor("RANDOM")
      .setDescription(`**Вы получили текстовый мут на время ${ms(ms(time))} \nПричина: **${reason != "" ? reason : "-"}** | мут выдал: ${message.author}**`)
      .setTimestamp()
      member.send({embeds:[embeds]}).catch(() =>{})
      var untxt = new MessageEmbed()
      .setTitle('У вас сняли блокировку!')
      .setColor("RANDOM")
      .setDescription(`**У вас был снят текстовый мут на сервере Send!**`)
      .setTimestamp()
}
if (cmd === `${prefix}roomban`) {
    const user = message.mentions.users.first();
    if (!user) return message.reply("Пожалуйста укажите правильно команду **!roomban <@user> [время] [причина]**");
    const target = message.guild.members.cache.get(user.id);
    if(user.id === message.author.id) return message.reply("Вы не можете замутить себя.");
    if(target.roles.cache.has(roomroleid)) return message.reply("Этот пользователь уже имеет роль румбана!");
    if(!roomrole) return message.reply("Не могу найти роль румбана.");

    const reason = args.slice(2).join(" ");
    let time = args[1];
    if (!time) time = "1h";

    target.roles.add(roomrole.id);
    const embedroom = new MessageEmbed()
    .setColor("#00aaaa")
    .setDescription(`${user} получил румбан ${message.author} на ${ms(ms(time))}.\nПричина: **${reason != "" ? reason : "-"}**`)

    message.channel.send({ embeds: [embedroom] });

    setTimeout(() => {
        target.roles.remove(roomrole.id);
        const unroomban = new MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`У ${user} был снят румбан.`);
        message.channel.send({ embeds: [unroomban] });
        member.send({embeds:[unroomn]}).catch(() =>{})
    }, ms(time));
      var rooms = new MessageEmbed()
      .setTitle('Вы получили блокировку!')
      .setColor("RANDOM")
      .setDescription(`**Вы получили румбан на время ${ms(ms(time))} \nПричина: **${reason != "" ? reason : "-"}** | мут выдал: ${message.author}**`)
      .setTimestamp()
      member.send({embeds:[rooms]}).catch(() =>{})
      var unroomn = new MessageEmbed()
      .setTitle('У вас сняли блокировку!')
      .setColor("RANDOM")
      .setDescription(`**У вас был снят румбан на сервере Send!**`)
      .setTimestamp()
}}
    //WARN COMMAND
    //!warn @Member reason
    if(message.channel.id == "965554398774317141") {
    if (cmd === `${prefix}warn`) {
        const user = message.mentions.users.first();
        if (!user) return message.reply("Пожалуйста укажите правильно команду. **!warn <@user> [причина]**");
        const target = message.guild.members.cache.get(user.id);
        if(target.roles.cache.has(mutedroleid)) return message.reply("Вы не можете выдать предупреждение замученному пользователю");
        if(!mutedrole) return message.reply("Не могу найти роль мут.");

        const reason = args.slice(1).join(" ");

        if (!warns[user.id]) {
            warns[user.id] = {
                warnCount: 1
            }
        } else {
            warns[user.id].warnCount += 1;
        }

        if(warns[user.id].warnCount >= 5) {
            const mute = new MessageEmbed()
            .setColor("#00aaaa")
            .setDescription(`${user} был замучен(**5**/**5**)\nПричина: **${reason != "" ? reason : "-"}**`);
            message.channel.send({ embeds: [mute] });
            
            target.roles.add(mutedrole.id);
            warns[user.id].warnCount = 0;
    
            setTimeout(() => {
                target.roles.remove(mutedrole.id);
                const unmute = new MessageEmbed()
                .setColor("#00aaaa")
                .setDescription(`${user} был размучен`);
                message.channel.send({ embeds: [unmute] });
            }, 1000 * 900);

        } else {
            const warn = new MessageEmbed()
            .setColor("#00aaaa")
            .setDescription(`${user} получил предупреждение от ${message.author}. (**${warns[user.id].warnCount}**/**5**) \nПричина: **${reason != "" ? reason : "-"}**`);
            message.channel.send({ embeds: [warn] });
        }

        fs.writeFile("./warns.json", JSON.stringify(warns), err => {
            if (err) console.log(err);
        });

    }}

 })

 
bot.login('OTY5NTA1NTcyMjMzODI2MzE0.YmuYbA.XqeLcaPfP1ZbyXH-5ktmBURwFRI'); //YOUR TOKEN GOES HERE.