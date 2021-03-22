import serveApi from "./communityManagementApi"; // 社区管理相关接口
import loginApi from "./login.js";
import locaJSONApi from "./locaJSON.js"; // 地图相关数据本地请求
import securityApi from "./securityApi"; // 智能安防相关接口
import partyApi from "./partyApi";  // 智慧党建的相关接口
import comprehensiveControl from './comprehensiveControl' // 综合治理相关接口
import homeApi from './home' // 首页接口
import faceRrajectoryApi from './faceRrajectoryApi.js' // 人脸轨迹

const CONTACT_API = {
    ...serveApi,
    ...loginApi,
    ...locaJSONApi,
    ...securityApi,
    ...partyApi,
    ...comprehensiveControl,
    ...homeApi,
    ...faceRrajectoryApi
};

export default CONTACT_API;
