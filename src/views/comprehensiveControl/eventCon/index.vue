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
                :getSeriveName="getSeriveName"
                ref="rightContentRefZhzl"
            ></right-content>
        </transition>
    </div>
</template>

<script>
import { mapState } from "vuex";
import leftContent from "./leftCon.vue";
import rightContent from "./rightList";
export default {
    components: {
        leftContent,
        rightContent,
    },
    data() {
        return {
            title: "重点事件",
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
            // console.log(item.name);
            this.$nextTick(() => {
                this.$refs.rightContentRefZhzl.initChangeList(item.name);
            });
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
