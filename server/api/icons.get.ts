interface IIcons {
    status: number;
    icons: string[];
}

export default defineEventHandler(async (event) => {
    const data: IIcons = await $fetch("https://skills.syvixor.com/api/icons");
    return data.icons
});