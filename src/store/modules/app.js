/**
 * Created by Gaopei on 2020/11/10.
 */
const state = {
    userToken: "",
    mapToolbarIsActive: false, // 判断地图按钮按钮展开收缩
    isInfoShow: false, // 显示警告信息
    isLayerShow: false, // 判断图层树显示隐藏
    isPartyShow: false, //党员信息
    isSubPageListShow: false, // 控制子页面右侧内容显示隐藏
    currentPage: 1, // 设置当前分页
    zhzlListChange: true, // 综合治理右侧列表切换
    resultKeyPersonData: [], // 右侧重点人员列表
    tableDolumnData: [], // 表格栏目
    tableResultData: [], // 表格数据
    isMessageBoxShow: false, // 控制弹框显示隐藏
    getSeriveName: "", // 请求参数
    isNewsInfo: false, // 新闻公告信息列表展示
    isNewsMessageShow: false, // 新闻弹框显示
    isFaceLareyShow: false, // 人脸轨迹弹框展示
};

const mutations = {
    setUserToken(state, info) {
        state.userToken = info;
    },
    setMapToolbarIsActive(state, info) {
        state.mapToolbarIsActive = info;
    },
    setIsInfoShow(state, info) {
        state.isInfoShow = info;
    },
    //党员信息
    setIsPartyShow(state, info) {
        state.isPartyShow = info;
    },
    setIsLayerShow(state, info) {
        state.isLayerShow = info;
    },
    setIsSubPageListShow(state, info) {
        state.isSubPageListShow = info;
    },
    setIsquantityDisplayListActive(state, info) {
        state.isQuantityDisplayListActive = info;
    },
    setIsStateListActive(state, info) {
        state.isStateListActive = info;
    },
    setCurrentPage(state, info) {
        state.currentPage = info;
    },
    setZhzlListChange(state, info) {
        state.zhzlListChange = info;
    },
    setTableDolumnData(state, info) {
        state.tableDolumnData = info;
    },
    setTableResultData(state, info) {
        state.tableResultData = info;
    },
    setIsMessageBoxShow(state, info) {
        state.isMessageBoxShow = info;
    },
    setResultKeyPersonData(state, info) {
        state.resultKeyPersonData = info;
    },
    setGetSeriveName(state, info) {
        state.getSeriveName = info;
    },
    setIsNewsInfo(state, info) {
        state.isNewsInfo = info;
    },
    setIsNewsMessageShow(state, info) {
        state.isNewsMessageShow = info;
    },
    setIsFaceLareyShow(state, info) {
        state.isFaceLareyShow = info;
    },
};

const actions = {
    SETUserToken({ commit }, info) {
        commit("setUserToken", info);
    },
    SETMapToolbarIsActive({ commit }, info) {
        commit("setMapToolbarIsActive", info);
    },
    SETIsInfoShow({ commit }, info) {
        commit("setIsInfoShow", info);
    },
    //党员信息
    SETIsPartyShow({ commit }, info) {
        commit("setIsPartyShow", info);
    },
    // 判断图层显示隐藏
    SETIsLayerShow({ commit }, info) {
        commit("setIsLayerShow", info);
    },
    SETIsSubPageListShow({ commit }, info) {
        commit("setIsSubPageListShow", info);
    },
    SETIsquantityDisplayListActive({ commit }, info) {
        commit("setIsquantityDisplayListActive", info);
    },
    SETIsStateListActive({ commit }, info) {
        commit("setIsStateListActive", info);
    },
    SETCurrentPage({ commit }, info) {
        commit("setCurrentPage", info);
    },
    SETZhzlListChange({ commit }, info) {
        commit("setZhzlListChange", info);
    },
    SETTableDolumnData({ commit }, info) {
        commit("setTableDolumnData", info);
    },
    SETTableResultData({ commit }, info) {
        commit("setTableResultData", info);
    },
    SETIsMessageBoxShow({ commit }, info) {
        commit("setIsMessageBoxShow", info);
    },
    SETResultKeyPersonData({ commit }, info) {
        commit("setResultKeyPersonData", info);
    },
    SETGetSeriveName({ commit }, info) {
        commit("setGetSeriveName", info);
    },
    SETIsNewsInfo({ commit }, info) {
        commit("setIsNewsInfo", info);
    },
    SETIsNewsMessageShow({ commit }, info) {
        commit("setIsNewsMessageShow", info);
    },
    SETIsFaceLareyShow({ commit }, info) {
        commit("setIsFaceLareyShow", info);
    },
};

export default {
    namespace: true,
    state,
    mutations,
    actions
};
