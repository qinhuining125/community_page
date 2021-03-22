<template>
    <div class="personelEcharts">
        <el-row :gutter="10">
            <el-col :span="8" class="pr">
                <!-- 年龄结构 -->
                <h5 class="publicStyle_title2">年龄结构</h5>
                <div id="ageEcharts" ref="ageEcharts"></div>
                <div class="line"></div>
            </el-col>
            <el-col :span="8" class="pr">
                <!-- 男女比例 -->
                <h5 class="publicStyle_title2">男女比例</h5>
                <div class="line"></div>
                <el-row>
                    <el-col :span="12">
                        <div id="sexEcharts" ref="sexEcharts"></div>
                    </el-col>
                    <el-col :span="12" class="lNScaleTxt">
                        <p
                            :class="[
                                'man',
                                item.name == '男'
                                    ? 'color_yellow'
                                    : 'color_navy_blue',
                            ]"
                            v-for="item in sexSeriesData"
                            :key="item.name"
                        >
                            <i
                                :class="[
                                    'iconfont',
                                    item.name == '男'
                                        ? 'iconnancesuo'
                                        : 'iconwomen',
                                ]"
                            ></i
                            >{{ item.name }}
                            <span class="number">{{ item.value }}</span>
                        </p>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <!-- 民族比例 -->
                <h5 class="publicStyle_title2">民族比例</h5>
                <div id="nationEcharts" ref="nationEcharts"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    components: {},
    data() {
        return {
            ChartsName: [],
            ageYData: ["20以下", "20-30", "31-40", "40-50", "51-60", "60以上"],
            ageSeriesData: [28, 80, 70, 55, 28, 60],
            sexSeriesData: [
                {
                    value: 766,
                    name: "女",
                },
                {
                    value: 760,
                    name: "男",
                },
            ],
            nationLegend: ["汉族", "回族", "苗族", "土家族", "藏族"],
            nationSeriesData: [
                {
                    value: 325,
                    name: "汉族",
                },
                {
                    value: 50,
                    name: "回族",
                },
                {
                    value: 200,
                    name: "苗族",
                },
                {
                    value: 20,
                    name: "土家族",
                },
                {
                    value: 10,
                    name: "藏族",
                },
            ],
        };
    },
    watch: {
        // 监听右侧内容是否显示如果显示就加载图表
        isSubPageListShow: {
            handler: function (newName, oldName) {
                if (newName !== oldName) {
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.resizeFun();
                        }, 200);
                    });
                }
            },
            deep: true,
            // immediate: true
        },
        // 监听如果告警信息显示就加载图表
        isInfoShow: {
            handler: function (newName, oldName) {
                if (newName !== oldName) {
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.resizeFun();
                        }, 200);
                    });
                }
            },
            deep: true,
            // immediate: true
        },
        // 监听如果新闻公告显示就加载图表
        isNewsInfo: {
            handler: function (newName, oldName) {
                if (newName !== oldName) {
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.resizeFun();
                        }, 200);
                    });
                }
            },
            deep: true,
            // immediate: true
        },
    },
    mounted() {
        this.sqglJmTj(); // 年龄获取
        this.echartsOnsize(); // 图表自适应
    },
    computed: {
        ...mapState({
            isSubPageListShow: (state) => state.app.isSubPageListShow, // 子页面右侧内容
            isInfoShow: (state) => state.app.isInfoShow, // 告警信息
            isNewsInfo: (state) => state.app.isNewsInfo, // 新闻公告列表
        }),
    },
    methods: {
        // 年龄获取
        async sqglJmTj() {
            const res = await this.$Http.sqglJmTj();
            if (res.code == 0) {
                // console.log(res);
                this.ageYData = res.data.nl.keys;
                this.ageSeriesData = res.data.nl.values;
                this.sexSeriesData = res.data.xb.datas;
                this.nationLegend = res.data.mz.keys;
                this.nationSeriesData = res.data.mz.datas;
                // console.log(this.nationLegend, this.nationSeriesData);
                this.ageEchartsData(); // 年龄图表加载
                this.sexEchartsData(); // 男女比例图表加载
                this.nationEchartsData(); // 民族比例图表加载
            }
        },
        // 年龄结构
        ageEchartsData() {
            var ageChart = this.$echarts.init(this.$refs.ageEcharts);
            this.ChartsName.push(ageChart);
            // 绘制图表
            ageChart.setOption({
                grid: {
                    left: "5%",
                    right: "12%",
                    top: "0",
                    containLabel: true,
                    height: "92%",
                },
                xAxis: {
                    name: "score",
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: "dashed",
                            opacity: 0.4,
                        },
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                        },
                    },
                    axisTick: {
                        show: true,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            type: "solid",
                            color: "rgba(255, 255, 255, 0)",
                        },
                    },
                },
                yAxis: {
                    data: this.ageYData,
                    type: "category",
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#c2fff0",
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            type: "solid",
                            color: "rgba(255, 255, 255, 0)",
                        },
                    },
                },
                series: [
                    {
                        type: "bar",
                        barWidth: 14,
                        itemStyle: {
                            //
                            normal: {
                                color: this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(255,255,255,0)",
                                        },
                                        { offset: 0.5, color: "#44C0C1" },
                                        { offset: 1, color: "#188df0" },
                                    ]
                                ),
                            },
                        },
                        label: {
                            normal: {
                                show: false,
                                position: "right",
                                color: "#fff",
                            },
                        },
                        data: this.ageSeriesData,
                    },
                ],
                color: ["#188df0"],
            });
        },
        // 男女比例
        sexEchartsData() {
            var sexChart = this.$echarts.init(this.$refs.sexEcharts);
            this.ChartsName.push(sexChart);
            sexChart.setOption({
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                },
                series: [
                    {
                        name: "男女比例",
                        type: "pie",
                        radius: ["55%", "80%"],
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
                                    // console.log(params)
                                    var percent = params.percent;
                                    var str = percent + "%";
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
                        data: this.sexSeriesData,
                    },
                ],
                color: ["#f6c96b", "#4de09c"],
            });
            sexChart.dispatchAction({
                type: "highlight",
                dataIndex: 0,
            }); // dataIndex属性伟data传入的索引值
            sexChart.dispatchAction({
                type: "showTip",
                seriesIndex: 0,
                position: [120, 220],
                dataIndex: 0,
            }); // 点击生成detip工具条位置
            sexChart.on("mouseover", (e) => {
                if (e.dataIndex !== 0) {
                    // 当鼠标移除的时候 使默认的索引值去除默认选中
                    sexChart.dispatchAction({
                        type: "downplay",
                        dataIndex: 0,
                    });
                }
            });
        },
        // 民族比例
        nationEchartsData() {
            var nationChart = this.$echarts.init(this.$refs.nationEcharts);
            this.ChartsName.push(nationChart);
            nationChart.setOption({
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                },
                legend: {
                    orient: "vertical",
                    x: "10%",
                    y: "center",
                    textStyle: {
                        color: "rgba(255, 255, 255, 1)",
                        fontSize: "12",
                        fontWeight: "normal",
                    },
                    itemWidth: 10, // 设置宽度
                    itemHeight: 4, // 设置高度
                    data: this.nationLegend,
                },
                series: [
                    {
                        name: "民族比例",
                        type: "pie",
                        radius: ["40%", "80%"],
                        center: ["70%", "50%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                            },
                            emphasis: {
                                show: false,
                                formatter: function (params, ticket, callback) {
                                    // console.log(params)
                                    var percent = params.percent;
                                    var str = percent + "%";
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
                        data: this.nationSeriesData,
                    },
                ],
                color: [
                    "#fee67c",
                    "#f4a82e",
                    "#49da97",
                    "#f4812e",
                    "#7377e2",
                    "#26addd",
                ],
            });
            nationChart.dispatchAction({
                type: "highlight",
                dataIndex: 0,
            }); // dataIndex属性伟data传入的索引值
            nationChart.dispatchAction({
                type: "showTip",
                seriesIndex: 0,
                position: [120, 220],
                dataIndex: 0,
            }); // 点击生成detip工具条位置
            nationChart.on("mouseover", (e) => {
                if (e.dataIndex !== 0) {
                    // 当鼠标移除的时候 使默认的索引值去除默认选中
                    nationChart.dispatchAction({
                        type: "downplay",
                        dataIndex: 0,
                    });
                }
            });
        },
        // 图表自适应
        echartsOnsize() {
            window.onresize = () => {
                for (var i = 0; i < this.ChartsName.length; i++) {
                    this.ChartsName[i].resize();
                }
            };
        },
        // 执行图表监听事件
        resizeFun() {
            for (var i = 0; i < this.ChartsName.length; i++) {
                this.ChartsName[i].resize();
            }
        },
    },
    created() {},
};
</script>
<style lang="less" scoped>
.personelEcharts {
    background: url(../../../assets/images/bottomTxtBt_C.png) repeat-x;
    background-size: 100% 100%;
    #ageEcharts,
    #sexEcharts,
    #nationEcharts {
        width: 100%;
        height: 18vh;
    }
    .line {
        display: block;
        position: absolute;
        width: 1px;
        right: 0.05rem;
        top: 0.3rem;
        bottom: 0.3rem;
        width: 1px;
        background-color: #706f75;
    }
    .lNScaleTxt {
        padding-top: 0.3rem;
        p {
            margin-right: 0.2rem;
            padding: 0 0.05rem;
            overflow: hidden;
            font-size: 0.18rem;
            line-height: 0.4rem;
            margin-bottom: 0.2rem;
            overflow: hidden;
            i {
                font-size: 0.4rem;
                vertical-align: middle;
            }
            .number {
                float: right;
                color: #fff;
                font-size: 0.26rem;
                font-family: "jixieziti";
                margin-right: 0.2rem;
            }
        }
        .man {
            background: url(../../../assets/images/style_txtBg_green.png)
                no-repeat;
            background-size: 100% 100%;
        }
        .woman {
            background: url(../../../assets/images/style_txtBg_yellow.png)
                no-repeat;
            background-size: 100% 100%;
        }
    }
}
</style>
