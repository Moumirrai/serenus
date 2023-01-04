export default {
    clientId: process.env.VUE_APP_CLIENT_ID || '',
    botApi: process.env.VUE_APP_BOT_API || '',
    socket: process.env.VUE_APP_SOCKET || '',
    discordApi: "https://discord.com/api",
    discordCdn: "https://cdn.discordapp.com",
    colors: {
        default: "#344675",
        primary: "#42b883",
        info: "#1d8cf8",
        danger: "#fd5d93",
        teal: "#00d6b4",
        primaryGradient: ['rgba(66,134,121,0.55)', 'rgba(66,134,121,0.05)', 'rgba(66,134,121,0)'],
    }
}