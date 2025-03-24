import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";

export function useTable<T>(
    request: (parameters?: T, page_number?: number, page_size?: number) => Promise<IResult<Page<T>>>,
    parameters?: T | undefined
) {
    const pagination = ref<Pagination>({
        size: 10,
        page: 1,
        page_sizes: [10, 50, 100, 150, 300],
        default_page_size: 10,
        total: 0
    });

    const table_data = ref<T[]>([]);

    onMounted(() => {
        handleCurrentChange(pagination.value.page);
    });

    function handleCurrentChange(value: number) {
        request(parameters, value, pagination.value.size).then(handleRequestResult);
    }

    function handleSizeChange(value: number) {
        request(parameters, pagination.value.page, value).then(handleRequestResult);
    }

    function handleRequestResult(response: IResult<Page<T>>) {
        if (response.code != 0) {
            ElMessage.success({
                message: response.msg
            });
            return;
        }
        table_data.value = response.data.records as never[];
        pagination.value.total = response.data.total;
        pagination.value.size = response.data.size;
        pagination.value.page = response.data.current;
    }

    return {
        table_data,
        pagination,
        handleCurrentChange,
        handleSizeChange
    };
}
