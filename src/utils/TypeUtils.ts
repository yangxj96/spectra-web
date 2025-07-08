import { z } from "zod";

const DictDataSchema = z.object({
    id: z.string(),
    gid: z.string(),
    label: z.string(),
    value: z.string(),
    sort: z.number(),
    remark: z.string().optional()
});

export function isDictData(data: unknown): data is DictData {
    return DictDataSchema.safeParse(data).success;
}

const DictGroupSchema = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    state: z.string(),
    remark: z.string().optional(),
    builtin: z.boolean().optional(),
    hide: z.boolean().optional()
});

export function isDictGroup(data: unknown): data is DictGroup {
    return DictGroupSchema.safeParse(data).success;
}
