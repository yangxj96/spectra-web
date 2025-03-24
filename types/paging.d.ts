/**
 * 分页实体
 */
type Page<T = any> = {
    current: number;
    optimize_count_sql: boolean;
    orders?: string[];
    pages: number;
    records: T[];
    search_count: boolean;
    size: number;
    total: number;
};

/**
 * 分页参数实体
 */
type Pagination = {
    size: number;
    page: number;
    page_sizes: Array<number>;
    default_page_size: number;
    total: number;
};
