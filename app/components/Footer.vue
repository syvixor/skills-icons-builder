<script lang="ts" setup>
const license = "https://github.com/syvixor/skills-icons-builder/blob/main/LICENSE"
</script>

<template>
    <div class="flex flex-col justify-start">
        <p>©{{ new Date().getFullYear() }}. All rights reserved.</p>
        <p>This project is available under the <ULink :to="license" target="_blank">MIT License</ULink>.</p>
    </div>
</template>