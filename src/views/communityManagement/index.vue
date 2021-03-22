<template>
    <div class="communityManagement">
        <sub-nav
            class="subNavCon"
            @subNavChage="subNavChage"
            :subNavList="subNavList"
        ></sub-nav>
        <component :is="currentComponent" ref="componentRef"></component>
        <!-- 添加动画效果 -->
        <!-- <transition name="el-fade-in-linear">
            <right-content
                v-show="isSubPageListShow"
                :class="[
                    'rightCon',
                    'subPageRightCon',
                    isSubPageListShow ? 'active' : ''
                ]"
                :title="title"
            ></right-content>
        </transition> -->
        <!-- <right-content
            :class="['rightCon', isSubPageListShow ? 'active' : '']"
            :title="title"
        ></right-content> -->
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import personnelCon from "./personnel/index"; // 人员
import houseCon from "./horse/index"; // 房屋
import carCon from "./carCon/index"; // 车辆
import equipmentCon from "./equipmentCon"; // 设备
import subNav from "@/components/subpageNavigation"; // 子菜单
export default {
    components: {
        personnelCon,
        subNav,
        houseCon,
        carCon,
        equipmentCon,
    },
    data() {
        return {
            title: "人员信息",
            currentComponent: personnelCon, // 左侧内容切换
            subNavList: [
                {
                    name: "人员",
                    ico: "iconfont iconav1",
                },
                {
                    name: "房屋",
                    ico: "iconfont icondalou",
                },
                {
                    name: "车辆",
                    ico: "iconfont iconwaichucheliang1",
                },
                // {
                //     name: "设备",
                //     ico: "iconfont iconshebei"
                // }
            ],
        };
    },
    watch: {},
    computed: {
        // 获取vuex state的变量
        ...mapState({
            isSubPageListShow: (state) => state.app.isSubPageListShow,
            isInfoShow: (state) => state.app.isInfoShow,
            isPartyShow: (state) => state.app.isPartyShow,
        }),
    },
    methods: {
        ...mapActions([
            "SETIsSubPageListShow",
            "SETIsInfoShow",
            "SETMapToolbarIsActive",
            "SETIsNewsInfo",
            "SETIsNewsMessageShow",
        ]),
        // 子导航点击事件
        subNavChage(item) {
            // console.log(item.name);
            this.SETIsSubPageListShow(false); // 右侧子页面内容隐藏
            this.SETIsInfoShow(false); // 告警信息隐藏
            this.SETMapToolbarIsActive(false); // 地图控制栏收缩
            this.SETIsNewsInfo(false); // 新闻公告列表隐藏
            this.SETIsNewsMessageShow(false); // 新闻公告弹框隐藏
            switch (item.name) {
                case "人员":
                    this.title = "人员信息 ";
                    this.currentComponent = personnelCon; // 显示人员弹框
                    break;
                case "房屋":
                    this.title = "房屋信息 ";
                    this.currentComponent = houseCon; // 显示房屋弹框
                    break;
                case "车辆":
                    this.title = "车辆信息 ";
                    this.currentComponent = carCon; // 显示车辆弹框
                    break;
                default:
                    // // 设备
                    // this.title = "设备信息 ";
                    // this.currentComponent = equipmentCon;
                    break;
            }
        },
    },
    created() {},
    mounted() {},
};
</script>
<style lang="less" scoped>
.subNav {
    min-width: 15%;
}
.communityManagement {
    color: #fff;
    .rightCon {
        transition: all 0.3s ease-in-out;
        position: fixed;
        right: -18%;
        width: 18%;
        top: 8.7vh;
        bottom: 0;
        // display: none;
    }
    .rightCon.active {
        right: 0;
        // display: block;
    }
}
</style>
