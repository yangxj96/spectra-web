/// <reference types="vite/client" />

import { ElLoadingService, ElMessage, ElMessageBox, ElNotification } from "element-plus";

interface ImportMetaEnvironment {
    /** api请求地址 **/
    readonly VITE_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnvironment;
}

declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module "@vue/runtime-core" {
    export interface ComponentCustomProperties {
        $message: typeof ElMessage;
        $notify: typeof ElNotification;
        $messageBox: typeof ElMessageBox;
        $alert: typeof ElMessageBox.alert;
        $confirm: typeof ElMessageBox.confirm;
        $prompt: typeof ElMessageBox.prompt;
        $loading: typeof ElLoadingService;
    }
}
