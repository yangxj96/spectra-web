import request from "@/plugin/request/index.ts";
import type { AxiosResponse } from "axios";

export default {
    getUserMenu(): Promise<IResult<Menu[]>> {
        return request.get("/api/menu/getUserMenu").then((response: AxiosResponse<IResult<Menu[]>>) => {
            return response.data;
        });
    }
};
