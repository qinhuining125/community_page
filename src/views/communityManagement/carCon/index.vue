<template>
    <div class="personnelBox">
        <left-content
            class="leftCon"
            @getpersonnelCount="getpersonnelCount"
        ></left-content>
        <transition name="el-fade-in-linear">
            <right-content
                ref="carRightContentRef"
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
    </div>
</template>

<script>
import { mapState } from "vuex";
import leftContent from "./leftCon.vue";
import rightContent from "./carRightList";
export default {
    components: {
        leftContent,
        rightContent,
    },
    data() {
        return {
            title: "车辆信息",
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
            this.getSeriveName = item.name;
            switch (item.name) {
                case "车辆总数":
                    this.$refs.carRightContentRef.getCarListAll(); // 每次点击都执行子级的请求事件
                    break;
                case "外来车辆":
                    this.$refs.carRightContentRef.getCarOuterList(); // 每次点击都执行子级的请求事件
                    break;
                case "小区车辆":
                    this.$refs.carRightContentRef.getCarLocalList(); // 每次点击都执行子级的请求事件
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
