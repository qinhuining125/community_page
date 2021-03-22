<template>
    <div class="personnelLeftList publicStyle_bg2 subPageLeftCon">
        <div class="content">
            <dl class="total">
                <dt class="fl">
                    <img
                        src="../../../assets/images/communityManagement_icon1.png"
                        alt=""
                    />
                </dt>
                <dd class="fr">
                    <h5>{{ personelTotal }}</h5>
                    <h6>人员人数</h6>
                </dd>
            </dl>
            <!-- <h6 class="publicStyle_subTitle">房屋入住情况</h6> -->
            <list-con
                :list="personnelLeftList"
                @getCount="getpersonnelCount"
            ></list-con>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import listCon from "@/components/quantityDisplayList.vue";
export default {
    components: {
        listCon,
    },
    data() {
        return {
            personelTotal: "",
            personnelLeftList: [
                // {
                //     name: "常驻人数",
                //     value: 1922,
                //     type: "人员"
                // },
                // {
                //     name: "流动人数",
                //     value: 78,
                //     type: "人员"
                // }
            ],
        };
    },
    watch: {},
    computed: {},
    mounted() {
        this.getSfczTjByJm();
    },
    methods: {
        ...mapActions(["SETGetSeriveName"]),
        getpersonnelCount(item) {
            this.$emit("getpersonnelCount", item);
        },
        // 常驻居民统计
        async getSfczTjByJm() {
            const res = await this.$Http.getSfczTjByJm();
            // console.log(res);
            if (res.code == 0) {
                this.personelTotal = res.data.total;
                this.personnelLeftList = res.data.map.block1;
            }
        },
    },
};
</script>
<style lang="less" scoped>
.personnelLeftList {
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
    .list {
        padding: 0.1rem;
        line-height: 0.38rem;
        li {
            cursor: pointer;
            padding-left: 0.1rem;
        }
        li:hover {
            background: url(../../../assets/images/zhzl_txtBg_green_left.png)
                left no-repeat;
        }
        .txt {
            font-size: 0.16rem;
        }
        .number {
            font-family: "jixieziti";
            font-size: 0.2rem;
        }
    }
}
</style>
