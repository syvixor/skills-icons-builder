interface IIcons {
    status: number;
    icons: string[];
}

interface ITotal {
    status: number;
    message: string;
    github: string;
}

export default defineEventHandler(async (event) => {
    const total: ITotal = await $fetch("https://skills.syvixor.com")
    const icons: IIcons = await $fetch("https://skills.syvixor.com/api/icons");
    return {
        total: total.message.replace("Total Icons → ", "").trim(),
        icons: icons.icons
    }
});