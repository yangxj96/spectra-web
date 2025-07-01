<template>
    <div>首页</div>
    <el-button :type="'primary'" @click="handleButtonClick">插件提示的使用</el-button>
</template>

<script lang="ts" setup>
import { ElMessageBox } from "element-plus";

function handleButtonClick() {
    ElMessageBox.confirm("测试以下");
}
</script>
