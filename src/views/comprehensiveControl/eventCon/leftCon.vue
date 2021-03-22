<template>
    <div class="houseCon publicStyle_bg2 subPageLeftCon">
        <div class="content">
            <dl class="total">
                <dt class="fl">
                    <img src="../../../assets/images/zhzl_icon2.png" alt="" />
                </dt>
                <dd class="fr">
                    <h5>{{ sjzs }}</h5>
                    <h6>事件总数</h6>
                </dd>
            </dl>

            <list-con
                :list="houseLeftList"
                ref="houseLeftListRef"
                @getCount="getHouseCount"
            />
            <h6 class="publicStyle_subTitle">事件类型</h6>
            <progree-con :progreeListData="houseProgreeListData"></progree-con>
            <!-- <div id="houseProperty" ref="houseProperty"></div> -->
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import listCon from "@/components/quantityDisplayList.vue";
import progreeCon from "@/components/progressList.vue";
export default {
    components: {
        listCon,
        progreeCon,
    },
    data() {
        return {
            legend_data: ["租房", "自有"],
            ChartsName: [],
            sjzs: "", // 事件总数
            houseLeftList: [
                {
                    name: "未处置",
                    value: "0",
                },
                {
                    name: "处置中",
                    value: "0",
                },
                {
                    name: "已处置",
                    value: "0",
                },
            ],
            houseProgreeListData: [
                {
                    name: "治安事件",
                    value: "8",
                    percentage: 26.67,
                    color: "#43e8bf",
                },
                {
                    name: "卫生事件",
                    value: "7",
                    percentage: 23.33,
                    color: "#fde57c",
                },
                {
                    name: "能源事件",
                    value: "3",
                    percentage: 10,
                    color: "#f38949",
                },
                {
                    name: "矛盾纠纷",
                    value: "1",
                    percentage: 3.33,
                    color: "#7aedfb",
                },
                {
                    name: "报修事件",
                    value: "11",
                    percentage: 36.37,
                    color: "#f38949",
                },
            ],
        };
    },
    mounted() {
        this.selectZdsjCount(); // 加载左侧数据
        this.getBjtj(); //获取事件总数
        // this.housePropertyEcharts(); // 图表
        // this.echartsOnsize();
    },
    computed: {
        ...mapState({
            // 获取vuex state的变量
            isQuantityDisplayListActive: (state) =>
                state.app.isQuantityDisplayListActive,
        }),
    },
    methods: {
        // 获取左侧事件总数
        async selectZdsjCount() {
            const res = await this.$Http.selectZdsjCount();
            if (res.code == 0) {
                this.sjzs = res.data.ZS; // 事件总数
                this.houseLeftList[0].value = res.data.WCZ; // 未处置
                this.houseLeftList[1].value = res.data.CZZ; // 处置中
                this.houseLeftList[2].value = res.data.YCZ; // 已处置
                // console.log(res.data);
            }
        },
        // 获取事件类型
        async getBjtj() {
            const res = await this.$Http.getBjtj();
            if (res.code == 0) {
                this.houseProgreeListData = res.data;
                // console.log(res.data);
            }
        },
        // 房屋产权状态图表
        housePropertyEcharts() {
            var housePropertyChart = this.$echarts.init(
                this.$refs.houseProperty
            );
            this.ChartsName.push(housePropertyChart);
            housePropertyChart.setOption({
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                },
                series: [
                    {
                        name: "房屋产权状态",
                        type: "pie",
                        radius: ["55%", "75%"],
                        center: ["50%", "50%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                            },
                            emphasis: {
                                show: true,
                                formatter: function (params, ticket, callback) {
                                    // console.log(params)
                                    var value = params.data.value;
                                    var name = params.data.name;
                                    var str = value + "\n" + name;
                                    return str;
                                },
                                textStyle: {
                                    fontSize: "12",
                                    fontWeight: "normal",
                                    color: "#fff",
                                },
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false,
                            },
                        },
                        data: [
                            {
                                value: 100,
                                name: "租房",
                            },
                            {
                                value: 77,
                                name: "自有",
                            },
                        ],
                    },
                ],
                color: ["#4bd896", "#fee67c"],
            });
            housePropertyChart.dispatchAction({
                type: "highlight",
                dataIndex: 0,
            }); // dataIndex属性伟data传入的索引值
            housePropertyChart.dispatchAction({
                type: "showTip",
                seriesIndex: 0,
                position: [120, 220],
                dataIndex: 0,
            }); // 点击生成detip工具条位置
            housePropertyChart.on("mouseover", (e) => {
                if (e.dataIndex !== 0) {
                    // 当鼠标移除的时候 使默认的索引值去除默认选中
                    housePropertyChart.dispatchAction({
                        type: "downplay",
                        dataIndex: 0,
                    });
                }
            });
        },
        // 获取左侧列表点击状态
        getHouseCount(item, idx) {
            this.$emit("getpersonnelCount", item);
            // console.log(item);
        },
        // 图表自适应
        echartsOnsize() {
            window.onresize = () => {
                for (var i = 0; i < this.ChartsName.length; i++) {
                    this.ChartsName[i].resize();
                }
            };
        },
        // 获取vuex的方法
        ...mapActions([
            "SETIsquantityDisplayListActive",
            "SETTableDolumnData",
            "SETTableResultData",
        ]),
    },
};
</script>
<style lang="less" scoped>
.houseCon {
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
    #houseProperty {
        width: 100%;
        height: 17vh;
    }
}
</style>
