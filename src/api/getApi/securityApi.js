// 智能安防接口
const baseUrl =
    process.env.NODE_ENV === "development" ? "/serverApi" : myConfig.serverApi;
const security = {
    //设备
    getSbtjcount: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/getSbtjcount"
    },
    //报警统计
    warnTotal: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/znaf/api/getBjtj"
    },
    //报警处理
    warnManage: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/znaf/api/getBjcz"
    },
    //异常行为
    behaviorList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/znaf/api/getYcnr"
    },
    // //视频监控信息
    monitorList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/znaf/api/getSplb"
    },
    //视频监控信息 -- 本地
    // monitorList: {
    //     method: "get",
    //     url: myConfig.faceRrajectoryServeApi + "/service-wutanyuan/znaf/api/getSplb"
    // },
    //闸机人员信息
    gateList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/znaf/api/getMjjc"
    },
    //闸机车辆信息
    carList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/znaf/api/getDgjc"
    },
    //烟感信息
    smokeList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/znaf/api/getYgzs"
    },
    //水表信息
    waterList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/znaf/api/getSbzs"
    },
    //井盖信息
    coverList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/znaf/api/getJgzs"
    }
};

export default security;
