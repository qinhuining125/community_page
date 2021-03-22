// 综合态势接口
const baseUrl =
    process.env.NODE_ENV === "development" ? "/serverApi" : myConfig.serverApi;
const homeApi = {
    // 太原市天气api
    getWeather: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/api/city/101100101"
    },
    // 获取重点关注人员统计
    getZdryTjByJm: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/getZdryTjByJm"
    },
    // 获取社区概况统计
    getSqgkTj: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/getSqgkTj"
    },
    // 设备管理总数
    sqglSbTj: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/sqglSbTj"
    },
    // 获取摄像头列表
    getSxtList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/getSxtList"
    },
    // 获取水表列表
    getSbList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/getSbList"
    },
    // 获取闸机列表
    getZjList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/getZjList"
    },
    // 获取道杆列表
    getDgList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/getDgList"
    },
    // 获取井盖列表
    getJgList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/getJgList"
    },
    // 获取手环列表
    getShList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/getShList"
    },
    // 获取烟感列表
    getYgList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/getYgList"
    },
    // 获取人脸轨迹登录后的token
    faceRrajectoryLogin: {
        method: "post",
        url: baseUrl + "/service-wutanyuan/viid/api/login"
    },
};

export default homeApi;
