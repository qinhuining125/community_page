<template>
    <div class="securityMonitoring">
        <!-- 中间导航 -->
        <nav-bar class="nav-bar" @navChange="navChange"></nav-bar>
        <!-- 设备列表 -->
        <left-equipment></left-equipment>
        <!-- 异常行为 -->
        <abnormal-behavior></abnormal-behavior>
        <!-- 右侧信息列表 -->
        <!-- <right-info
            :class="['right-info', isSubPageListShow ? 'active' : '']"
            :title="title"
        ></right-info> -->
        <!-- 引用右边公共部分 -->
        <right-common
            :class="[
                'right-common',
                'subPageRightCon',
                isSubPageListShow ? 'active' : '',
            ]"
            ref="subPageRightCon"
            :active="active"
            :title="title"
        >
        </right-common>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import navBar from "./navBar"; //导航
import leftEquipment from "./leftEquipment"; //左边设备信息
import abnormalBehavior from "./abnormalBehavior"; //异常行为
// import rightInfo from "./rightInfo"; //右侧部分
import rightCommon from "./rightCommon"; //公共

export default {
    name: "securityMonitoring",
    components: {
        navBar,
        leftEquipment,
        abnormalBehavior,
        // rightInfo,
        rightCommon,
    },
    data() {
        return {
            active: "",
            title: "烟感信息",
        };
    },
    computed: {
        // 获取vuex state的变量
        ...mapState({
            isSubPageListShow: (state) => state.app.isSubPageListShow,
            mapToolbarIsActive: (state) => state.app.mapToolbarIsActive,
        }),
    },
    methods: {
        ...mapActions([
            "SETIsSubPageListShow",
            "SETMapToolbarIsActive",
            "SETIsNewsInfo",
        ]),
        navChange(idx, item) {
            this.active = idx;
            this.SETIsSubPageListShow(false);
            this.SETMapToolbarIsActive(false);
            this.SETIsNewsInfo(false); // 隐藏新闻公告右侧列表
            switch (item.title) {
                case "视频":
                    this.SETIsSubPageListShow(true);
                    this.SETMapToolbarIsActive(true); //地图条左右移动
                    this.title = "视频信息";
                    this.$nextTick(() => {
                        this.$refs.subPageRightCon.$refs.monitorRef.getCkcrMonitorList();
                    });
                    break;
                case "闸机":
                    this.SETIsSubPageListShow(true);
                    this.SETMapToolbarIsActive(true);
                    this.title = "闸机信息";
                    break;
                case "烟感":
                    this.SETIsSubPageListShow(true);
                    this.SETMapToolbarIsActive(true);
                    this.title = "烟感信息";
                    this.$nextTick(() => {
                        this.$refs.subPageRightCon.$refs.smokeSenseRef.initGetSmokeList();
                    });
                    break;
                case "水表":
                    this.SETIsSubPageListShow(true);
                    this.SETMapToolbarIsActive(true);
                    this.title = "水表信息";
                    this.$nextTick(() => {
                        this.$refs.subPageRightCon.$refs.waterMeterRef.initGetWaterList();
                    });
                    break;
                case "井盖":
                    this.SETIsSubPageListShow(true);
                    this.SETMapToolbarIsActive(true);
                    this.title = "井盖信息";
                    this.$nextTick(() => {
                        this.$refs.subPageRightCon.$refs.wellCoverRef.initGetCoverList();
                    });
                    break;
                default:
                    break;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.securityMonitoring {
    color: #fff;
    .right-common {
        transition: all 0.3s ease-in-out;
        position: fixed;
        right: -18%;
        // right: 0;
        width: 18%;
        top: 8.7vh;
        bottom: 0;
    }
    .right-common.active {
        right: 0%;
    }
}
</style>
