import { http, HttpResponse } from "msw";
import CommonUtils from "@/utils/CommonUtils.ts";

export default [
    http.post(import.meta.env.BASE_URL + "api/auth/login", () => {
        return HttpResponse.json({
            code: 0,
            msg: "登录成功",
            data: {
                id: "12345678",
                username: "sysadmin",
                access_token: CommonUtils.UUIDUpper(),
                authorities: ["*"],
                roles: ["sysadmin"]
            }
        } as IResult<LoginInfo>);
    })
];
