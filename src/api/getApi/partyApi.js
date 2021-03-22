// 智慧党建相关接口
const baseUrl =
    process.env.NODE_ENV === "development" ? "/serverApi" : myConfig.serverApi;
const party = {
    //党组织
    partyOrgan: {
        method: "",
        url: baseUrl + "/service-wutanyuan/zhdj/api/"
    },
    //党员
    // partyPeople: {
    //     method: "",
    //     url: baseUrl + "/service-wutanyuan/zhdj/api/"
    // },
    //党员年龄
    partyAge: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/zhdj/api/getDyNl"
    },
    //党员学历
    partyEducation: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/zhdj/api/getDyxlFb"
    },
    //党员党龄
    partyYear: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/screen/api/zhdjTj"
    },
    //党员男女比例
    partySex: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/zhdj/api/getDyXb"
    },
    //党员民族
    partyNation: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/zhdj/api/getDyMz"
    },
};

export default party;
