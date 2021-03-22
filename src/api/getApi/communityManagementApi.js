// 社区管理接口
const baseUrl =
    process.env.NODE_ENV === "development" ? "/serverApi" : myConfig.serverApi; // 如果是开发模式就启用本地代理，则是相对路径
const serveApi = {

    // 常驻居民统计
    getSfczTjByJm: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/getSfczTjByJm"
    },
    // 人员底部图表数据请示
    sqglJmTj: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/sqglJmTj"
    },
    // 居民列表
    searZhsqListByType: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/searZhsqListByType"
    },
    // 房屋左侧信息列表
    sqglFwTj: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/sqglFwTj"
    },
    // 楼栋列表
    searchLdList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/searchLdList"
    },
    // 修改密码
    resetPwd: {
        method: "post",
        url: baseUrl + "/service-wutanyuan/system/user/api/resetPwd"
    },
    // 新闻公告
    noticeList: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/system/notice/api/noticeList"
    },
    // 新闻公告--已读返回后端
    updateNotice: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/system/notice/api/updateNotice"
    },
    // 告警信息 -- 已读返回后端
    updateYc: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/community/YC/api/updateYc"
    },
    // 车辆左侧数据展示
    getCountJc: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/sqgl/api/getCountJc"
    }
};

export default serveApi;
