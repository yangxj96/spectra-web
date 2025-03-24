<template>
    <el-container class="box">
        <el-header class="box-header">
            <navbar />
        </el-header>

        <el-container class="box-container">
            <el-aside width="200px">
                <sidebar />
            </el-aside>

            <el-main class="box-main">
                <div style="height: 100%">
                    <el-row>
                        <!-- 面包屑 -->
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item v-for="(item, idx) in breadcrumb" :key="idx" :to="{ path: item.path }">
                                {{ item.meta.title }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-row>
                    <div class="box-content loading-box">
                        <router-view v-slot="{ Component }">
                            <transition mode="out-in" name="el-zoom-in-top">
                                <component :is="Component" />
                            </transition>
                        </router-view>
                    </div>
                    <el-row>
                        <el-footer class="footer">
                            Copyright © 2018-2023
                            <strong><a href="//yangxj96.com/" target="_blank">yangxj96</a></strong>
                            &nbsp;
                            <strong><a href="//yangxj96.com/" target="_blank">yangxj96.com</a></strong>
                            All Rights Reserved. 备案号：
                            <a target="_blank" rel="nofollow" href="https://beian.miit.gov.cn/">
                                滇ICP备2023006063号-1
                            </a>
                        </el-footer>
                    </el-row>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
    import Navbar from "@/components/Layout/components/navbar/index.vue";
    import Sidebar from "@/components/Layout/components/sidebar/index.vue";
    import { type RouteLocationMatched, useRouter } from "vue-router";
    import { onMounted, ref, watch } from "vue";
    import useStore from "@/plugin/store";

    const router = useRouter();
    const systemStore = useStore().system;
    // 面包屑
    const breadcrumb = ref<RouteLocationMatched[]>([]);

    onMounted(() => {
        handlerRouter();

        watch(
            () => router.currentRoute.value.matched,
            value => {
                handlerRouter([...value]);
            },
            {
                immediate: true,
                deep: true
            }
        );
    });

    function handlerRouter(r: RouteLocationMatched[] = []) {
        if (r.length <= 0) {
            r = [...router.currentRoute.value.matched];
        }
        console.log(r);
        breadcrumb.value = r;
    }
</script>

<style scoped lang="scss">
    ::v-deep(.el-aside) {
        width: auto;
    }

    ::v-deep(.el-breadcrumb) {
        line-height: 1.5;
    }

    .box {
        height: 100vh;
    }

    .box-aside {
        min-width: 64px;
    }

    .box-header {
        height: auto;
        border-bottom: solid 1px var(--el-border-color);
        padding: 0;
    }

    .box-container {
        height: calc(100% - 61px);
    }

    .box-main {
        .box-content {
            width: 100%;
            height: calc(100% - 25px - 25px);
            padding-top: 1%;
        }

        .box-unfold-a {
            margin-right: 5px;
        }

        .box-unfold-a:hover {
            cursor: pointer;
        }

        .footer {
            text-align: center;
            width: 100%;
            height: 20px;
            font-size: 10px;
            line-height: 1;
            color: var(--el-text-color-regular);

            a {
                color: var(--el-text-color-primary);
            }
        }
    }
</style>
