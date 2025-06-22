<script setup lang="ts">
interface Tree {
    label: string;
    children?: Tree[];
}

const handleNodeClick = (data: Tree) => {
    console.log(data);
};

const data: Tree[] = [
    {
        label: "Level one 1",
        children: [
            {
                label: "Level two 1-1",
                children: [
                    {
                        label: "Level three 1-1-1"
                    }
                ]
            }
        ]
    },
    {
        label: "Level one 2",
        children: [
            {
                label: "Level two 2-1",
                children: [
                    {
                        label: "Level three 2-1-1"
                    }
                ]
            },
            {
                label: "Level two 2-2",
                children: [
                    {
                        label: "Level three 2-2-1"
                    }
                ]
            }
        ]
    },
    {
        label: "Level one 3",
        children: [
            {
                label: "Level two 3-1",
                children: [
                    {
                        label: "Level three 3-1-1"
                    }
                ]
            },
            {
                label: "Level two 3-2",
                children: [
                    {
                        label: "Level three 3-2-1"
                    }
                ]
            }
        ]
    }
];

const defaultProps = {
    children: "children",
    label: "label"
};
</script>

<template>
    <div>
        <el-row>
            <el-form :inline="true">
                <el-form-item label="字典名称">
                    <el-input placeholder="请输入字典名称" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                    <el-button>
                        <icons name="icon-edit" />
                        新增字典
                    </el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col :span="4">
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
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
</template>
