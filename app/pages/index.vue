<script lang="ts" setup>
const toast = useToast();

const { data: icons } = await useFetch("/api/icons");

const selectedIcons = ref([]);
const baseUrl = ref("https://skills.syvixor.com/api/icons");

const finalUrl = computed(() => {
    return `${baseUrl.value}?i=${selectedIcons.value.join(",")}`
});

const copyToClipboard = () => {
    navigator.clipboard.writeText(finalUrl.value);
    toast.add({
        title: "URL Copied",
        description: "The URL has been copied to your clipboard.",
        color: "success"
    });
}

const removeIcon = (icon: string) => {
    selectedIcons.value = selectedIcons.value.filter(i => i !== icon);
    toast.add({
        title: "Icon Removed",
        description: `You have just removed ${icon} icon.`,
        color: "success"
    });
}

const clearAll = () => {
    selectedIcons.value = [];
    toast.add({
        title: "Icons Cleared",
        description: "You can now select new icons to build your URL.",
        color: "success"
    });
}

const selectIcon = (icon: never) => {
    if (selectedIcons.value.includes(icon)) {
        removeIcon(icon);
    } else {
        selectedIcons.value.push(icon)
    }
}
</script>

<template>
    <div class="flex flex-col">
        <h1 class="text-3xl font-extrabold">Skills Icons - URL Builder</h1>
        <p class="text-base font-normal">
            Click icons below to add them to your <b>URL</b>. Order reflects selection.
        </p>
    </div>
    <div class="flex flex-col gap-2">
        <!-- Controls -->
        <div class="grid grid-cols-1 md:grid-cols-6 gap-2">
            <div class="md:col-span-5">
                <UInput v-model="finalUrl" placeholder="Base URL" variant="soft" size="xl" class="w-full" disabled />
            </div>
            <div class="md:col-span-1 flex items-center gap-2">
                <UTooltip text="Copy">
                    <UButton icon="i-lucide-copy" variant="soft" size="xl" block @click="copyToClipboard"
                        :disabled="selectedIcons.length === 0" />
                </UTooltip>
                <UTooltip text="Preview">
                    <UButton :to="finalUrl" target="_blank" icon="i-lucide-external-link" variant="soft" size="xl" block
                        :disabled="selectedIcons.length === 0" />
                </UTooltip>
                <UTooltip text="Clear">
                    <UButton icon="i-lucide-x" variant="soft" size="xl" block @click="clearAll"
                        :disabled="selectedIcons.length === 0" />
                </UTooltip>
            </div>
        </div>
        <!-- Info -->
        <UCard variant="soft">
            <div class="flex items-center gap-2" v-if="selectedIcons.length > 0">
                <UButton :label="icon" variant="soft" @click="() => removeIcon(icon)" v-for="icon in selectedIcons"
                    :key="icon" />
            </div>
            <UButton v-else label="No icons selected yet." color="neutral" variant="ghost" disabled />
        </UCard>
    </div>
    <!-- Icons -->
    <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
            <h2 class="text-2xl font-extrabold">Available Icons</h2>
            <UBadge :label="`${icons?.total} Icons`" variant="subtle" size="sm" />
        </div>
        <div class="grid grid-cols-5 md:grid-cols-12 lg:grid-cols-18 gap-3">
            <UTooltip :text="icon" v-for="(icon, index) in icons?.icons" :key="index">
                <img :src="`https://raw.githubusercontent.com/syvixor/skills-icons/refs/heads/main/icons/${icon}.svg`"
                    :alt="icon" class="transition-transform hover:scale-90 hover:cursor-pointer"
                    @click="() => selectIcon(icon as never)"
                    :class="[
                        selectedIcons.includes(icon as never) ? 'bg-neutral-800 ring ring-neutral-700 rounded-lg p-1.5' : '']" />
            </UTooltip>
        </div>
    </div>
    <USeparator icon="i-lucide-party-popper" />
</template>