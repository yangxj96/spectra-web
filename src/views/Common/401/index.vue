<script setup lang="ts">
const router = useRouter();

const time = ref(-1);
const second = ref(3);

onMounted(() => {
    time.value = globalThis.setInterval(() => {
        second.value = second.value - 1;
        if (second.value <= 0) {
            router.push("/");
        }
    }, 1000);
});

onUnmounted(() => {
    clearTimeout(time.value);
});

function handleBack() {
    if (time.value != -1) {
        clearTimeout(time.value);
    }
    router.back();
}
</script>

<template>
    <el-result icon="error" title="404" :sub-title="`无权访问该页面,${second}秒后自动后退`">
        <template #extra>
            <el-button type="primary" @click="handleBack">后退</el-button>
        </template>
    </el-result>
</template>
