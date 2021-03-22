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
            ref="rightConRef"
            :class="['rightCon', isSubPageListShow ? 'active' : '']"
            :title="title"
        ></right-content> -->
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import personnelCon from "./personnel/index"; // 人员
import eventCon from "./eventCon/index"; // 房屋
import taskCon from "./taskCon/index"; // 车辆
import subNav from "@/components/subpageNavigation"; // 子菜单
export default {
    components: {
        personnelCon,
        subNav,
        eventCon,
        taskCon,
    },
    data() {
        return {
            title: "重点人员",
            currentComponent: personnelCon, // 左侧内容切换
            subNavList: [
                {
                    name: "重点人员",
                    ico: "iconfont iconav1",
                },
                {
                    name: "重点事件",
                    ico: "iconfont iconshijian",
                },
                // {
                //     name: "巡检任务",
                //     ico: "iconfont iconposition-mark",
                // },
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
            currentPage: (state) => state.app.currentPage,
        }),
    },
    methods: {
        ...mapActions([
            "SETIsSubPageListShow",
            "SETIsInfoShow",
            "SETMapToolbarIsActive",
            "SETZhzlListChange",
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
                case "重点人员":
                    this.title = "重点人员信息 ";
                    this.currentComponent = personnelCon; // 切换左侧内容
                    this.SETZhzlListChange(true); // 表格样式切换
                    break;
                case "重点事件":
                    this.title = "事件列表 ";
                    this.currentComponent = eventCon; // 切换左侧内容
                    this.SETZhzlListChange(false); // 表格样式切换
                    break;
                default:
                    this.title = "任务列表 ";
                    this.currentComponent = taskCon; // 切换左侧内容
                    this.SETZhzlListChange(false); // 表格样式切换
                    break;
            }
        },
    },
    created() {},
    mounted() {},
};
</script>
<style lang="less" scoped>
.communityManagement {
    .subNavCon {
        min-width: auto;
    }
    color: #fff;
    .rightCon {
        transition: all 0.3s ease-in-out;
        position: fixed;
        right: -18%;
        width: 18%;
        top: 8.7vh;
        bottom: 0;
    }
    .rightCon.active {
        right: 0;
    }
}
</style>
