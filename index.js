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
                largeImage: "nya", // Must match the name in Dev Portal
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
