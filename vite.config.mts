import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import { fileURLToPath, URL } from "url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig(({ mode }) => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    console.log("环境变量:", env);
    return {
        base: "./",
        server: {
            open: true,
            watch: {
                usePolling: true
            }
        },
        plugins: [
            vue(),
            VueDevTools(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
                imports: ["vue", "vue-router", "pinia"],
                dts: "./types/auto-imports.d.ts"
            }),
            Components({
                resolvers: [ElementPlusResolver()],
                dts: "./types/components.d.ts"
            })
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    // 屏蔽sass提示高版本删除api的警告信息
                    silenceDeprecations: ["legacy-js-api"]
                }
            }
        },
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url))
            }
        },
        build: {
            outDir: "build"
        }
    };
});
