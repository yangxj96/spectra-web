<template>
    <el-menu
        class="box-menu"
        :router="true"
        :default-active="route.path"
        :collapse-transition="true"
        :unique-opened="true"
        @select="onMenuItemClick">
        <el-menu-item index="Home" :route="{ path: '/' }">
            <icons name="icon-home" class-name="icon-sidebar" />
            <template #title>首页</template>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
    import { stopAllRequest } from "@/plugin/request";
    import { useRoute } from "vue-router";

    const route = useRoute();

    function onMenuItemClick() {
        stopAllRequest();
    }
</script>

<style scoped lang="scss">
    .box-menu {
        height: 100%;
    }

    .box-menu:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .icon-sidebar {
        width: 1.4em;
        height: 1.4em;
        padding-right: 0.5em;
        padding-left: 0.2em;
    }
</style>
