<template>
    <div class="personnelLeftList publicStyle_bg2 subPageLeftCon">
        <div class="content">
            <dl class="total">
                <dt class="fl">
                    <img src="../../../assets/images/zhzl_icon1.png" alt="" />
                </dt>
                <dd class="fr">
                    <h5>{{ total }}</h5>
                    <h6>重点人员人数</h6>
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
            total: "140",
            personnelLeftList: [
                // {
                //     name: "独居老人",
                //     value: 42,
                // },
                // {
                //     name: "空巢老人",
                //     value: 69,
                // },
                // {
                //     name: "刑满释放",
                //     value: 5,
                // },
                // {
                //     name: "退役军人",
                //     value: 14,
                // },
                // {
                //     name: "低保人员",
                //     value: 65,
                // },
                // {
                //     name: "残疾人员",
                //     value: 12,
                // },
            ],
            resultKeyPersonDataOld: [
                {
                    id: 1,
                    xm: "艾宝",
                    xb: "女",
                    nl: "70",
                    label: "独居人员",
                    type: "elderly",
                },
                {
                    id: 2,
                    xm: "岳静媛",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "elderly",
                },
                {
                    id: 3,
                    xm: "岳富家",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "elderly",
                },
                {
                    id: 4,
                    xm: "杨丽梅",
                    xb: "女",
                    nl: "72",
                    label: "独居人员",
                    type: "elderly",
                },
                {
                    id: 5,
                    xm: "朱熠轩",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "elderly",
                },
            ],
            resultKeyPersonData: [
                {
                    id: 1,
                    xm: "艾宝",
                    xb: "女",
                    nl: "70",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 2,
                    xm: "岳静媛",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 3,
                    xm: "岳富家",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 4,
                    xm: "杨丽梅",
                    xb: "女",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 5,
                    xm: "朱熠轩",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 6,
                    xm: "何京鸽",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 7,
                    xm: "王子硕",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 8,
                    xm: "高佳",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 9,
                    xm: "王增学",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
            ],
        };
    },
    watch: {},
    computed: {},
    methods: {
        // 获取左侧数据
        async selectZdryCount() {
            const res = await this.$Http.selectZdryCount();
            res.data.forEach((i) => {
                // 总人数不在列表里面所有单独赋值
                if (i.name == "总人数") {
                    this.total = i.value;
                } else {
                    this.personnelLeftList.push(i);
                }
            });
        },
        // 获取vuex公共方法
        ...mapActions(["SETResultKeyPersonData"]),
        getpersonnelCount(item) {
            this.$emit("getpersonnelCount", item);
            // var indexOf = item.name.indexOf("老人");
            // if (indexOf != -1) {
            //     this.SETResultKeyPersonData(this.resultKeyPersonDataOld);
            // } else {
            //     this.SETResultKeyPersonData(this.resultKeyPersonData);
            // }
            // console.log(item);
        },
    },
    created() {},
    mounted() {
        this.selectZdryCount(); // 获取左侧数据统计
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
