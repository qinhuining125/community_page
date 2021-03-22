<template>
    <div class="personnelBox">
        <left-content
            class="leftCon"
            @getpersonnelCount="getpersonnelCount"
        ></left-content>
        <transition name="el-fade-in-linear">
            <right-content
                v-show="isSubPageListShow"
                :class="[
                    'rightCon',
                    'subPageRightCon',
                    isSubPageListShow ? 'active' : '',
                ]"
                :title="title"
                ref="rightContentRef"
                :getSeriveName="getSeriveName"
            ></right-content>
        </transition>
        <bottom-content
            :class="[
                'bottomCon',
                'subPageBottonCon',
                isSubPageListShow || isInfoShow || isNewsInfo ? 'active' : '',
            ]"
        ></bottom-content>
    </div>
</template>

<script>
import { mapState } from "vuex";
import leftContent from "./personnelLeftList";
import rightContent from "./rightListCon";
import bottomContent from "./bottomEchart";
export default {
    components: {
        leftContent,
        rightContent,
        bottomContent,
    },
    data() {
        return {
            title: "重点人员",
            getSeriveName: "",
        };
    },
    computed: {
        // 获取vuex state的变量
        ...mapState({
            isSubPageListShow: (state) => state.app.isSubPageListShow, // 子页面右侧内容
            isInfoShow: (state) => state.app.isInfoShow, // 告警信息
            isNewsInfo: (state) => state.app.isNewsInfo, // 新闻公告
        }),
    },
    methods: {
        // 左侧内容点击事件
        getpersonnelCount(item) {
            this.getSeriveName = item.name;
            // console.log(item.name);
            switch (item.name) {
                case "刑满释放":
                    this.$refs.rightContentRef.getXmstList();
                    break;
                case "残疾人员":
                    this.$refs.rightContentRef.getSfcjList();
                    break;
                case "低保人员":
                    this.$refs.rightContentRef.getSfdbList();
                    break;
                case "独居老人":
                    this.$refs.rightContentRef.getSfdjList();
                    break;
                case "退伍军人":
                    this.$refs.rightContentRef.getTyjrList();
                    break;
                case "空巢老人":
                    this.$refs.rightContentRef.getSfkcList();
                    break;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.personnelBox {
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
    .bottomCon {
        transition: all 0.3s ease-in-out;
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .bottomCon.active {
        right: 18.5%;
    }
}
</style>
