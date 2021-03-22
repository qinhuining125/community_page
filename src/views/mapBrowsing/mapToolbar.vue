<template>
    <div class="mapToolbar">
        <h6
            :class="['mapSwitchBtn', isShowBar ? 'active' : '']"
            @click="mapSwitchChange"
        >
            <i class="iconfont icongongjuxiang"></i>
        </h6>
        <ul v-show="isShowBar">
            <li
                v-for="(item, idx) in mapToolbar"
                :key="idx"
                :title="item.name"
                @click="mapBtnClick(item)"
            >
                <i :class="item.icon"></i>
            </li>
        </ul>
        <face-trajectory-layer
            ref="faceTrajectoryRef"
            :massageTitle="massageTitle"
        ></face-trajectory-layer>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mapView from "@/utils/mapView.js";
import faceTrajectoryLayer from "@/components/messageBox/faceTrajectoryLayer"; // 人脸轨迹弹框
export default {
    components: {
        faceTrajectoryLayer,
    },
    name: "mapToolbar",
    data() {
        return {
            massageTitle: "人脸轨迹",
            isShowBar: true,
            mapToolbar: [
                {
                    name: "指北",
                    icon: "iconfont iconicon",
                },
                {
                    name: "全屏",
                    icon: "iconfont iconquanping",
                },
                {
                    name: "放大",
                    icon: "iconfont iconjia",
                },
                {
                    name: "缩小",
                    icon: "iconfont iconjian",
                },
                {
                    name: "全图",
                    icon: "iconfont iconquantu",
                },
                {
                    name: "清除",
                    icon: "iconfont iconshanchu-copy-copy",
                },
                {
                    name: "告警信息",
                    icon: "iconfont iconyichang",
                },
                {
                    name: "人脸轨迹",
                    icon: "iconfont iconwinfo-icon-guiji color_green",
                },
            ],
        };
    },
    mounted() {},
    computed: {
        ...mapState({
            isSubPageListShow: (state) => state.app.isSubPageListShow,
            mapToolbarIsActive: (state) => state.app.mapToolbarIsActive,
            isNewsInfo: (state) => state.app.isNewsInfo,
            isInfoShow: (state) => state.app.isInfoShow,
        }),
    },
    methods: {
        ...mapActions([
            "SETIsInfoShow",
            "SETIsPartyShow",
            "SETMapToolbarIsActive",
            "SETIsSubPageListShow",
            "SETIsMessageBoxShow",
            "SETIsNewsInfo",
            "SETIsFaceLareyShow",
        ]),
        // 地图工具栏展开隐藏
        mapSwitchChange() {
            this.isShowBar = !this.isShowBar;
        },
        // 点击地图控件按钮
        mapBtnClick(i) {
            switch (i.name) {
                case "指北":
                    mapView.viewer.scene.camera.flyTo({
                        // 智慧社区定位
                        destination: new Cesium.Cartesian3.fromDegrees(
                            121.34612,
                            31.14985,
                            100
                        ),
                        // 物探院定位
                        // destination: new Cesium.Cartesian3.fromDegrees(
                        //     112.57632,
                        //     37.80476,
                        //     596.18
                        // ),
                        orientation: {
                            heading: Cesium.Math.toRadians(0),
                            pitch: Cesium.Math.toRadians(-5),
                            roll: Cesium.Math.toRadians(0),
                        },
                        duration: 3.0,
                    });
                    break;
                case "全屏":
                    if (Cesium.Fullscreen.fullscreen) {
                        Cesium.Fullscreen.exitFullscreen();
                    } else {
                        Cesium.Fullscreen.requestFullscreen(document.body);
                    }
                    break;
                case "放大":
                    mapView.viewer.camera.zoomIn(
                        (mapView.viewer.camera.positionCartographic.height /
                            Math.abs(Math.sin(mapView.viewer.camera.pitch))) *
                            0.2
                    );
                    break;
                case "缩小":
                    mapView.viewer.camera.zoomOut(
                        (mapView.viewer.camera.positionCartographic.height /
                            Math.abs(Math.sin(mapView.viewer.camera.pitch))) *
                            0.2
                    );
                    break;
                case "全图":
                    mapView.zhsqFlyHome();
                    break;
                case "清除":
                    // 清除图标并回到初始位置
                    mapView.clearPic(); // 清除图标
                    mapView.zhsqFlyHome(); // 定位到初始位置
                    this.SETIsMessageBoxShow(false); // 关闭弹出框
                    break;
                case "告警信息":
                    // 如果子页面右侧内容显示地图控制栏展开时执行
                    if (this.isSubPageListShow && this.mapToolbarIsActive) {
                        this.SETIsSubPageListShow(false); // 隐藏子页面右侧内容
                        this.SETIsInfoShow(true); // 告警信息显示
                        this.SETIsPartyShow(false); // 党员信息右侧内容隐藏
                        this.SETMapToolbarIsActive(true); // 地图控制栏展开状态
                    } else if (this.isNewsInfo && this.mapToolbarIsActive) {
                        // 如果新闻公告显示就隐藏
                        this.SETMapToolbarIsActive(true); // 地图控制栏展开状态
                        this.SETIsNewsInfo(false); // 新闻公告列表隐藏
                        this.SETIsInfoShow(true); // 告警信息显示
                    } else {
                        // 设置菜单导航栏状态
                        this.SETMapToolbarIsActive(
                            !this.$store.state.app.mapToolbarIsActive
                        );
                        this.SETIsInfoShow(!this.$store.state.app.isInfoShow); // 设置告警信息显示状态
                    }
                    // 如果警告信息显示就请求
                    if (this.isInfoShow) {
                        this.$emit("mapBtnClick");
                    }
                    break;
                default:
                    // 人脸轨迹
                    this.SETIsFaceLareyShow(true);
                    break;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.mapToolbar {
    .mapSwitchBtn,
    ul li {
        position: relative;
        border-radius: 4px;
        width: 0.36rem;
        height: 0.36rem;
        background: rgba(29, 30, 36, 0.6);
        line-height: 0.36rem;
        cursor: pointer;
        display: block;
        text-align: center;
        margin-bottom: 0.1rem;
    }
    .iconfont {
        color: #fff;
        font-size: 0.2rem;
    }

    .mapSwitchBtn:before {
        position: absolute;
        display: block;
        content: "";
        right: 0.15vw;
        bottom: 0.2vw;
        border-bottom: 0.3vw solid #fff;
        border-left: 0.3vw solid transparent;
    }
    .mapSwitchBtn.active:before,
    .mapSwitchBtn:hover:before {
        border-bottom: 0.3vw solid #37e0b7;
    }
    .mapSwitchBtn.active,
    .mapSwitchBtn:hover,
    ul li:hover {
        background: rgba(43, 62, 95, 1);
        .iconfont {
            color: #39e0b5;
        }
    }

    ul li:last-child:hover {
        background: rgba(43, 62, 95, 1);
        .iconfont {
            color: #f2777a;
        }
    }
    .iconyichang {
        color: #f2777a;
    }
}
</style>
