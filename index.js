const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

let targetToMimic = null;
let targetToReact = null;
let reactionEmoji = null;

const TOKEN = process.env.TOKEN;
const PREFIX = '-';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.id !== client.user.id) {
        if (targetToMimic && message.author.id === targetToMimic) {
            const files = Array.from(message.attachments.values());
            if (message.content || files.length > 0) {
                message.channel.send({ 
                    content: message.content || null, 
                    files: files 
                }).catch(() => {});
            }
        }
        if (targetToReact && message.author.id === targetToReact) {
            try { await message.react(reactionEmoji); } catch (err) {}
        }
        return;
    }

    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
    const command = args[0].toLowerCase();

    if (command === 'mimic') {
        if (args[1] === 'stop') {
            targetToMimic = null;
        } else {
            const user = message.mentions.users.first();
            if (user) targetToMimic = user.id;
        }
        await message.delete().catch(() => {});
    }

    if (command === 'react') {
        if (args[1] === 'stop') {
            targetToReact = null;
            reactionEmoji = null;
        } else {
            const user = message.mentions.users.first();
            const emoji = args[2];
            if (user && emoji) {
                targetToReact = user.id;
                reactionEmoji = emoji;
            }
        }
        await message.delete().catch(() => {});
    }

    if (command === 'stream') {
        client.user.setPresence({
            activities: [{
                name: "(๑ᵔ⤙ᵔ๑)",
                type: "STREAMING",
                url: "https://www.twitch.tv/nya",
                applicationId: "1495239652758651000",
                assets: {
                    largeImage: "https://cdn.discordapp.com/attachments/1336844701873213522/1495239025844424795/IMG_3807.jpg?ex=69e5855b&is=69e433db&hm=740a1fe1a53ccb5de24bd7b12c9591c8a3a64923c8b7c199b8fa7fda0f4c16b4&",
                    largeText: "\u200b"
                }
            }],
            status: "online"
        });
        await message.delete().catch(() => {});
    }
});

client.login(TOKEN).catch(() => console.error("Invalid Token"));
