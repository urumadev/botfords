const { Client, Intents, MessageEmbed } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ["MESSAGE", "USER", "REACTION"] });
const warns = require("./warns.json");
const fs = require('fs');
const ms = require('ms');
bot.on("ready", async () => {
    console.log('The bot is active.');
    bot.user.setActivity('Talant', {type: 'LISTENING'});
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
            if (!time) time = "1h";
        
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

 
bot.login('OTY5NTQzMTU4Mjk3OTIzNTg0.Ymu7bg.8o5VcLI3sWbHYM-kxyo406OlsPk'); //YOUR TOKEN GOES HERE.