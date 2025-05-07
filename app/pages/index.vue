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

const clearAll = async () => {
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
            ★ Click icons below to add them to your <b>URL</b>. Order reflects selection.
        </p>
    </div>
    <div class="flex flex-col gap-2">
        <!-- Controls -->
        <div class="grid grid-cols-1 md:grid-cols-6 gap-2">
            <div class="md:col-span-5">
                <UInput v-model="finalUrl" placeholder="Base URL" variant="soft" size="xl" class="w-full" disabled />
            </div>
            <div class="md:col-span-1 flex items-center gap-2">
                <UButton icon="i-lucide-copy" label="Copy" variant="soft" size="xl" block @click="copyToClipboard"
                    :disabled="selectedIcons.length === 0" />
                <UButton icon="i-lucide-x" label="Clear" variant="soft" size="xl" block @click="clearAll"
                    :disabled="selectedIcons.length === 0" />
            </div>
        </div>
    </div>
    <!-- Info -->
    <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
            <div class="bg-primary w-1 h-5" />
            <h2 class="text-2xl font-extrabold">Selected Icons</h2>
        </div>
        <TransitionGroup name="transition" tag="div" class="grid grid-cols-6 md:grid-cols-16 lg:grid-cols-22 gap-2"
            v-show="selectedIcons.length > 0">
            <img :src="`https://raw.githubusercontent.com/syvixor/skills-icons/refs/heads/main/icons/${icon}.svg`"
                    :alt="icon" v-for="icon in selectedIcons" :key="icon"  />
        </TransitionGroup>
        <p class="text-base font-medium" v-show="selectedIcons.length < 1">✗ There are no selected icons yet.</p>
    </div>
    <!-- Icons -->
    <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
            <div class="bg-primary w-1 h-5" />
            <h2 class="text-2xl font-extrabold">Available Icons</h2>
        </div>
        <div class="grid grid-cols-5 md:grid-cols-12 lg:grid-cols-18 gap-3">
            <UTooltip :text="icon" v-for="(icon, index) in icons" :key="index">
                <div class="group rounded-lg overflow-visible" :class="[selectedIcons.includes(icon as never)
                    ? 'bg-neutral-800 p-1' : '']">
                    <img :src="`https://raw.githubusercontent.com/syvixor/skills-icons/refs/heads/main/icons/${icon}.svg`"
                        :alt="icon" class="transition-transform group-hover:scale-95 group-hover:cursor-pointer"
                        @click="() => selectIcon(icon as never)" />
                </div>
            </UTooltip>
        </div>
    </div>
    <USeparator icon="i-lucide-party-popper" />
</template>

<style scoped>
.transition-enter-from,
.transition-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.transition-enter-active,
.transition-leave-active {
    transition: all 0.3s ease;
}

.transition-leave-from,
.transition-enter-to {
    opacity: 1;
    transform: translateY(0);
}
</style>