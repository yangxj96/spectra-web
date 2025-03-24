// src/types/http.d.ts

/**
 * 响应整体
 */
type IResult<T = any> = {
    code: number;
    msg: string;
    data: T;
};
