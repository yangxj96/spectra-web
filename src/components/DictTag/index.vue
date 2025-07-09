<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import useDictStore from "@/plugin/store/modules/useDictStore";

const props = defineProps<{
    modelValue: string | number;
    primary_value: string | number;
    dict_code: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const dictStore = useDictStore();

const dict_data = ref<DictData>();

// 封装一个方法来加载并匹配字典数据
const loadDictData = async () => {
    if (!props.dict_code) {
        dict_data.value = {} as DictData;
        return;
    }

    const dictData = (await dictStore.getDictData(props.dict_code)) || [];

    if (dictData.length <= 0) {
        dict_data.value = {} as DictData;
        return;
    }

    for (const item of dictData) {
        if (item.value === localValue.value) {
            dict_data.value = item;
            return;
        }
    }

    // 如果没找到匹配项，清空 dict_data
    dict_data.value = undefined;
};

const localValue = computed({
    get() {
        return String(props.modelValue) || "";
    },
    set(val) {
        const parsedVal = Number.isNaN(Number(val)) ? val : Number(val);
        emit("update:modelValue", parsedVal);
    }
});

// 计算显示的 label 或 "未知"
const displayLabel = computed(() => {
    if (dict_data.value && dict_data.value.label) {
        return dict_data.value.label;
    }
    return "未知";
});

// 初次挂载时加载数据
onMounted(async () => {
    await loadDictData();
});

// 监听 props.dict_code 和 props.modelValue 变化
watch(
    () => [props.dict_code, props.modelValue],
    async () => {
        await loadDictData();
    },
    { deep: true }
);
</script>

<template>
    <div>
        <el-tag v-if="dict_data" :type="dict_data.value === String(props.primary_value) ? 'primary' : 'danger'">
            {{ displayLabel }}
        </el-tag>
    </div>
</template>
