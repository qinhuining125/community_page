<template>
    <div class="personnelBox">
        <left-content
            class="leftCon"
            @getpersonnelCount="getpersonnelCount"
        ></left-content>
        <transition name="el-fade-in-linear">
            <right-content
                v-show="isSubPageListShow"
                ref="houseRightContentRef"
                :class="[
                    'rightCon',
                    'subPageRightCon',
                    isSubPageListShow ? 'active' : '',
                ]"
                :title="title"
                :getSeriveName="getSeriveName"
            ></right-content>
        </transition>
    </div>
</template>

<script>
import { mapState } from "vuex";
import leftContent from "./houseCon.vue";
import rightContent from "./houseRightList";
export default {
    components: {
        leftContent,
        rightContent,
    },
    data() {
        return {
            title: "房屋信息",
            getSeriveName: "",
        };
    },
    computed: {
        // 获取vuex state的变量
        ...mapState({
            isSubPageListShow: (state) => state.app.isSubPageListShow,
            isInfoShow: (state) => state.app.isInfoShow,
        }),
    },
    methods: {
        // 左侧内容点击事件
        getpersonnelCount(item) {
            switch (item.name) {
                case "房屋总数":
                    this.getSeriveName = item.name;
                    this.$refs.houseRightContentRef.getFwList(); // 请求房屋总列表
                    break;
                case "入住率":
                    this.getSeriveName = item.name;
                    this.$refs.houseRightContentRef.getFwRzList(); // 请求房屋入住列表
                    break;
                case "入住":
                    this.getSeriveName = item.name;
                    this.$refs.houseRightContentRef.getFwRzList(); // 请求房屋入住列表
                    break;
                case "空置":
                    this.getSeriveName = item.name;
                    this.$refs.houseRightContentRef.getFwKzList(); // 请求房屋空置列表
                    break;
                default:
                    this.getSeriveName = item;
                    this.$refs.houseRightContentRef.getLdList(); // 请求楼栋列表
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
