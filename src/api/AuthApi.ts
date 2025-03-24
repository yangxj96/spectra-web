import request from "@/plugin/request/index.ts";
import type { AxiosResponse } from "axios";

export default {
    async Login(username: string, password: string): Promise<IResult<LoginInfo>> {
        return request
            .post("/api/auth/login", {
                username,
                password
            })
            .then((response: AxiosResponse<IResult<LoginInfo>>) => {
                return response.data;
            });
    }
};
