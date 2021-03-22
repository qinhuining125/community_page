const baseUrl = process.env.VUE_APP_NAME;
const locaApi = {
    // 获取地图房屋数据
    getHouseMapList: {
        method: "get",
        url: baseUrl + "/static/json/location.json"
    },
    // 获取社区点状名称
    getSQaddLayerNameMapList: {
        method: "get",
        url: baseUrl + "/static/json/SQ_D.json"
    },
    // 获取社区点状名称
    getXQaddLayerNameMapList: {
        method: "get",
        url: baseUrl + "/static/json/XQ_D.json"
    }
};

export default locaApi;
