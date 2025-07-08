<script lang="ts" setup>
import { ref, onMounted, type Prop } from "vue";
import DictApi from "@/api/DictApi";
import { ElMessage } from "element-plus";

const props = defineProps({
    modelValue: {
        type: [String, Number] as PropType<string | number>,
        required: true
    },
    placeholder: {
        type: String as PropType<string>,
        default: ""
    },
    dict_code: {
        type: String as PropType<string>,
        required: true
    }
});

const emit = defineEmits(["update:modelValue"]);

const options = ref<DictData[]>([]);

const localValue = computed({
    get() {
        return props.modelValue;
    },
    set(val) {
        emit("update:modelValue", val);
    }
});

// 挂载的时候读取字典
onMounted(async () => {
    try {
        const { code, data, msg } = await DictApi.getDataByTypeCode(props.dict_code);
        if (code === 200) {
            options.value = data!;
        }
        console.log(`字典数据:`, data);
    } catch {
        ElMessage.error("获取字典数据失败");
    }
});
</script>

<template>
    <el-select v-model="localValue" :placeholder="placeholder" clearable>
        <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value" />
    </el-select>
</template>
