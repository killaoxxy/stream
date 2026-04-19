const { Client } = require('discord.js-selfbot-v13');


const tokens = process.env.TOKENS ? process.env.TOKENS.split(',') : [];

function startBot(token) {
    const client = new Client({ checkUpdate: false });

    client.on('ready', async () => {
        console.log(`[${client.user.tag}] Invisible Status Active`);
        
        client.user.setPresence({
        activities: [{
            name: "(๑ᵔ⤙ᵔ๑)", 
            type: "STREAMING",
            url: "https://www.twitch.tv/nya",
            applicationId: "1495239652758651000", // Must be a real App ID
            assets: {
                largeImage: "https://cdn.discordapp.com/attachments/1336844701873213522/1495239025844424795/IMG_3807.jpg?ex=69e5855b&is=69e433db&hm=740a1fe1a53ccb5de24bd7b12c9591c8a3a64923c8b7c199b8fa7fda0f4c16b4&", // Must match the name in Dev Portal
                largeText: "\u200b"
            }
        }],
        status: "online"
    });
});

    client.login(token.trim()).catch(() => console.error("Invalid Token provided"));
}

if (tokens.length > 0) {
    tokens.forEach(t => startBot(t));
} else {
    console.error("No TOKENS environment variable found!");
}
