import { http, HttpResponse } from "msw";

export default [
    http.get("api/menu/getUserMenu", () => {
        return HttpResponse.json({
            code: 0,
            msg: "操作成功",
            data: [
                {
                    id: "1",
                    icon: "home",
                    name: "name",
                    url: "url",
                    children: [
                        {
                            id: "1-1",
                            icon: "home",
                            name: "name1",
                            url: "url"
                        },
                        {
                            id: "1-2",
                            icon: "home",
                            name: "name2",
                            url: "url"
                        },
                        {
                            id: "1-3",
                            icon: "home",
                            name: "name3",
                            url: "url"
                        }
                    ]
                }
            ]
        } as IResult<Menu[]>);
    })
];
