import DictApi from "@/api/DictApi";
import { defineStore } from "pinia";

interface StoreDict {
    dicts: Record<string, DictData[]>;
}

const useDictStore = defineStore("dict", {
    state: (): StoreDict => ({
        dicts: {}
    }),
    actions: {
        async getDictData(dictCode: string) {
            if (this.dicts[dictCode]) {
                return this.dicts[dictCode];
            }
            try {
                const { code, data, msg } = await DictApi.getDataByTypeCode(dictCode);
                if (code === 200) {
                    this.dicts[dictCode] = data!;
                    return this.dicts[dictCode];
                }
                console.error(`获取字典数据失败: ${dictCode}`, msg);
                throw new Error(`获取字典数据失败: ${msg}`);
            } catch (error) {
                console.error(`获取字典数据失败: ${dictCode}`, error);
                throw new Error(`获取字典数据失败: ${error}`);
            }
        }
    },
    persist: true
});

export default useDictStore;
