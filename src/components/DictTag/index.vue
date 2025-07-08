<script lang="ts" setup>
import useDictStore from "@/plugin/store/modules/useDictStore";

const props = defineProps<{
    dict_value: string | number;
    primary_value: string | number;
    dict_code: string;
}>();

const dictStore = useDictStore();

const dict_data = ref<DictData>();

onMounted(async () => {
    const dictData = (await dictStore.getDictData(props.dict_code)) || [];
    if (dictData.length <= 0) {
        return;
    }
    for (const item of dictData) {
        if (item.value === String(props.dict_value)) {
            dict_data.value = item;
            break;
        }
    }
});
</script>

<template>
    <div>
        <el-tag v-if="dict_data" :type="dict_data.value === String(props.primary_value) ? 'primary' : 'danger'">
            {{ dict_data.label }}
        </el-tag>
    </div>
</template>
