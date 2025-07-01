<script setup lang="ts">
import DictApi from "@/api/DictApi";
import { ElMessage, type FormInstance } from "element-plus";
// 树形props配置
const treeProps = { children: "children", label: "name" };
// 字典类型数据
const dictTypeData = ref<DictTypeTree[]>([]);
// 使用模板引用获取编辑表单实例
const editFrom = useTemplateRef<FormInstance>("editForm");
// 定义字典类型编辑对话框的状态和表单数据
const edit = reactive({
    visible: false,
    rules: {
        name: [
            { required: true, message: "请输入字典名称", trigger: "blur" },
            { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        code: [
            { required: true, message: "请输入字典编码", trigger: "blur" },
            { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        state: [{ required: true, message: "请选择字典状态", trigger: "blur" }]
    },
    form: {
        id: "",
        pid: "",
        name: "",
        code: "",
        state: "",
        remark: ""
    } as DictType
});

// 初始化数据
const initData = () => {
    DictApi.getTypesGroupTree().then(res => {
        if (res.code === 200) {
            dictTypeData.value = res.data!;
        }
    });
};

// 处理树节点点击事件
const handleNodeClick = (data: DictTypeTree) => {
    ElMessage.success(`选中节点: ${data.name}`);
    DictApi.getDataByTypeCode(data.code).then(res => {
        if (res.code === 200) {
            // 处理字典项数据
            console.log("字典项数据:", res.data);
        } else {
            ElMessage.error("获取字典项数据失败");
        }
    });
};

// 打开新增字典类型对话框
const handleDialogOpen = () => {
    edit.visible = true;
    edit.form = {
        id: "",
        pid: "",
        name: "",
        code: "",
        state: "",
        remark: ""
    } as DictType;
    if (editFrom.value) {
        editFrom.value.resetFields();
    }
};

// 关闭对话框并重置表单
const handleDialogClose = () => {
    edit.visible = false;
    if (editFrom.value) {
        editFrom.value.resetFields();
    }
    initData();
};

// 新增或保存字典类型
const handleSaveDictType = () => {
    if (!editFrom.value) return;
    editFrom.value?.validate(valid => {
        if (valid) {
            DictApi.createType(edit.form).then(() => handleDialogClose);
        }
    });
};

initData();
</script>

<template>
    <div style="padding-left: 1em; padding-right: 1em">
        <el-row>
            <el-form :inline="true">
                <el-form-item label="字典名称">
                    <el-input placeholder="请输入字典名称" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                    <el-button @click="handleDialogOpen">
                        <icons name="icon-edit" />
                        新增字典类型
                    </el-button>
                    <el-button>
                        <icons name="icon-edit" />
                        新增字典数据
                    </el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col :span="4">
                <el-tree
                    node-key="id"
                    :data="dictTypeData"
                    default-expand-all
                    :props="treeProps"
                    @node-click="handleNodeClick" />
            </el-col>
            <el-col :span="20">
                <el-table row-key="id" stripe height="78vh">
                    <template #empty>
                        <p>无字典项</p>
                    </template>
                    <el-table-column align="center" type="index" />
                    <el-table-column align="center" label="字典项" />
                    <el-table-column align="center" label="字典值" />
                    <el-table-column align="center" label="排序" />
                </el-table>
            </el-col>
        </el-row>
    </div>
    <!-- 字典类型编辑框 -->
    <el-dialog v-model="edit.visible" title="新增字典类型" width="500">
        <template #default>
            <el-form ref="editForm" :model="edit.form" :rules="edit.rules" label-width="auto">
                <el-form-item label="上级类型">
                    <el-tree-select
                        v-model="edit.form.pid"
                        default-expand-all
                        :data="dictTypeData"
                        node-key="id"
                        :props="treeProps" />
                </el-form-item>
                <el-form-item label="字典名称" prop="name">
                    <el-input v-model="edit.form.name" placeholder="请输入字典名称" />
                </el-form-item>
                <el-form-item label="字典编码" prop="code">
                    <el-input v-model="edit.form.code" placeholder="请输入字典编码" />
                </el-form-item>
                <el-form-item label="字典状态" prop="state">
                    <el-select v-model="edit.form.state" placeholder="请选择字典状态">
                        <el-option label="启用" value="启用" />
                        <el-option label="禁用" value="禁用" />
                    </el-select>
                </el-form-item>
                <el-form-item label="字典描述">
                    <el-input v-model="edit.form.remark" type="textarea" placeholder="请输入字典描述" />
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleDialogClose">取消</el-button>
                <el-button type="primary" @click="handleSaveDictType">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>
