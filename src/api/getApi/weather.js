import { request } from "../request";

export function getWeather(versionc, appid, appsecret) {
    return request({
        method: "get",
        url: "/api",
        params: {
            versionc,
            appid,
            appsecret
        }
    });
}
