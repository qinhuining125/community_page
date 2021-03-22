<template>
    <div class="homeContent">
        <!-- 顶部导航栏 -->
        <header-content class="topBox"></header-content>
        <!-- 新闻公告 -->
        <news-announcement
            ref="newsAnnouncement"
            class="newsAnnouncementBox"
            @newsListRow="newsDetailShow"
            @newTitleFun="newTitleFun"
        ></news-announcement>
        <map-content></map-content>
        <div class="contentBox">
            <!-- 右侧地图控制按钮 -->
            <map-toolbar
                :class="['homeMapToolbar', mapToolbarIsActive ? 'active' : '']"
                @mapBtnClick="mapBtnClick"
            ></map-toolbar>
            <!-- 图层树 -->
            <layer-tree-con
                :class="['layerTreeCon', IsLayerTreeActive ? 'active' : '']"
            ></layer-tree-con>
            <!-- 添加动画 警告信息-->
            <transition name="el-fade-in-linear">
                <warning-info
                    ref="warnInfoRef"
                    @warnDetailShow="warnDetailShow"
                    v-show="isInfoShow"
                    :class="['warningInfoBox', isInfoShow ? 'active' : '']"
                ></warning-info>
            </transition>
            <!-- 添加动画 新闻公告-->
            <transition name="el-fade-in-linear">
                <news-info
                    ref="newsInfoRef"
                    v-show="isNewsInfo"
                    :class="['newsInfoBox', isNewsInfo ? 'active' : '']"
                    @newsInfoFun="newsDetailShow"
                ></news-info>
            </transition>
            <!-- <warning-info
                :class="['warningInfoBox', isInfoShow ? 'active' : '']"
            ></warning-info> -->
            <!-- 路由 -->
            <!-- 详情弹框 -->
            <component
                :is="currentComponent"
                :massageTitle="massageTitle"
                :rowData="rowData"
                ref="newsDetailCon"
                @updateNotice="updateNotice"
            ></component>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import headerContent from "@/components/header.vue"; // 顶部导航栏
import mapContent from "./mapBrowsing/MapContainer"; // 地图
import mapToolbar from "./mapBrowsing/mapToolbar"; // 地图控件按钮
import layerTreeCon from "./mapBrowsing/layerTree"; // 图层树
import warningInfo from "@/components/news/warningInfo"; // 告警信息
import newsAnnouncement from "@/components/news/newsAnnouncement"; // 新闻公告-顶部滚动列表
import newsInfo from "@/components/news/newsInfo"; // 新闻公告-右侧列表
import newsDetail from "@/components/news/newsDetail"; // 新闻详情弹框
import warnDetail from "@/components/news/warnDetail"; // 告警信息详情弹框
export default {
    data() {
        return {
            currentComponent: "", // 弹框组件内容
            massageTitle: "信息详情", // 弹框标题
            rowData: {}, // 当前行的信息
            IsLayerTreeActive: false,
        };
    },
    name: "homeIndex",
    components: {
        headerContent,
        mapContent,
        mapToolbar,
        newsAnnouncement,
        layerTreeCon,
        warningInfo,
        newsInfo,
        newsDetail,
        warnDetail,
    },
    mounted() {
        // 添加后点击摄像头不能居中
        // this.getSQaddLayerNameMapList(); // 地图上加载社区名称
        // this.getXQaddLayerNameMapList(); // 地图上加载小区名称
    },
    computed: {
        // 获取vuex的state值
        ...mapState({
            mapToolbarIsActive: (state) => state.app.mapToolbarIsActive,
            isInfoShow: (state) => state.app.isInfoShow,
            isPartyShow: (state) => state.app.isPartyShow,
            isNewsInfo: (state) => state.app.isNewsInfo,
        }),
        // 获取路由
        routerName() {
            return this.$route.name;
        },
    },
    watch: {
        // 当路由发生变化的时候执行导航栏选中事件
        routerName: {
            handler(newName) {
                if (newName) {
                    // 监听路由发生变化的时候执行的事件
                    this.SETMapToolbarIsActive(false); // 地图控制按钮收缩
                    this.SETIsInfoShow(false); // 告警信息隐藏
                    this.SETIsLayerShow(false); // 判断图层树隐藏
                    this.SETIsSubPageListShow(false); // 隐藏子页面右侧列表
                    this.SETIsPartyShow(false); // 隐藏党员信息右侧列表
                    this.SETIsMessageBoxShow(false); // 关闭弹出框
                    this.SETIsNewsInfo(false); // 隐藏右侧新闻公告列表
                    this.SETIsNewsMessageShow(false); // 隐藏新闻弹框
                    this.SETIsFaceLareyShow(false); // 隐藏人脸轨迹弹框
                }
                if (newName == "index") {
                    this.IsLayerTreeActive = false;
                } else {
                    this.IsLayerTreeActive = true;
                }
            },
            immediate: true,
        },
    },
    methods: {
        // 点击详情页确定已读按钮时更新数据
        updateNotice(name) {
            switch (name) {
                case "news":
                    this.newTitleFun(); // 右侧列表更新
                    this.$refs.newsAnnouncement.getNoticeList(); //新闻公告滚动列表更新
                    break;
                case "warn":
                    this.mapBtnClick();
                    break;
            }
        },
        mapBtnClick() {
            // 点击告警信息图标
            this.$nextTick(() => {
                this.$refs.warnInfoRef.params.pageNum = 1; // 默认请求第一页
                this.$refs.warnInfoRef.getWarnInfoList(
                    this.$refs.warnInfoRef.params
                ); // 获取新闻公告列表
                // 如果当前列表请求的不是第一页则默认请求第一页
                // if (this.$refs.warnInfoRef.params.pageNum !== 1) {
                //     this.$refs.warnInfoRef.params.pageNum = 1; // 默认请求第一页
                //     this.$refs.warnInfoRef.getWarnInfoList(
                //         this.$refs.warnInfoRef.params
                //     ); // 获取新闻公告列表
                // }
            });
        },
        // 顶部新闻公告标题点击事件
        newTitleFun() {
            this.$nextTick(() => {
                this.$refs.newsInfoRef.params.pageNum = 1; // 默认请求第一页
                this.$refs.newsInfoRef.getNoticeList(
                    this.$refs.newsInfoRef.params
                ); // 获取新闻公告列表
                // 如果当前列表请求的不是第一页则默认请求第一页
                // if (this.$refs.newsInfoRef.params.pageNum !== 1) {
                //     this.$refs.newsInfoRef.params.pageNum = 1; // 默认请求第一页
                //     this.$refs.newsInfoRef.getNoticeList(
                //         this.$refs.newsInfoRef.params
                //     ); // 获取新闻公告列表
                // }
            });
        },
        // 顶部新闻公告列表点击事件
        newsDetailShow(i) {
            this.currentComponent = newsDetail;
            this.rowData = i;
            this.SETIsMessageBoxShow(false); // 关闭弹出框
            this.SETIsNewsMessageShow(true); // 弹框显示
        },
        // 告警信息列表点击
        warnDetailShow(i) {
            // console.log(i);
            this.currentComponent = warnDetail;
            this.rowData = i;
            this.SETIsMessageBoxShow(false); // 关闭弹出框
            this.SETIsNewsMessageShow(true); // 弹框显示
        },
        // 获取社区名称
        async getSQaddLayerNameMapList() {
            const res = await this.$Http.getSQaddLayerNameMapList();
            this.$mapView.addLayerName(res, "SQ");
        },
        // 获取小区名称
        async getXQaddLayerNameMapList() {
            const res = await this.$Http.getXQaddLayerNameMapList();
            this.$mapView.addLayerName(res, "XQ");
        },
        // 设置vuex的方法
        ...mapActions([
            "SETMapToolbarIsActive",
            "SETIsInfoShow",
            "SETIsLayerShow",
            "SETIsSubPageListShow",
            "SETIsPartyShow",
            "SETIsMessageBoxShow",
            "SETIsNewsInfo",
            "SETIsNewsMessageShow",
            "SETIsFaceLareyShow",
        ]),
    },
};
</script>

<style lang="less" scoped>
.homeContent {
    .topBox {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 99;
    }
    .contentBox {
        position: fixed;
        top: 8.7vh;
        z-index: 99;
    }
    .homeMapToolbar {
        transition: all 0.3s ease-in-out;
        position: fixed;
        right: 0.5%;
        top: 8.7vh;
    }
    .homeMapToolbar.active {
        right: 18.5%;
    }
    .newsAnnouncementBox {
        position: fixed;
        left: 25vw;
        top: 9vh;
        right: 25vw;
        z-index: 1002;
    }
    .layerTreeCon {
        position: fixed;
        left: 20%;
        top: 13vh;
    }
    .layerTreeCon.active {
        left: 12%;
    }
    .warningInfoBox,
    .newsInfoBox {
        color: #fff;
        transition: all 0.3s ease-in-out;
        position: fixed;
        top: 9vh;
        right: -18%;
        width: 18%;
        bottom: 0;
    }
    .newsInfoBox {
        bottom: 0;
    }
    .warningInfoBox.active,
    .newsInfoBox.active {
        right: 0;
    }
}
</style>
