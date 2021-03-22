<template>
    <ul class="progressList">
        <li v-for="(item, idx) in progreeListData" :key="idx">
            <el-row>
                <el-col :span="12" class="left">{{ item.name }}</el-col>
                <el-col :span="12" class="right txtR color_navy_blue number">{{
                    item.value
                }}</el-col>
            </el-row>
            <el-progress
                :percentage="item.percentage"
                :color="item.color"
            ></el-progress>
        </li>
    </ul>
</template>

<script>
export default {
    props: ["progreeListData"],
    components: {},
    data() {
        return {};
    },
    created() {},
    mounted() {},
    watch: {},
    computed: {},
    methods: {}
};
</script>
<style lang="less" scoped>
.progressList {
    padding: 0 0.1rem;
    color: #fff;
    font-size: 0.14rem;
    li {
        // margin-bottom: 0.1rem;
        overflow: hidden;
    }
    .number {
        font-size: 0.2rem;
        font-family: "jixieziti";
    }
    /deep/.el-row {
        line-height: 2.5vh;
    }
    /deep/.el-progress-bar__outer {
        background: #535456;
        height: 0.03rem !important;
        min-height: 3px;
    }
    /deep/.el-progress {
        overflow: hidden;
        line-height: 2vh;
    }
    /deep/.el-progress__text {
        color: #fff;
        font-size: 0.16rem !important;
        float: right;
    }
}
</style>
