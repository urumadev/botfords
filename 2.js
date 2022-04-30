const {Client,Intents, MessageEmbed } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ["MESSAGE", "USER", "REACTION"] });
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
}}})
bot.login('OTY5NTQ2NTYwMTEzMzc3MzMw.Ymu-mQ.KAWd4UIHc26e5Ei2aKtX9j590Gc'); //YOUR TOKEN GOES HERE.