export default {
    home: `${window.location.origin}/`,
    clientId: import.meta.env.VITE_APP_CLIENT_ID || '',
    botApi: import.meta.env.VITE_APP_BOT_API || '',
    socket: import.meta.env.VITE_APP_SOCKET || '',
    discordApi: "https://discord.com/api",
    discordCdn: "https://cdn.discordapp.com",
    statusUrl: "https://flavus.instatus.com/",
    colors: {
        default: "#344675",
        primary: "#42b883",
        info: "#1d8cf8",
        danger: "#fd5d93",
        teal: "#00d6b4",
        primaryGradient: ['rgba(66,134,121,0.55)', 'rgba(66,134,121,0.05)', 'rgba(66,134,121,0)'],
    }
}