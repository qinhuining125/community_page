<template>
    <div class="carCon publicStyle_bg2 subPageLeftCon">
        <div class="content">
            <dl class="total">
                <dt class="fl">
                    <img src="../../../assets/images/zhzl_icon3.png" alt="" />
                </dt>
                <dd class="fr">
                    <h5>30</h5>
                    <h6>任务总数</h6>
                </dd>
            </dl>
            <list-con :list="carLeftList" @getCount="getCarCount"></list-con>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import listCon from "@/components/quantityDisplayList.vue";
export default {
    components: {
        listCon
    },
    data() {
        return {
            carLeftList: [
                {
                    name: "未巡",
                    value: 4
                },
                {
                    name: "在巡",
                    value: "6"
                },
                {
                    name: "已巡",
                    value: "20"
                }
            ]
        };
    },
    watch: {},
    computed: {},
    methods: {
        ...mapActions([
            "SETIsSubPageListShow",
            "SETIsInfoShow",
            "SETMapToolbarIsActive",
            "SETZhzlListChange"
        ]),
        // 左侧列表点击事件
        getCarCount(item) {
            this.$emit("getpersonnelCount", item);
        }
    },
    created() {},
    mounted() {}
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
