<script setup lang="ts">
import DictApi from "@/api/DictApi";
import { isDictData, isDictGroup } from "@/utils/TypeUtils";
import { ElMessage, type FormInstance } from "element-plus";

// 树形props配置
const treeProps = { children: "children", label: "name", value: "id" };

// 字典组表单数据
const dictGroupTableData = ref<DictTypeTree[]>([]);

// 字典数据表单数据
const dictDataTableData = ref<DictData[]>([]);

// 字典组编辑表单
const groupEditFrom = useTemplateRef<FormInstance>("groupEditFrom");

// 字典数据编辑表单
const dataEditForm = useTemplateRef<FormInstance>("dataEditForm");

// 定义字典组编辑对话框的状态和表单数据
const groupEdit = reactive({
    visible: false,
    loading: false,
    edit: false,
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
    } as DictGroup
});

// 定义字典数据编辑对话框的状态和表单数据
const dataEdit = reactive({
    visible: false,
    loading: false,
    edit: false,
    rules: {
        dict_type_id: [{ required: true, message: "请选择所属字典组", trigger: "blur" }],
        label: [
            { required: true, message: "请输入字典项名称", trigger: "blur" },
            { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        value: [
            { required: true, message: "请输入字典项值", trigger: "blur" },
            { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        sort: [{ required: true, message: "请输入排序值", trigger: "blur" }],
        state: [{ required: true, message: "请选择字典状态", trigger: "blur" }]
    },
    form: {
        id: "",
        dict_type_id: "",
        label: "",
        value: "",
        sort: 999,
        state: "",
        remark: ""
    } as DictData
});

const currentGroup = ref<DictGroup>();

// 监听当前字典组的变化
watch(
    () => currentGroup.value,
    newVal => {
        if (newVal) {
            // 如果当前字典组有值，获取对应的字典数据
            handleGetDictDataByTypeCode();
        } else {
            // 如果没有选中任何字典组，清空字典数据表格
            dictDataTableData.value = [];
        }
    }
);

// 初始化数据
const initData = () => {
    DictApi.getTypesGroupTree().then(res => {
        if (res.code === 200) {
            dictGroupTableData.value = res.data!;
        }
    });
};

// 处理树节点点击事件
const handleNodeClick = (data: DictTypeTree) => {
    currentGroup.value = data;
};

// 根据字典组CODE获取字典数据
const handleGetDictDataByTypeCode = () => {
    DictApi.getDataByTypeCode(currentGroup.value!.code).then(res => {
        if (res.code === 200) {
            dictDataTableData.value = res.data!;
        } else {
            ElMessage.error("获取字典数据失败");
        }
    });
};

// 打开新增字典类型对话框
const handleDialogGroupOpen = (row: DictGroup | unknown) => {
    groupEdit.visible = true;
    groupEdit.edit = isDictGroup(row);
    groupEdit.form = isDictGroup(row)
        ? ({ ...row } as DictGroup)
        : {
              id: "",
              pid: "",
              name: "",
              code: "",
              state: "启用",
              remark: ""
          };
    if (groupEditFrom.value) {
        groupEditFrom.value.resetFields();
    }
};

// 打开新增字典数据对话框
const handleDialogDataOpen = (row: DictData | unknown) => {
    dataEdit.visible = true;
    dataEdit.edit = isDictData(row);
    dataEdit.form = isDictData(row)
        ? ({ ...row } as DictData)
        : {
              id: "",
              dict_type_id: "",
              label: "",
              value: "",
              sort: 999,
              state: "启用",
              remark: ""
          };
    if (dataEditForm.value) {
        dataEditForm.value.resetFields();
    }
};

// 关闭对话框并重置表单
const handleDialogClose = () => {
    groupEdit.visible = false;
    if (groupEditFrom.value) {
        groupEditFrom.value.resetFields();
    }
    dataEdit.visible = false;
    if (dataEditForm.value) {
        dataEditForm.value.resetFields();
    }
    initData();
};

// 新增或保存字典类型
const handleSaveDictType = () => {
    if (!groupEditFrom.value) return;
    groupEditFrom.value?.validate(valid => {
        if (!valid) {
            ElMessage.error("请检查必填内容");
            return;
        }
        groupEdit.loading = true;
        let request = groupEdit.edit ? DictApi.modifyGroup : DictApi.createGroup;
        request(groupEdit.form)
            .finally(() => {
                groupEdit.loading = false;
            })
            .then((res: IResult<unknown>) => {
                if (res.code === 200) {
                    ElMessage.success({
                        message: "保存成功",
                        duration: 1000,
                        onClose() {
                            handleDialogClose();
                            // 清空当前字典组
                            currentGroup.value = undefined;
                        }
                    });
                } else {
                    ElMessage.error(res.msg || "保存失败");
                }
            });
    });
};

// 新增或保存字典数据
const handleSaveDictData = () => {
    if (!dataEditForm.value) return;
    dataEditForm.value?.validate(valid => {
        if (!valid) {
            ElMessage.error("请检查必填内容");
            return;
        }
        dataEdit.loading = true;
        let request = dataEdit.edit ? DictApi.modifyData : DictApi.createData;
        request(dataEdit.form)
            .finally(() => {
                dataEdit.loading = false;
            })
            .then((res: IResult<unknown>) => {
                if (res.code === 200) {
                    ElMessage.success({
                        message: "保存成功",
                        duration: 1000,
                        onClose() {
                            handleDialogClose();
                            handleGetDictDataByTypeCode();
                        }
                    });
                } else {
                    ElMessage.error(res.msg || "保存失败");
                }
            });
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
                    <el-button @click="handleDialogGroupOpen">
                        <icons name="icon-edit" />
                        新增字典组
                    </el-button>
                    <el-button @click="handleDialogDataOpen">
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
                    :data="dictGroupTableData"
                    default-expand-all
                    :props="treeProps"
                    @node-click="handleNodeClick" />
            </el-col>
            <el-col :span="20">
                <el-table :data="dictDataTableData" row-key="id" stripe height="78vh">
                    <template #empty>
                        <p>无字典项</p>
                    </template>
                    <el-table-column align="center" type="index" />
                    <el-table-column align="center" label="标签" prop="label" />
                    <el-table-column align="center" label="值" prop="value" />
                    <el-table-column align="center" label="排序" prop="sort" />
                    <el-table-column align="center" label="状态" prop="state">
                        <template #default="scope">
                            <el-tag :type="scope.row.state === '启用' ? 'success' : 'danger'">
                                {{ scope.row.state }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="备注" prop="remark" />
                    <el-table-column align="center" label="操作">
                        <template #default="scope">
                            <el-button link type="primary" @click="handleDialogDataOpen(scope.row)">编辑</el-button>
                            <el-button link type="primary">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>

    <!-- 字典类型编辑框 -->
    <el-dialog
        v-model="groupEdit.visible"
        v-loading="groupEdit.loading"
        :title="(groupEdit.edit ? '编辑' : '新增') + '字典组'"
        width="500">
        <template #default>
            <el-form ref="groupEditFrom" :model="groupEdit.form" :rules="groupEdit.rules" label-width="auto">
                <el-form-item v-if="groupEdit.edit" label="主键ID">
                    <p>{{ groupEdit.form.id }}</p>
                </el-form-item>
                <el-form-item label="上级字典组" prop="pid">
                    <el-tree-select
                        v-model="groupEdit.form.pid"
                        default-expand-all
                        :data="dictGroupTableData"
                        node-key="id"
                        :props="treeProps" />
                </el-form-item>
                <el-form-item label="字典名称" prop="name">
                    <el-input v-model="groupEdit.form.name" placeholder="请输入字典名称" />
                </el-form-item>
                <el-form-item label="字典编码" prop="code">
                    <el-input v-model="groupEdit.form.code" placeholder="请输入字典编码" />
                </el-form-item>
                <el-form-item label="字典状态" prop="state">
                    <el-select v-model="groupEdit.form.state" placeholder="请选择字典状态">
                        <el-option label="启用" value="启用" />
                        <el-option label="禁用" value="禁用" />
                    </el-select>
                </el-form-item>
                <el-form-item label="字典描述">
                    <el-input v-model="groupEdit.form.remark" type="textarea" placeholder="请输入字典描述" />
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div class="dialog-footer">
                <el-button :disable="groupEdit.loading" @click="handleDialogClose">取消</el-button>
                <el-button :disable="groupEdit.loading" type="primary" @click="handleSaveDictType">确认</el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 字典组编辑框 -->
    <el-dialog
        v-model="dataEdit.visible"
        v-loading="dataEdit.loading"
        :title="(dataEdit.edit ? '编辑' : '新增') + '字典数据'"
        width="500">
        <template #default>
            <el-form ref="dataEditForm" :model="dataEdit.form" :rules="dataEdit.rules" label-width="auto">
                <el-form-item v-if="dataEdit.edit" label="主键ID">
                    <p>{{ dataEdit.form.id }}</p>
                </el-form-item>
                <el-form-item label="所属字典组" prop="dict_type_id">
                    <el-tree-select
                        v-model="dataEdit.form.dict_type_id"
                        default-expand-all
                        :data="dictGroupTableData"
                        node-key="id"
                        :props="treeProps" />
                </el-form-item>
                <el-form-item label="字典标签" prop="label">
                    <el-input v-model="dataEdit.form.label" placeholder="请输入字典标签" />
                </el-form-item>
                <el-form-item label="字典值" prop="value">
                    <el-input v-model="dataEdit.form.value" placeholder="请输入字典值" />
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number
                        v-model="dataEdit.form.sort"
                        :min="1"
                        :max="999"
                        placeholder="请输入字典排序"
                        style="width: 100%" />
                </el-form-item>
                <el-form-item label="字典状态" prop="state">
                    <el-select v-model="dataEdit.form.state" placeholder="请选择字典状态">
                        <el-option label="启用" value="启用" />
                        <el-option label="禁用" value="禁用" />
                    </el-select>
                </el-form-item>
                <el-form-item label="字典描述">
                    <el-input v-model="dataEdit.form.remark" type="textarea" placeholder="请输入字典描述" />
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div class="dialog-footer">
                <el-button :disable="dataEdit.loading" @click="handleDialogClose">取消</el-button>
                <el-button :disable="dataEdit.loading" type="primary" @click="handleSaveDictData">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>
