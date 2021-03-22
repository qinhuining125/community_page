<template>
    <div class="publicStyle_bg right-common">
        <span class="close-btn" @click="rightCloseBtn"
            ><i class="iconfont iconguanbi"></i
        ></span>
        <span class="publicStyle_line"></span>
        <h2 class="publicStyle_title">{{ title }}</h2>
        <monitor v-if="active == 0" ref="monitorRef"></monitor>
        <gate v-else-if="active == 1"></gate>
        <smoke-sense ref="smokeSenseRef" v-else-if="active == 2"></smoke-sense>
        <water-meter ref="waterMeterRef" v-else-if="active == 3"></water-meter>
        <well-cover ref="wellCoverRef" v-else-if="active == 4"></well-cover>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import monitor from "./rightEquipment/monitor"; //监控切换
import gate from "./rightEquipment/gate"; //闸机
import smokeSense from "./rightEquipment/smokeSense"; //烟感
import waterMeter from "./rightEquipment/waterMeter"; //水表
import wellCover from "./rightEquipment/wellCover"; //井盖
export default {
    name: "rightCommon",
    props: ["active", "title"],

    components: {
        monitor,
        gate,
        smokeSense,
        waterMeter,
        wellCover,
    },
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {
        ...mapActions(["SETIsSubPageListShow", "SETMapToolbarIsActive"]),
        rightCloseBtn() {
            this.SETIsSubPageListShow(false);
            this.SETMapToolbarIsActive(false);
        },
    },
    created() {},
    mounted() {},
};
</script>
<style lang="less" scoped>
.close-btn {
    position: absolute;
    right: 0.1rem;
    top: 0.1rem;
    cursor: pointer;
    color: #fff;
    font-size: 0.18rem;
}
</style>
