<template>
    <div class="carCon publicStyle_bg2 subPageLeftCon">
        <div class="content">
            <dl class="total">
                <dt class="fl">
                    <img
                        src="../../../assets/images/communityManagement_icon3.png"
                        alt=""
                    />
                </dt>
                <dd class="fr">
                    <!-- <h5>25</h5> -->
                    <h6 style="line-height: 0.42rem">车辆概况</h6>
                </dd>
            </dl>
            <!-- <h6 class="publicStyle_subTitle">房屋入住情况</h6> -->
            <list-con
                :list="carLeftList"
                @getCount="getCarCount"
                ref="carLeftListRef"
            ></list-con>
            <state-list
                ref="stateListRef"
                :list="carNumberState"
                :title="title"
                @stateChage="stateChage"
            ></state-list>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import listCon from "@/components/quantityDisplayList.vue";
import stateList from "@/components/stateList.vue";
export default {
    components: {
        listCon,
        stateList,
    },
    data() {
        return {
            title: {
                name: "车辆进出",
                state1: "外出",
                state2: "进入",
            },
            // 车辆进入状态
            carNumberState: [
                // {
                // {
                //     name: "小区车辆",
                //     outerNumber: 102,
                //     enterNumber: 48,
                // },
                // {
                //     name: "外来车辆",
                //     outerNumber: 13,
                //     enterNumber: 37,
                // },
            ],
            carLeftList: [
                // {
                //     name: "车辆总数",
                //     value: 140,
                // },
                // {
                //     name: "大型车",
                //     value: "10"
                // },
                // {
                //     name: "中型车",
                //     value: "14"
                // },
                // {
                //     name: "小型车",
                //     value: "116"
                // }
            ],
        };
    },
    watch: {},
    computed: {},
    methods: {
        // 获取vuex的方法
        ...mapActions([""]),
        // 车辆进入点击事件
        stateChage(item, idx) {
            this.$emit("getpersonnelCount", item);
            this.$refs.carLeftListRef.isActive = -1;
            console.log(idx);
            this.$refs.stateListRef.isActive = idx;
            // console.log(item.txt);
        },
        // 左侧列表点击事件
        getCarCount(item, idx) {
            this.$emit("getpersonnelCount", item);
            this.$refs.stateListRef.isActive = -1;
            this.$refs.carLeftListRef.isActive = idx;
            // console.log(item);
        },
        // 获取左侧列表数据
        async getCountJc() {
            const res = await this.$Http.getCountJc();
            if (res.code == 0) {
                this.carNumberState = res.data.carNumberState;
                this.carLeftList = res.data.carLeftList;
            }
        },
    },
    created() {},
    mounted() {
        this.getCountJc(); // 获取左侧列表数据
    },
};
</script>
<style lang="less" scoped>
.carCon {
    position: fixed;
    left: 0;
    top: 8.7vh;
    width: 10%;
    .total {
        padding: 0.1rem;
        overflow: hidden;
        text-align: right;
        dt {
            img {
                width: 0.42rem;
                height: 0.42rem;
            }
        }
        dd {
            h5 {
                font-family: "jixieziti";
                font-size: 0.24rem;
            }
            h6 {
                font-size: 0.15rem;
                color: #fee67c;
            }
        }
    }
}
</style>
