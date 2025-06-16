import type { App } from "vue";
// 状态
import { createStore } from "@/plugin/store";
// 路由
import router from "@/plugin/router";
// element自定义的样式文件
import "@/plugin/element/index.scss";
// element全局指令
import ElementPlus from "element-plus";
// 使用 vueuse 控制深色模式
import { useDark, useToggle } from "@vueuse/core";
import CommonUtils from "@/utils/CommonUtils.ts";

// 启用暗色模式的响应式状态
const isDark = useDark();
const toggleDark = useToggle(isDark);
toggleDark(CommonUtils.shouldEnableDarkMode());

export default function loadPlugins(app: App) {
    app.use(createStore()).use(router).use(ElementPlus);
}
