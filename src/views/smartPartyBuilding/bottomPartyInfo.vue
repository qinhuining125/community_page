<template>
    <div class="party-echarts">
        <!-- <span class="line"></span> -->
        <el-row :gutter="2">
            <el-col :span="3">
                <!-- 党员年龄分布 -->
                <!-- <div class="line1"></div> -->
                <h5 class="publicStyle_title">党员年龄分布</h5>
                <div id="yearEcharts"></div>
            </el-col>
            <el-col :span="3" class="pr">
                <!-- 党员学历分布 -->
                <div class="line1"></div>
                <h5 class="publicStyle_title">党员学历分布</h5>
                <div class="education-size">
                    <p
                        class="education-font"
                        v-for="(item, idx) in partyEducation"
                        :key="idx"
                    >
                        {{ idx + 1 }}.{{ item.XL
                        }}<span class="fr ma"
                            ><i class="number-font color-orange">{{
                                item.MUN
                            }}</i
                            >人</span
                        >
                    </p>
                </div>
            </el-col>
            <el-col :span="6" class="pr">
                <!-- 党员党龄分布 -->
                <h5 class="publicStyle_title">党员党龄分布</h5>
                <div id="ageEcharts"></div>
                <div class="line1"></div>
            </el-col>
            <el-col :span="6" class="pr">
                <!-- 党员性别比例 -->
                <h5 class="publicStyle_title">党员性别比例</h5>
                <div class="sex-box">
                    <div id="sexEcharts"></div>
                    <div class="sex-info">
                        <p class="man">
                            <i class="iconfont iconnancesuo"></i>男
                            <span class="fr font-white number-font">{{
                                sexInfo.man
                            }}</span>
                        </p>
                        <p class="woman">
                            <i class="iconfont iconwomen"></i>女
                            <span class="fr font-white number-font">{{
                                sexInfo.woman
                            }}</span>
                        </p>
                    </div>
                </div>
                <div class="line1"></div>
            </el-col>

            <el-col :span="6">
                <!-- 党员民族比例 -->
                <h5 class="publicStyle_title">党员民族比例</h5>
                <div id="nationEcharts"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapState } from "vuex";
import loginVue from "../login.vue";
let startCharts1 = null;
let startCharts2 = null;
let startCharts3 = null;
export default {
    components: {},
    data() {
        return {
            ChartsName: [],
            partyAgeData: [], //党员年龄
            partyYear: [], //党员党龄
            partySex: [], //党员性别
            partyNation: [], //党员民族
            nationName: [], // 党员名字
            ageName: [],
            partyEducation: [], // 学历
            sexInfo: {
                man: "",
                waman: "",
            },
        };
    },
    mounted() {
        this.getPartyAge(); // 党员年龄分布
        this.getPartyYear(); // 党员党龄分布
        this.getPartySex(); // 党员性别比例
        this.getPartyEducation(); // 学历
        this.getPartyNation(); // 党员民族
        this.$nextTick(() => {
            this.echartsOnsize(); //自适应图表
        });
    },
    computed: {
        ...mapState({
            isSubPageListShow: (state) => state.app.isSubPageListShow,
            isInfoShow: (state) => state.app.isInfoShow,
            isNewsInfo: (state) => state.app.isNewsInfo, // 新闻公告列表
            // isPartyShow: (state) => state.app.isPartyShow
        }),
    },
    methods: {
        //  请求后端党员年龄接口
        async getPartyAge() {
            const res = await this.$Http.partyAge();
            if (res.code == 0) {
                this.partyAgeData = res.data;
                this.yearEchartsData();
            }
        },
        //  请求后端党员学历接口
        async getPartyEducation() {
            const res = await this.$Http.partyEducation();
            if (res.code == 0) {
                this.partyEducation = res.data;
            }
        },
        //  请求后端党员党龄接口
        async getPartyYear() {
            const res = await this.$Http.partyYear();
            if (res.code == 0) {
                this.partyYear = res.data.dl.values;
                this.ageName = res.data.dl.keys;
                this.ageEchartsData(); // 党员党龄分布
            }
        },
        //  请求后端党员男女接口
        async getPartySex() {
            const res = await this.$Http.partySex();
            if (res.code == 0) {
                this.sexInfo.woman = res.data[0].value;
                this.sexInfo.man = res.data[1].value;
                this.partySex = res.data;
                this.sexEchartsData();
            }
        },
        //  请求后端党员民族接口
        async getPartyNation() {
            const res = await this.$Http.partyNation();
            if (res.code == 0) {
                this.partyNation = res.data;
                res.data.forEach((i) => {
                    this.nationName.push(i.name);
                });
                this.nationEchartsData();
            }
        },

        // 党员年龄比例
        yearEchartsData() {
            var isSet = true; // 为了做判断：当鼠标移动上去的时候，自动高亮就被取消
            var charPie3currentIndex = 0;

            var yearChart = this.$echarts.init(
                document.getElementById("yearEcharts")
            );
            this.ChartsName.push(yearChart);
            var option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                    position: "top",
                },
                series: [
                    {
                        name: "党员年龄占比统计",
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
                                    // var percent = params.percent;
                                    // var str = percent + "%";
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
                        data: this.partyAgeData,
                        // data: [
                        //     {
                        //         value: 10,
                        //         name: "30岁以下",
                        //     },
                        //     {
                        //         value: 55,
                        //         name: "30-50岁",
                        //     },
                        //     {
                        //         value: 35,
                        //         name: "50岁以上",
                        //     },
                        // ],
                    },
                ],
                color: ["#f6c96b", "#4de09c", "#7377e2"],
            };
            yearChart.setOption(option);

            // 2、鼠标移动上去的时候的高亮动画
            yearChart.on("mouseover", function (param) {
                isSet = false;
                clearInterval(startCharts1);
                // 取消之前高亮的图形
                yearChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: charPie3currentIndex,
                });
                // 高亮当前图形
                yearChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: param.dataIndex,
                });
                // 显示 tooltip
                // yearChart.dispatchAction({
                //     type: "showTip",
                //     seriesIndex: 0,
                //     dataIndex: param.dataIndex
                // });
            });
            // 3、自动高亮展示
            var chartHover = function () {
                var dataLen = option.series[0].data.length;
                // 取消之前高亮的图形
                yearChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: charPie3currentIndex,
                });
                charPie3currentIndex = (charPie3currentIndex + 1) % dataLen;
                // 高亮当前图形
                yearChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: charPie3currentIndex,
                });
                // 显示 tooltip
                // yearChart.dispatchAction({
                //     type: "showTip",
                //     seriesIndex: 0,
                //     dataIndex: charPie3currentIndex
                // });
            };
            startCharts1 = setInterval(chartHover, 2000);
            // 4、鼠标移出之后，恢复自动高亮
            yearChart.on("mouseout", function (param) {
                // 取消之前高亮的图形
                yearChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: param.dataIndex,
                });
                if (!isSet) {
                    startCharts1 = setInterval(chartHover, 2000);
                    isSet = true;
                }
            });
        },
        // 党员党龄分布
        ageEchartsData() {
            var ageChart = this.$echarts.init(
                document.getElementById("ageEcharts")
            );
            this.ChartsName.push(ageChart);
            var option = {};
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
                    data: this.ageName,
                    // data: [
                    //     "20以下",
                    //     "20-30",
                    //     "31-40",
                    //     "40-50",
                    //     "51-60",
                    //     "60以上",
                    // ],
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
                        // data: [28, 80, 70, 55, 28, 60],
                        data: this.partyYear,
                    },
                ],
                color: ["#188df0"],
            });
        },
        // 党员性别比例
        sexEchartsData() {
            var isSet = true; // 为了做判断：当鼠标移动上去的时候，自动高亮就被取消
            var charPie3currentIndex = 0;

            var sexChart = this.$echarts.init(
                document.getElementById("sexEcharts")
            );
            this.ChartsName.push(sexChart);
            var option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                    position: "top",
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
                                    var value = params.data.value;
                                    var name = params.data.name;
                                    // var str = percent + "%" + "\n" + name;
                                    var str = value + "\n" + name;
                                    // var percent = params.percent;
                                    // var str = percent + "%";
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
                        data: this.partySex,
                        // data: [
                        //     {
                        //         value: 224,
                        //         name: "女",
                        //     },
                        //     {
                        //         value: 234,
                        //         name: "男",
                        //     },
                        // ],
                    },
                ],
                color: ["#f6c96b", "#4de09c"],
            };
            sexChart.setOption(option);

            // 2、鼠标移动上去的时候的高亮动画
            sexChart.on("mouseover", function (param) {
                isSet = false;
                clearInterval(startCharts2);
                // 取消之前高亮的图形
                sexChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: charPie3currentIndex,
                });
                // 高亮当前图形
                sexChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: param.dataIndex,
                });
                // 显示 tooltip
                // sexChart.dispatchAction({
                //     type: "showTip",
                //     seriesIndex: 0,
                //     dataIndex: param.dataIndex
                // });
            });
            // 3、自动高亮展示
            var chartHover = function () {
                var dataLen = option.series[0].data.length;
                // 取消之前高亮的图形
                sexChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: charPie3currentIndex,
                });
                charPie3currentIndex = (charPie3currentIndex + 1) % dataLen;
                // 高亮当前图形
                sexChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: charPie3currentIndex,
                });
                // 显示 tooltip
                // sexChart.dispatchAction({
                //     type: "showTip",
                //     seriesIndex: 0,
                //     dataIndex: charPie3currentIndex
                // });
            };
            startCharts2 = setInterval(chartHover, 2000);
            // 4、鼠标移出之后，恢复自动高亮
            sexChart.on("mouseout", function (param) {
                // 取消之前高亮的图形
                sexChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: param.dataIndex,
                });
                if (!isSet) {
                    startCharts2 = setInterval(chartHover, 2000);
                    isSet = true;
                }
            });
        },
        // 党员民族比例
        nationEchartsData() {
            //gz
            var isSet = true; // 为了做判断：当鼠标移动上去的时候，自动高亮就被取消
            var charPie3currentIndex = 0;
            //gz
            var nationChart = this.$echarts.init(
                document.getElementById("nationEcharts")
            );
            this.ChartsName.push(nationChart);
            var option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                    position: "top",
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
                    data: this.nationName,
                    // data: ["汉族", "回族", "苗族", "土家族", "藏族"],
                },
                series: [
                    {
                        name: "民族比例",
                        type: "pie",
                        radius: ["50%", "80%"],
                        center: ["60%", "50%"],
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
                                    // var percent = params.percent;
                                    var value = params.data.value;
                                    var name = params.data.name;
                                    // var str = percent + "%" + "\n" + name;
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
                        data: this.partyNation,
                        // data: [
                        //     {
                        //         value: 325,
                        //         name: "汉族",
                        //     },
                        //     {
                        //         value: 50,
                        //         name: "回族",
                        //     },
                        //     {
                        //         value: 200,
                        //         name: "苗族",
                        //     },
                        //     {
                        //         value: 20,
                        //         name: "土家族",
                        //     },
                        //     {
                        //         value: 10,
                        //         name: "藏族",
                        //     },
                        // ],
                    },
                ],
                color: [
                    "#fee67c",
                    "#f4a82e",
                    "#f4812e",
                    "#7377e2",
                    "#26addd",
                    "#49da97",
                ],
            };
            nationChart.setOption(option);
            // 2、鼠标移动上去的时候的高亮动画
            nationChart.on("mouseover", function (param) {
                isSet = false;
                clearInterval(startCharts3);
                // 取消之前高亮的图形
                nationChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: charPie3currentIndex,
                });
                // 高亮当前图形
                nationChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: param.dataIndex,
                });
                // 显示 tooltip
                // nationChart.dispatchAction({
                //     type: "showTip",
                //     seriesIndex: 0,
                //     dataIndex: param.dataIndex
                // });
            });
            // 3、自动高亮展示
            var chartHover = function () {
                var dataLen = option.series[0].data.length;
                // 取消之前高亮的图形
                nationChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: charPie3currentIndex,
                });
                charPie3currentIndex = (charPie3currentIndex + 1) % dataLen;
                // 高亮当前图形
                nationChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: charPie3currentIndex,
                });
                // // 显示 tooltip
                // nationChart.dispatchAction({
                //     type: "showTip",
                //     seriesIndex: 0,
                //     dataIndex: charPie3currentIndex
                // });
            };
            startCharts3 = setInterval(chartHover, 2000);
            // 4、鼠标移出之后，恢复自动高亮
            nationChart.on("mouseout", function (param) {
                // 取消之前高亮的图形
                nationChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: param.dataIndex,
                });
                if (!isSet) {
                    startCharts3 = setInterval(chartHover, 2000);
                    isSet = true;
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
        // 监听新闻公告显示就加载图表
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
};
</script>
<style lang="less" scoped>
.party-echarts {
    background: url(../../assets/images/bottomTxtBt_C.png) repeat-x;
    background-size: 100% 100%;
    #yearEcharts,
    #ageEcharts,
    #sexEcharts,
    #nationEcharts {
        width: 100%;
        height: 18vh;
    }
}
.line {
    top: -0.01rem;
    right: 0;
    left: 0;
    position: absolute;
    height: 0.02rem;
    background: url("../../assets/images/style_line.png") no-repeat;
    background-size: 100% 100%;
}
// 学历样式
.education-size {
    padding: 0 0.5vw;
    max-height: 17vh;
    overflow: auto;
}
.education-font {
    overflow: hidden;
    font-size: 0.73vw;
    line-height: 3.3vh;
    color: #fff;
}
.number-font {
    font-family: "jixieziti";
}
.color-orange {
    color: #fd8644;
}
.ma {
    margin-right: 1vw;
}
// 性别样式

.sex-box {
    display: flex;
    justify-content: space-evenly;
}
#sexEcharts {
    flex: 1;
}
.sex-info {
    flex: 1;
    padding: 0 1vw 0 0;
    // width: 80%;
    margin-top: 4.2vh;
}
.man,
.woman {
    padding: 0 0.5vw;
    overflow: hidden;
    // width: 10vw;
    font-size: 1.2vw;
    line-height: 4vh;
    margin-bottom: 2vh;
}
.man {
    color: #ffe375;
    background: url(../../assets/images/txtBg_yellow_right.png) no-repeat;
    background-size: 100% 100%;
}
.woman {
    color: #62e8c7;
    background: url(../../assets/images/txtBg_green_right.png) no-repeat;
    background-size: 100% 100%;
}
.font-white {
    color: #fff;
    font-size: 1.6vw;
}
.iconfont {
    vertical-align: bottom;
    font-size: 0.36rem;
}
.line1 {
    display: block;
    position: absolute;
    right: 0.05rem;
    top: 0.3rem;
    bottom: 0.3rem;
    width: 1px;
    background-color: #706f75;
}
</style>
