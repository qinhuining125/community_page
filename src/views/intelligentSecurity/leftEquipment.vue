<template>
    <div class="left-equipment publicStyle_bg2 subPageLeftCon">
        <div class="content">
            <dl class="total">
                <dt class="fl">
                    <img src="../../assets/images/zhzl_icon2.png" alt="" />
                </dt>
                <dd class="fr">
                    <h5>{{ equipTotal }}</h5>
                    <h6>设备统计</h6>
                </dd>
            </dl>
            <div class="equipments">
                <el-row
                    v-for="(item, index) in equipments"
                    :key="index"
                    class="line-height"
                >
                    <el-col :span="20" class="left font-size">{{
                        item.TYPE
                    }}</el-col>
                    <el-col :span="4" class="right txtR font-number">{{
                        item.NUM
                    }}</el-col>
                </el-row>
            </div>
            <h6 class="publicStyle_subTitle">报警统计</h6>
            <progree-con :progreeListData="StatisticsData"></progree-con>
            <h6 class="publicStyle_subTitle">报警处置</h6>
            <div class="equipments">
                <el-row class="line-height">
                    <el-col :span="20" class="left font-size1">报警总数</el-col>
                    <el-col :span="4" class="right txtR font-number">{{
                        warnTotal
                    }}</el-col>
                </el-row>
            </div>
            <div id="alarm" ref="alarm"></div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import listCon from "@/components/quantityDisplayList.vue";
import progreeCon from "@/components/progressList.vue";
let startCharts4 = null;
export default {
    name: "leftEquipment",
    components: {
        listCon,
        progreeCon,
    },
    data() {
        return {
            info: {
                sqid: "SQ000001",
                xqid: "XQ000004",
            },
            equipTotal: "", //设备统计数
            warnTotal: "", //报警统计数
            warnChart: [], //报警图表
            ChartsName: [], //报警表
            equipments: [], //设备表
            StatisticsData: [], //事件统计
            // progreColor: [
            //     {
            //         color: "#43e8bf"
            //     },
            //     {
            //         color: "#fde57c"
            //     },
            //     {
            //         color: "#f38949"
            //     },
            //     {
            //         color: "#7aedfb"
            //     },
            //     {
            //         color: "#4bd896"
            //     },
            //     {
            //         color: "#fee67c"
            //     },
            //     {
            //         color: "#f38949"
            //     }
            // ],
            //合并的数组
            //progrData: ""
        };
    },
    created() {
        this.getLeftEquipment();
        this.getWarnTotal();
        this.getWarnManage();
    },
    mounted() {
        this.echartsOnsize();
        // this.alarmEcharts();
    },
    computed: {
        ...mapState({
            // 获取vuex state的变量
            isQuantityDisplayListActive: (state) =>
                state.app.isQuantityDisplayListActive,
        }),
    },
    methods: {
        //  请求后端设备统计接口
        async getLeftEquipment() {
            const res = await this.$Http.getSbtjcount();
            if (res.code == 0) {
                this.equipments = res.data.data; // 设备统计
                this.equipTotal = res.data.TOTAL; // 设备统计总数
            }
        },
        //  请求后端报警统计接口
        async getWarnTotal() {
            const res = await this.$Http.warnTotal();
            if (res.code == 0) {
                this.StatisticsData = res.data;
            }
        },
        //  请求后端报警处置接口
        async getWarnManage() {
            const res = await this.$Http.warnManage();
            if (res.code == 0) {
                this.warnChart = res.data.data;
                this.warnTotal = res.data.TOTAL;
                this.alarmEcharts();
            }
        },

        // 报警处置状态图表
        alarmEcharts() {
            // console.log(this.warnChart);
            var isSet = true; // 为了做判断：当鼠标移动上去的时候，自动高亮就被取消
            var charPie3currentIndex = 0;

            var alarmChart = this.$echarts.init(this.$refs.alarm);
            this.ChartsName.push(alarmChart);
            var option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                    position: "top",
                },
                series: [
                    {
                        // hoverAnimation: true,
                        name: "报警处置状态",
                        type: "pie",
                        radius: ["55%", "75%"],
                        center: ["45%", "50%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                            },
                            emphasis: {
                                show: true,
                                formatter: function (params, ticket, callback) {
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
                        data: this.warnChart,
                    },
                ],
                color: ["#4bd896", "#fee67c", "#f38949", "#43e8bf", "#fde57c"],
            };
            alarmChart.setOption(option);

            // 2、鼠标移动上去的时候的高亮动画
            alarmChart.on("mouseover", function (param) {
                isSet = false;
                clearInterval(startCharts4);
                // 取消之前高亮的图形
                alarmChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: charPie3currentIndex,
                });
                // 高亮当前图形
                alarmChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: param.dataIndex,
                });
                // 显示 tooltip
                // alarmChart.dispatchAction({
                //     type: "showTip",
                //     seriesIndex: 0,
                //     dataIndex: param.dataIndex
                // });
            });
            // 3、自动高亮展示
            var chartHover = function () {
                var dataLen = option.series[0].data.length;
                // 取消之前高亮的图形
                alarmChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: charPie3currentIndex,
                });
                charPie3currentIndex = (charPie3currentIndex + 1) % dataLen;
                // 高亮当前图形
                alarmChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: charPie3currentIndex,
                });
                // 显示 tooltip
                // alarmChart.dispatchAction({
                //     type: "showTip",
                //     seriesIndex: 0,
                //     dataIndex: charPie3currentIndex
                // });
            };
            startCharts4 = setInterval(chartHover, 2000);
            // 4、鼠标移出之后，恢复自动高亮
            alarmChart.on("mouseout", function (param) {
                // 取消之前高亮的图形
                alarmChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: param.dataIndex,
                });
                if (!isSet) {
                    startCharts4 = setInterval(chartHover, 2000);
                    isSet = true;
                }
            });
        },

        // 获取左侧列表点击状态
        getHouseCount(item, idx) {
            this.$refs.checkInListRef.isActive = -1;
            this.$refs.houseLeftListRef.isActive = idx;
            // console.log(item);
        },
        // 房屋入住情况点击事件
        getHouseStateCount(item, idx) {
            this.$refs.houseLeftListRef.isActive = -1;
            this.$refs.checkInListRef.isActive = idx;
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
        ...mapActions(["SETIsquantityDisplayListActive"]),
    },
};
</script>
<style lang="less" scoped>
.left-equipment {
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
    #alarm {
        width: 100%;
        height: 17vh;
    }
}

.equipments {
    padding: 0 0.1rem;
}
.line-height {
    line-height: 2.1vh;
}
.font-size,
.font-size1 {
    font-size: 0.14rem;
}
.font-size:hover {
    background: url("../../assets/images/dj_txtBg_green_left.png") left
        no-repeat;
    background-size: 100% 100%;
}
.font-number {
    font-size: 0.2rem;
    font-family: "jixieziti";
    color: #22e6fc;
}
</style>
