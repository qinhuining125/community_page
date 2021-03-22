<template>
    <div class="homeBox">
        <!-- 左侧内容 -->
        <left-content class="homeLeftBox"></left-content>
    </div>
</template>

<script>
import leftContent from "./leftContent";
export default {
    name: "home",
    data() {
        return {
            isShrink: false,
            isActiveSubMenu: -1,
        };
    },
    components: {
        leftContent,
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.homeBox {
    .homeLeftBox,
    .homeSubMenu,
    .homeMapToolbar {
        transition: all 0.3s ease-in-out;
        position: fixed;
    }
    color: #fff;
    .homeLeftBox {
        top: 8.7vh;
        left: 0.5%;
        width: 18%;
        bottom: 1%;
    }
}
</style>
