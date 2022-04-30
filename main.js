const { Client, Intents, MessageEmbed } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ["MESSAGE", "USER", "REACTION"] });
const bot1 = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ["MESSAGE", "USER", "REACTION"] });
const bot2 = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ["MESSAGE", "USER", "REACTION"] });
const bot3 = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ["MESSAGE", "USER", "REACTION"] });
const warns = require("./warns.json");
const fs = require('fs');
const ms = require('ms');
bot.on("ready", async () => {
    console.log('The event bot is active.');
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
    const eventroleid = '965554396672983105';
    const eventrole = message.guild.roles.cache.get(eventroleid);
    if(message.channel.id == "965554398774317141") {
        if (cmd === `${prefix}eventban`) {
            const user = message.mentions.users.first();
            if (!user) return message.reply("Пожалуйста укажите правильно команду **!eventban <@user> [время] [причина]**");
            const target = message.guild.members.cache.get(user.id);
            if(user.id === message.author.id) return message.reply("Вы не можете забанить себя.");
            if(target.roles.cache.has(eventroleid)) return message.reply("Этот пользователь уже имеет роль ивентбана!");
            if(!eventrole) return message.reply("Не могу найти роль ивентбана.");
        
            const reason = args.slice(2).join(" ");
            let time = args[1];
            if (!time) return message.reply("Пожалуйста укажите время!");
        
            target.roles.add(eventrole.id);
            const event = new MessageEmbed()
            .setColor("#00aaaa")
            .setDescription(`${user} получил ивентбан ${message.author} на ${ms(ms(time))}.\nПричина: **${reason != "" ? reason : "-"}**`)
        
            message.channel.send({ embeds: [event] });
        
            setTimeout(() => {
                target.roles.remove(eventrole.id);
                const unevent = new MessageEmbed()
                .setColor("#00aaaa")
                .setDescription(`У ${user} был снят ивентбан.`);
                message.channel.send({ embeds: [unevent] });
                member.send({embeds:[unev]}).catch(() =>{})
            }, ms(time));
              var unven = new MessageEmbed()
              .setTitle('Вы получили блокировку!')
              .setColor("RANDOM")
              .setDescription(`**Вы получили ивентбан на время ${ms(ms(time))} \nПричина: **${reason != "" ? reason : "-"}** | мут выдал: ${message.author}**`)
              .setTimestamp()
              member.send({embeds:[unven]}).catch(() =>{})
              var unev = new MessageEmbed()
              .setTitle('У вас сняли блокировку!')
              .setColor("RANDOM")
              .setDescription(`**У вас был снят ивентбан на сервере Send!**`)
              .setTimestamp()
        }
}})

bot1.on("ready", async () => {
    console.log('The moder bot is active.');
});
bot1.on('messageCreate', async message => {
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
        if (!time) return message.reply("Пожалуйста укажите время!");

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
    if (!time) return message.reply("Пожалуйста укажите время!");

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
    if (!time) return message.reply("Пожалуйста укажите время!");

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
 bot2.on("ready", async () => {
    console.log('The helper bot is active.');
});
 bot2.on('messageCreate', async message => {
    if (message.author.bot || message.channel.type === 'dm') return;
    let prefix = '!';
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let member = message.mentions.members.first();
    const manroleid = '965554396576489520';
    const manrole = message.guild.roles.cache.get(manroleid);
    const girlroleid = '965554396576489521';
    const girlrole = message.guild.roles.cache.get(girlroleid);
    const newroleid = '965554396345798750';
    const newrole = message.guild.roles.cache.get(newroleid);
    const ageroleid = '965554396345798748';
    const agerole = message.guild.roles.cache.get(ageroleid);
    if(message.channel.id == "965554397822222381") {
    if (cmd === `${prefix}gr`) {
    const user = message.mentions.members.first()
    if (!user) return message.reply("Пожалуйста укажите правильно команду **!gr <@user> [м или ж]**");
    const target = message.guild.members.cache.get(user.id);
    if(user.id === message.author.id) return message.reply("Вы не можете снять самому себе гендерку.");
    if(!target) return console.log(`Нету таргета ${target}`)
    
    const gender = args[1];

        target.roles.remove("965554396576489520");    
        target.roles.remove("965554396576489521");
        const girl = new MessageEmbed()
        .setTitle("Title")
        .setColor("RANDOM")
        .setDescription(`У ${user} сняты гендерные роли.`)
        message.channel.send({ embeds: [girl] });
    }
    if (cmd === `${prefix}newacc`) {
        const user = message.mentions.users.first();
        if (!user) return message.reply("Пожалуйста укажите правильно команду **!newacc <@user> [время] **");
        const target = message.guild.members.cache.get(user.id);
        if(user.id === message.author.id) return message.reply("Вы не можете выдать себе роль **новый аккаунт**.");
        if(target.roles.cache.has(newroleid)) return message.reply("Этот пользователь уже имеет роль **новый аккаунт**");
        if(!newrole) return message.reply("Не могу найти роль **новый аккаунт**.");
    
        const reason = args[0];
        let time = args[1];
        if (!time) return message.reply("Пожалуйста укажите время!");

        target.roles.add(newrole.id);
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${user} получил роль <@&965554396345798750> на ${ms(ms(time))}`)

        message.channel.send({ embeds: [embed] });
    
        setTimeout(() => {
            target.roles.remove(newrole.id);
            const unmute = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${user} была снята роль <@&965554396345798750>.`);
            message.channel.send({ embeds: [unmute] });
        }, ms(time));
    }
    if (cmd === `${prefix}age`) {
        const user = message.mentions.users.first();
        if (!user) return message.reply("Пожалуйста укажите правильно команду **!age <@user>**");
        const target = message.guild.members.cache.get(user.id);
        if(user.id === message.author.id) return message.reply("Вы не можете выдать себе роль **нет 13**.");
        if(target.roles.cache.has(ageroleid)) return message.reply("Этот пользователь уже имеет роль **нет 13**!");
        if(!agerole) return message.reply("Не могу найти роль **нет 13**.");
    
        target.roles.add(agerole.id);
        const age = new MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`${user} получил роль <@&965554396345798748>.`)
        message.channel.send({ embeds: [age] });
    }
    if (cmd === `${prefix}ref`) {
        const user = message.mentions.users.first();
        if (!user) return message.reply("Пожалуйста укажите правильно команду **!ref <@user> [м или ж]**");
        const target = message.guild.members.cache.get(user.id);
        if(user.id === message.author.id) return message.reply("Вы не можете выдать себе роль гендерку.");
        if(target.roles.cache.has(manroleid)) return message.reply("Этот пользователь уже имеет роль гендерки!");
        if(target.roles.cache.has(girlroleid)) return message.reply("Этот пользователь уже имеет роль гендерки!");
        if(!agerole) return message.reply("Не могу найти роли гендерки.");
        
        const gender = args[1];
        if(gender === `m`) {
            target.roles.add(manrole.id);
            const man = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${user} получил роль <@&965554396576489520>.`)
            message.channel.send({ embeds: [man] });
        }
        if(gender === `g`) {
            target.roles.add(girlrole.id);
            const girl = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${user} получила роль <@&965554396576489521>.`)
            message.channel.send({ embeds: [girl] });
        }
    }
    if (cmd === `${prefix}user`) {
        const user = message.mentions.users.first();
        const activities = member.presence?.activities || []
    
        const focusActivity = activities.find(x => x.assets)
        const info = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
        .setThumbnail(focusActivity ? `https://cdn.discordapp.com/app-assets/${focusActivity.applicationId}/${focusActivity.assets.largeImage}` : member.user.displayAvatarURL())
        .setDescription(activities.map((x, i) => `**${x.type}**: \`${x.name || "None"} : ${x.details || "None"} : ${x.state || "None"}\``).join("\n"))
        .addField("Подключился к серверу:", member.joinedAt.toLocaleString(), true)
        .addField("Аккаунт создан:", member.user.createdAt.toLocaleString(), true)
    
        message.channel.send({ embeds: [info] });
}}})
bot3.on("ready", async () => {
    console.log('The talant bot is active.');
})
bot3.on('messageCreate', async message => {
    if (message.author.bot || message.channel.type === 'dm') return;
    let prefix = '!';
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let member = message.mentions.members.first();
    //Your muted role id goes here.
    //You should deny the "SEND_MESSAGES" permission for this role.
    const muzroleid = '965554396626833450';
    const muzrole = message.guild.roles.cache.get(muzroleid);
    const paintroleid = '965554396626833449';
    const paintrole = message.guild.roles.cache.get(paintroleid);
    if(message.channel.id == "965554398774317136") {
    if (cmd === `${prefix}muz`) {
        const user = message.mentions.users.first();
        if (!user) return message.reply("Пожалуйста укажите правильно команду **!muz <@user>**");
        const target = message.guild.members.cache.get(user.id);
        if(user.id === message.author.id) return message.reply("Вы не можете выдать себе роль музыканта.");
        if(target.roles.cache.has(muzroleid)) return message.reply("Этот пользователь уже имеет роль музыканта!");
        if(!muzrole) return message.reply("Не могу найти роль музыканта.");
    
        target.roles.add(muzrole.id);
        const muz = new MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`${user} получил роль музыканта.`)
        message.channel.send({ embeds: [muz] });
    }
    if (cmd === `${prefix}paint`) {
        const user = message.mentions.users.first();
        if (!user) return message.reply("Пожалуйста укажите правильно команду **!paint <@user>**");
        const target = message.guild.members.cache.get(user.id);
        if(user.id === message.author.id) return message.reply("Вы не можете выдать себе роль художника.");
        if(target.roles.cache.has(paintroleid)) return message.reply("Этот пользователь уже имеет роль художника!");
        if(!paintrole) return message.reply("Не могу найти роль художника.");
    
        target.roles.add(paintrole.id);
        const muz = new MessageEmbed()
        .setColor("#00aaaa")
        .setDescription(`${user} получил роль художника.`)
        message.channel.send({ embeds: [muz] });
    }

}})


bot.login('OTY5NTQzMTU4Mjk3OTIzNTg0.Ymu7bg.8o5VcLI3sWbHYM-kxyo406OlsPk'); //YOUR TOKEN GOES HERE.
bot1.login('OTY5NTA1NTcyMjMzODI2MzE0.YmuYbA.XqeLcaPfP1ZbyXH-5ktmBURwFRI');
bot2.login('OTY5NTQ2NTYwMTEzMzc3MzMw.Ymu-mQ.KAWd4UIHc26e5Ei2aKtX9j590Gc'); //YOUR TOKEN GOES HERE.
bot3.login('OTY5NTQxMDMzMzQxODk0NjU2.Ymu5cw.MxJfqMTo-aO3AdoJFRQH6MCkWLY'); //YOUR TOKEN GOES HERE.