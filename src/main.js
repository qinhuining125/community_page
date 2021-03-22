import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import echarts from "echarts";

import Video from "video.js";
import "video.js/dist/video-js.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/style/common.less";

// 阿里巴巴图标库引用
import "@/assets/iconfont/iconfont.css";
import "@/assets/style/font.css";

import mapView from "@/utils/mapView";
import dayjs from "dayjs"
Vue.prototype.$mapView = mapView;
Vue.prototype.dayjs = dayjs;

import Http from "./api/http";
Vue.prototype.$Http = Http;
Vue.prototype.$echarts = echarts;
Vue.prototype.$video = Video;

Vue.use(ElementUI);
Vue.config.productionTip = false;
// new Vue({
//     router,
//     store,
//     render: h => h(App)
// }).$mount("#app");
$(function () {
    new Vue({
        router,
        store,
        render: (h) => h(App),
    }).$mount("#app");
})
