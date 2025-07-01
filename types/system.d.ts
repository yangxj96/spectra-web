/**
 * 菜单
 */
type Menu = BaseEntity & {
    /**
     * 父级ID
     */
    pid: string;
    /**
     * 图标
     */
    icon: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 路径
     */
    path: string;
    /**
     * 组件地址
     */
    component: string;
    /**
     * 排序
     */
    sort: number;
    /**
     * 布局
     */
    layout?: string;
    /**
     * 模块
     */
    module?: string;
    /**
     * 参数
     */
    params?: never;
    /**
     * 元数据
     */
    meta?: never;
    /**
     * 子级
     */
    children?: Menu[];
};

/**
 * 角色
 */
type Role = BaseEntity & {
    /**
     * 角色名称
     */
    name: string;

    /**
     * 角色状态
     */
    state: boolean;

    /**
     * 角色范围
     */
    scope: number;

    /**
     * 角色备注
     */
    remark: string;
};

/**
 * 部门
 */
type Dept = BaseEntity & {
    /**
     * 名称
     */
    name: string;

    /**
     * 类型
     */
    type: string;

    /**
     * 代码
     */
    code: string;

    /**
     * 排序
     */
    sort: number;

    /**
     * 备注
     */
    remark?: string;

    /**
     * 子级
     */
    children?: Dept[];
};

/**
 * 字典组
 */
type DictType = BaseEntity & {
    /**
     * 父级ID
     */
    pid: string;
    /**
     * 字典类型名称
     */
    name: string;
    /**
     * 字典类型编码
     */
    code: string;
    /**
     * 状态
     */
    state: string;
    /**
     * 备注
     */
    remark: string;
    /**
     * 是否内置
     */
    builtin?: boolean;
    /**
     * 是否隐藏
     */
    hide?: boolean;
};

/**
 * 字典组树形结构
 */
type DictTypeTree = DictType & {
    /**
     * 下级内容
     */
    children?: DictTypeTree[];
};

/**
 * 字典数据
 */
type DictData = BaseEntity & {
    /**
     * 字典组ID
     */
    dict_type_id: string;
    /**
     * 字典标签
     */
    label: string;
    /**
     * 字典值
     */
    value: string;
    /**
     * 排序
     */
    sort: number;
    /**
     * 状态
     */
    state: string;
    /**
     * 备注
     */
    remark: string;
};
