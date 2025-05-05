<script lang="ts" setup>
import { motion } from "motion-v";

const isReady = ref(false);
onMounted(() => isReady.value = true);
</script>

<template>
    <Head>
        <Title>Skills Icons - URL Builder</Title>
    </Head>
    <motion.div :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ delay: 0.5 }"
        class="relative space-y-6 p-4" v-show="isReady">
        <Header />
        <slot />
        <Footer />
    </motion.div>
    <div class="flex justify-center items-center h-screen" v-show="!isReady">
        <UButton label="Loading" color="neutral" variant="link" size="xl" loading />
    </div>
</template>