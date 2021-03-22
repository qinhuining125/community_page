<template>
    <div class="personnelBox">
        <left-content
            class="leftCon"
            @getpersonnelCount="getpersonnelCount"
        ></left-content>
        <transition name="el-fade-in-linear">
            <right-content
                ref="personelRightContentRef"
                v-show="isSubPageListShow"
                :class="[
                    'rightCon',
                    'subPageRightCon',
                    isSubPageListShow ? 'active' : '',
                ]"
                :title="title"
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
import rightContent from "./personRightList";
import bottomContent from "./bottomEchart";
export default {
    components: {
        leftContent,
        rightContent,
        bottomContent,
    },
    data() {
        return {
            title: "人员信息",
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
            // 如果想有值发生变化的时候才触发请求事件可以通过子级watch监听事件
            switch (item.name) {
                case "常驻人数":
                    this.$refs.personelRightContentRef.getCzPersonelList(); // 每次点击都执行子级的请求事件
                    break;
                default:
                    this.$refs.personelRightContentRef.getWlPersonelList2(); // 每次点击都执行子级的请求事件
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
