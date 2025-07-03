export function isDictData(data: unknown): data is DictData {
    return (
        typeof data === "object" &&
        data !== null &&
        "id" in data &&
        "dict_type_id" in data &&
        "label" in data &&
        "value" in data &&
        "sort" in data &&
        "state" in data &&
        "remark" in data
    );
}

export function isDictGroup(data: unknown): data is DictGroup {
    return (
        typeof data === "object" &&
        data !== null &&
        "id" in data &&
        "name" in data &&
        "code" in data &&
        "state" in data &&
        "remark" in data &&
        "builtin" in data &&
        "hide" in data
    );
}
