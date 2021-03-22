import axios from "axios";
import service from "./getApi/index";
import { Message } from "element-ui";
import baseURL from "./baseUrl";
// serve 循环遍历输出不同的请求方法

const instance = axios.create({
    baseURL,
    timeout: 5000,
    validateStatus(status) {
        switch (status) {
            case 400:
                Message.error("请求出错");
                break;
            case 401:
                Message.warning({
                    message: "授权失败，请重新登录"
                });
                return;
            case 403:
                Message.warning({
                    message: "拒绝访问"
                });
                break;
            case 404:
                Message.warning({
                    message: "请求错误,未找到该资源"
                });
                break;
            case 500:
                Message.warning({
                    message: "服务端错误"
                });
                break;
        }
        return status >= 200 && status < 300;
    }
});
const Http = {}; // 用来包裹请求方法的容器

// 请求格式/参数的统一
for (const key in service) {
    const api = service[key]; // url methods
    // async 作用：避免进入回调地狱
    Http[key] = async function(
        params, // get:url,post,put,patch(data),delete:url
        isFormData = false, // 标识是否是form-data请求
        config = {} // 配置参数
    ) {
        let newParams = {};

        // content-type是否是form-data的判断
        if (params && isFormData) {
            newParams = new FormData();
            for (const i in params) {
                newParams.append(i, params[i]);
            }
        } else {
            newParams = params;
        }
        // 不同请求的判断
        let response = {}; // 请求的返回值
        if (
            api.method === "put" ||
            api.method === "post" ||
            api.method === "patch"
        ) {
            try {
                response = await instance[api.method](
                    api.url,
                    newParams,
                    config
                );
            } catch (err) {
                response = err;
            }
        } else if (api.method === "delete" || api.method === "get") {
            config.params = newParams;
            try {
                response = await instance[api.method](api.url, config);
            } catch (err) {
                response = err;
            }
        }
        return response; // 返回响应值
    };
}

// 拦截器的添加
// 请求拦截器
instance.interceptors.request.use(
    config => {
        // 发起请求前做些什么
        return config;
    },
    error => {
        // 请求错误
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    res => {
        return res.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default Http;
