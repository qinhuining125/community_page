// 综合治理相关接口
const baseUrl =
    process.env.NODE_ENV === "development" ? "/serverApi" : myConfig.serverApi; // 如果是开发模式就启用本地代理，则是相对路径
const comprehensiveControlApi = {
    /* 重点人员接口--开始*/
    // 重点人员左侧数据统计
    selectZdryCount: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/zhzl/api/selectZdryCount"
    },
    // 重点人员分布TOP5
    getZdryFb: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/zhzl/api/getZdryFb"
    },
    // 年龄结构图表
    getZdNl: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/zhzl/api/getZdNl"
    },
    // 男女比例
    getZdNnBl: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/zhzl/api/getZdNnBl"
    },
    // 民族比例
    getZdMzBl: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/zhzl/api/getZdMzBl"
    },
    // 人员列表
    getZdRyList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/zhzl/api/getZdRyList"
    },
    // 根据人员id取出手环信息
    getRyShInfo: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/zhzl/api/getRyShInfo"
    },
    /* 重点人员接口--结束*/

    /* 重点事件接口--开始*/

    // 左侧事件总数
    selectZdsjCount: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/zhzl/api/selectZdsjCount"
    },
    // 左侧事件类型
    getBjtj: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/znaf/api/getBjtj"
    },
    // 事件类型列表
    getZdsjList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/zhzl/api/getZdsjList"
    },
    /* 重点事件接口--结束*/
};

export default comprehensiveControlApi;
