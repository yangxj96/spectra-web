import http from "@/plugin/request";

export default {
    // 获取字典类型Tree
    async getTypesGroupTree(): Promise<IResult<DictTypeTree[]>> {
        return await http.get<IResult<DictTypeTree[]>>("/api/dict/type/tree").then(res => res.data);
    },
    // 创建字典类型
    async createType(params: DictType): Promise<IResult<unknown>> {
        return await http.post<IResult<DictTypeTree[]>>("/api/dict/createType", params).then(res => res.data);
    },
    // 根据字典类型CODE获取字典数据列表
    async getDataByTypeCode(code: string): Promise<IResult<unknown>> {
        return await http.get<IResult<DictData[]>>(`/api/dict/data/${code}`).then(res => res.data);
    }
};
