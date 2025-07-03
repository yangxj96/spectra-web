import http from "@/plugin/request";

export default {
    // 创建字典类型
    async createGroup(params: DictGroup): Promise<IResult<unknown>> {
        return await http.post<IResult<unknown>>("/api/dict/group/create", params).then(res => res.data);
    },
    // 修改字典组
    async modifyGroup(params: DictGroup): Promise<IResult<unknown>> {
        return await http.put<IResult<unknown>>("/api/dict/group/modify", params).then(res => res.data);
    },
    // 创建字典类型
    async createData(params: DictData): Promise<IResult<unknown>> {
        return await http.post<IResult<unknown>>("/api/dict/data/create", params).then(res => res.data);
    },
    // 修改字典数据
    async modifyData(params: DictData): Promise<IResult<unknown>> {
        return await http.put<IResult<unknown>>("/api/dict/data/modify", params).then(res => res.data);
    },
    // 获取字典类型Tree
    async getTypesGroupTree(): Promise<IResult<DictTypeTree[]>> {
        return await http.get<IResult<DictTypeTree[]>>("/api/dict/group/tree").then(res => res.data);
    },
    // 根据字典类型CODE获取字典数据列表
    async getDataByTypeCode(code: string): Promise<IResult<DictData[]>> {
        return await http.get<IResult<DictData[]>>(`/api/dict/data/${code}`).then(res => res.data);
    }
};
