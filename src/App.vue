<script setup lang="ts">
import useAppStore from "@/plugin/store/modules/useAppStore";

const locale = ref(useAppStore().lang);
const message = reactive({
    max: 3,
    duration: 500,
    plain: true
});
</script>

<template>
    <div id="nav">
        <el-config-provider :locale="locale" :message="message">
            <router-view />
        </el-config-provider>
    </div>
</template>

<style lang="scss">
@use "@/assets/css/common.scss";

* {
    padding: 0;
    margin: 0;
}
</style>
