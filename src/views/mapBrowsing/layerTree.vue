<template>
    <div class="layerTree">
        <div
            :class="['layerTreeTitle', isLayerShow ? 'active' : '']"
            @click="layerTreeShow"
        >
            <i class="iconfont iconloc-s"></i>
            地质局学府街社区
        </div>
        <el-collapse-transition>
            <el-tree
                v-show="isLayerShow"
                :data="data"
                :props="defaultProps"
                @node-click="handleNodeClick"
            ></el-tree>
        </el-collapse-transition>
    </div>
</template>

<script>
import mapView from "@/utils/mapView.js";
import { mapState, mapActions } from "vuex";
export default {
    components: {},
    data() {
        return {
            // isLayerShow: false,
            data: [
                {
                    label: "学府路社区",
                    position: {
                        x: 112.57649475,
                        y: 37.8024598583,
                        h: 782.66,
                    },
                },
                {
                    label: "东陵里社区",

                    position: {
                        x: 112.5606984,
                        y: 37.855775,
                        h: 795.22,
                    },
                },
            ],
            defaultProps: {
                children: "children",
                label: "label",
            },
        };
    },
    mounted() {},
    computed: {
        ...mapState({
            isLayerShow: (state) => state.app.isLayerShow,
        }),
    },
    methods: {
        handleNodeClick(data) {
            mapView.flyHome(data.position);
        },
        layerTreeShow() {
            console.log(this.isLayerShow);
            this.SETIsLayerShow(!this.isLayerShow);
        },
        // 设置vuex的方法
        ...mapActions(["SETIsLayerShow"]),
    },
};
</script>
<style lang="less" scoped>
.layerTree {
    background: rgba(29, 30, 36, 0.6);
    padding: 0 0.1rem;
    font-size: 0.16rem;
    color: #fff;
    max-height: 60%;
    overflow-y: auto;
    min-width: 1.8rem;
    .layerTreeTitle {
        padding-right: 0.2rem;
        position: relative;
        font-size: 0.16rem;
        line-height: 0.34rem;
        color: #fff;
        cursor: pointer;
        .iconfont {
            color: #23e6fb;
        }
    }
    .layerTreeTitle:before {
        display: block;
        content: "";
        position: absolute;
        right: 0;
        top: 0.15rem;
        border: 0.4vw solid transparent;
        border-top-color: #20e7fa;
        transition: all 0.2s;
        -webkit-transition: all 0.2s;
    }
    .layerTreeTitle.active:before {
        top: 0.6vh;
        border: 0.4vw solid transparent;
        border-bottom-color: #20e7fa;
        transition: all 0.2s;
        -webkit-transition: all 0.2s;
    }
    // .layerTreeTitle.active {
    //     border-bottom: 1px solid #818284;
    // }
    /deep/.el-tree {
        background: none !important;
        color: #fff;
    }
    /deep/.el-tree-node:focus > .el-tree-node__content {
        background: none;
        color: #43e8bf;
    }
    /deep/.el-tree-node__content:hover {
        background: none;
    }
    /deep/.el-tree-node__content {
        padding-left: 0 !important;
    }
    /deep/.el-tree-node {
        border-top: 1px solid #818284;
    }
    /deep/.el-tree-node__label {
        font-size: 0.16rem;
    }
}
</style>
