// 综合态势接口
const baseUrl =
    process.env.NODE_ENV === "development" ? "/faceRrajectoryServeApi" : myConfig.faceRrajectoryServeApi;
const faceRrajectoryApi = {
    // 太原市天气api
    faceRrajectoryLogin: {
        method: "POST",
        url: baseUrl + "/service-wutanyuan/viid/api/login"
    },
};

export default faceRrajectoryApi;
