<template>
    <div class="leftContent">
        <div class="communitySituationEcharts publicStyle_bg">
            <span class="publicStyle_line"></span>
            <h2 class="publicStyle_title">社区概况</h2>
            <div class="register-big">
                <div class="register">
                    <span>户数</span>
                    <h4>{{ getSqgkTjList.hs }}</h4>
                </div>

                <div class="floor">
                    <span>楼栋</span>
                    <h4>{{ getSqgkTjList.ld }}</h4>
                </div>
            </div>

            <img src="../../assets/images/floor.png" alt="" />
            <p>重点关注人员</p>
            <ul>
                <li>
                    <span class="peo-color">独居人员</span
                    ><span class="peo-font">{{ zdgzryList.djry }}</span>
                </li>
                <li>
                    <span class="peo-color">空巢老人</span
                    ><span class="peo-font">{{ zdgzryList.kclr }}</span>
                </li>
                <li>
                    <span class="peo-color">刑满释放</span
                    ><span class="peo-font">{{ zdgzryList.xmsf }}</span>
                </li>
                <li>
                    <span class="peo-color">退役军人</span
                    ><span class="peo-font">{{ zdgzryList.tyjr }}</span>
                </li>
                <li>
                    <span class="peo-color">低保人员</span
                    ><span class="peo-font">{{ zdgzryList.dbry }}</span>
                </li>
                <li>
                    <span class="peo-color">残疾人员</span
                    ><span class="peo-font">{{ zdgzryList.cjry }}</span>
                </li>
            </ul>
        </div>
        <div class="electricitySituation publicStyle_bg">
            <span class="publicStyle_line"></span>
            <h2 class="publicStyle_title">能耗统计</h2>
            <div id="nhEcharts"></div>
        </div>
        <div class="communityManagement publicStyle_bg">
            <span class="publicStyle_line"></span>
            <h2 class="publicStyle_title">设备管理</h2>
            <el-row>
                <el-col
                    :span="12"
                    v-for="(item, idx) in equipmentList"
                    :key="idx"
                >
                    <div class="content">
                        <div class="left" @click="equipmentAbnormalClick(item)">
                            {{ item.abNormal }}
                        </div>
                        <div class="right">
                            <h4 @click="equipmentAllClick(item)">
                                {{ item.allNumber }}
                            </h4>
                            <span>{{ item.name }}</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- <component :is="currentComponent" ref="componentRef"></component> -->
    </div>
</template>

<script>
import mapView from "@/utils/mapView.js";
export default {
    data() {
        return {
            // currentComponent: "",
            ChartsName: [],
            equipmentList: [
                // {
                //     id: "01",
                //     name: "摄像头",
                //     abNormal: 10,
                //     allNumber: 20,
                // },
                // {
                //     id: "02",
                //     name: "水表",
                //     abNormal: 10,
                //     allNumber: 500,
                // },
                // {
                //     id: "03",
                //     name: "闸机",
                //     abNormal: 20,
                //     allNumber: 54,
                // },
                // {
                //     id: "04",
                //     name: "车辆道杆",
                //     abNormal: 8,
                //     allNumber: 50,
                // },
                // {
                //     id: "05",
                //     name: "井盖",
                //     abNormal: 4,
                //     allNumber: 30,
                // },
                // {
                //     id: "06",
                //     name: "老年手环",
                //     abNormal: 3,
                //     allNumber: 62,
                // },
                // {
                //     id: "07",
                //     name: "烟感",
                //     abNormal: 15,
                //     allNumber: 48,
                // },
            ],
            getDivPointUrl: "", // 请示图标的json
            iconUrl: "",
            sbglData: [],
            getSxtParam: {
                sbzt: "离线",
            },
            sbzt: "离线",
            flag: false,
            zdgzryList: {}, // 重点关注人员
            getSqgkTjList: {}, //社区概况
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.sqglSbTj(); // 设备管理总数统计
            this.getZdryTjList(); // 获取重点关注人员统计
            this.getSqgkTj(); // 获取社区概况统计
            this.nhEchartsData();
            // this.resizeFun();
            window.addEventListener(
                "resize",
                this.antiShake(this.resizeFun, 200)
            );
            // setTimeout(() => {
            //     window.onresize = () => {
            //         for (var i = 0; i < this.ChartsName.length; i++) {
            //             this.ChartsName[i].resize();
            //             console.log(this.ChartsName[i]._dom.clientWidth);
            //         }
            //         console.log("mounted");
            //     };
            // }, 20);
        });
    },
    beforeDestroy() {
        // window.removeEventListener("resize", this.echartsOnsize);
    },
    methods: {
        // 能耗情况
        nhEchartsData() {
            var myChart = this.$echarts.init(
                document.getElementById("nhEcharts")
            );
            this.ChartsName.push(myChart);
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985",
                        },
                    },
                },
                legend: {
                    top: "0",
                    left: "center",
                    textStyle: {
                        color: "rgba(255, 255, 255, 1)",
                        fontSize: "12",
                        fontWeight: "normal",
                    },
                    itemWidth: 10,
                    itemHeight: 6,
                    data: ["用水量", "总用水量"],
                },
                grid: {
                    left: "5%",
                    right: "12%",
                    bottom: "10%",
                    containLabel: true,
                    height: "72%",
                },
                // grid: {
                //     top: "30",
                //     left: "10",
                //     right: "20",
                //     bottom: "10",
                //     containLabel: true,
                //     // height: "70%"
                // },
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: false,
                        data: ["11号", "12号", "13号", "14号", "15号"],
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#fff",
                            },
                        },
                        axisLine: {
                            lineStyle: {
                                type: "solid",
                                color: "rgba(255, 255, 255, 0)",
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "水量(吨)",
                        // min: 50,
                        // max: 250,
                        // interval: 50,
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
                                color: "rgba(255, 255, 255, .6)",
                            },
                        },
                        axisLine: {
                            lineStyle: {
                                type: "solid",
                                color: "rgba(255, 255, 255, 0.6)",
                            },
                        },
                    },
                    // {
                    //     type: "value",
                    //     name: "电量(度)",
                    //     // min: 0,
                    //     // max: 100,
                    //     // interval: 20,
                    //     splitLine: {
                    //         show: true,
                    //         lineStyle: {
                    //             type: "dashed",
                    //             opacity: 0.4,
                    //         },
                    //     },
                    //     axisLabel: {
                    //         show: true,
                    //         textStyle: {
                    //             color: "rgba(255, 255, 255, .6)",
                    //         },
                    //     },
                    //     axisLine: {
                    //         lineStyle: {
                    //             type: "solid",
                    //             color: "rgba(255, 255, 255, 0.6)",
                    //         },
                    //     },
                    // },
                ],
                series: [
                    {
                        name: "用水量",
                        type: "line",
                        barMaxWidth: 14,
                        areaStyle: {
                            normal: {
                                color: this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "#fde680",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(252,230,128,.4)",
                                        },
                                    ]
                                ),
                            },
                        },
                        data: [2, 5, 7, 10, 12, 14],
                        label: {
                            normal: {
                                show: true,
                                position: "top",
                                color: "rgba(255,255,255,.6",
                                fontSize: "12",
                            },
                        },
                    },
                    // {
                    //     name: "总用水量",
                    //     type: "line",
                    //     barMaxWidth: 14,
                    //     areaStyle: {
                    //         normal: {
                    //             color: this.$echarts.graphic.LinearGradient(
                    //                 0,
                    //                 0,
                    //                 0,
                    //                 1,
                    //                 [
                    //                     {
                    //                         offset: 0,
                    //                         color: "#45e7c0",
                    //                     },
                    //                     {
                    //                         offset: 1,
                    //                         color: "rgba(133,216,146,.4)",
                    //                     },
                    //                 ]
                    //             ),
                    //         },
                    //     },
                    //     // yAxisIndex: 1,
                    //     data: [10, 12, 14, 16, 18, 20],
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             position: "top",
                    //             color: "rgba(255,255,255,.6",
                    //             fontSize: "12",
                    //         },
                    //     },
                    // },
                ],
                color: ["#fde680", "#45e7c0"],
            });
        },
        // 异常点击
        equipmentAbnormalClick(i) {
            switch (i.name) {
                case "摄像头":
                    this.getSxtList("SXT", this.sbzt);
                    break;
                case "水表":
                    this.getSbList("SB", this.sbzt);
                    break;
                case "闸机":
                    this.getZjList("ZJ", this.sbzt);
                    break;
                case "道杆":
                    this.getDgList("DG", this.sbzt);
                    break;
                case "井盖":
                    this.getJgList("JG", this.sbzt);
                    break;
                case "烟感":
                    this.getYgList("YG", this.sbzt);
                    break;
                default:
                    // 摄像头
                    break;
            }
        },
        // 总数点击
        equipmentAllClick(i) {
            switch (i.name) {
                case "摄像头":
                    this.getSxtList("SXT");
                    break;
                case "水表":
                    this.getSbList("SB");
                    break;
                case "闸机":
                    this.getZjList("ZJ");
                    break;
                case "道杆":
                    this.getDgList("DG");
                    break;
                case "井盖":
                    this.getJgList("JG");
                    break;
                case "烟感":
                    this.getYgList("YG");
                    break;
                default:
                    // 摄像头
                    break;
            }
        },
        // 获取重点关注人员统计
        async getZdryTjList() {
            const res = await this.$Http.getZdryTjByJm();
            if (res.code == 0) {
                this.zdgzryList = res.data;
            }
        },
        // 获取社区概况统计
        async getSqgkTj() {
            const res = await this.$Http.getSqgkTj();
            if (res.code == 0) {
                this.getSqgkTjList = res.data;
            }
        },
        // 获取所有摄像头列表
        async getSxtList(type, sbzt) {
            const res = await this.$Http.getSxtList();
            this.getSbglList(type, sbzt, res);
        },
        // 获取所有水表列表
        async getSbList(type, sbzt) {
            const res = await this.$Http.getSbList();
            this.getSbglList(type, sbzt, res);
        },
        // 获取闸机列表
        async getZjList(type, sbzt) {
            const res = await this.$Http.getZjList();
            this.getSbglList(type, sbzt, res);
        },
        // 获取道杆列表
        async getDgList(type, sbzt) {
            const res = await this.$Http.getDgList();
            this.getSbglList(type, sbzt, res);
        },
        // 获取井盖列表
        async getJgList(type, sbzt) {
            const res = await this.$Http.getJgList();
            this.getSbglList(type, sbzt, res);
        },
        // 获取手环列表
        async getShList(type, sbzt) {
            const res = await this.$Http.getShList();
            this.getSbglList(type, sbzt, res);
        },
        // 获取烟感列表
        async getYgList(type, sbzt) {
            const res = await this.$Http.getYgList();
            this.getSbglList(type, sbzt, res);
        },
        // 通过判断是什么类型的设备获取在线还是离线
        getSbglList(type, sbzt, res) {
            /* type 报备类型，
                sbzt 报备状态 离线还是在线， 
                res 后台请求的数据
            */
            if (res.code == 0) {
                if (sbzt) {
                    // 判断是否是请求离线状态的数据
                    this.sbglData = []; // 清空数组
                    res.data.forEach((i) => {
                        if (i.sbzt == "离线") {
                            this.sbglData.push(i);
                        }
                    });
                } else {
                    this.sbglData = res.data;
                }
                mapView.clearPic();
                this.$mapView.addDivPoints(
                    type,
                    this.sbglData
                    // this.$refs.componentRef.$el.outerHTML
                );
            }
        },
        // 获取报备管理数量统计
        async sqglSbTj() {
            const res = await this.$Http.sqglSbTj();
            if (res.code == 0) {
                this.equipmentList = res.data.equipmentList;
                // console.log(res);
            }
        },
        // 执行图表监听事件
        resizeFun() {
            for (var i = 0; i < this.ChartsName.length; i++) {
                this.ChartsName[i].resize();
            }
            // console.log("resizeFun");
        },
        // 图表自适应
        echartsOnsize() {
            window.onresize = () => {
                for (var i = 0; i < this.ChartsName.length; i++) {
                    this.ChartsName[i].resize();
                }
            };
        },
        // 监听防抖
        antiShake(fn, wait) {
            let timeout = null;
            return function () {
                if (timeout !== null) clearTimeout(timeout);
                timeout = setTimeout(fn, wait);
            };
        },
    },
};
</script>

<style lang="less" scoped>
.leftContent {
    // display: flex;
    // display: -webkit-flex; /* Safari */
    // flex-direction: column;
    .communitySituationEcharts,
    .electricitySituation {
        flex: 1;
        // float: left;
        width: 100%;
        height: 21vh;
        margin-bottom: 1.5vh;
    }
    .communityManagement {
        .content {
            display: flex;
            align-items: center;
            justify-content: center;
            // margin-bottom: 2vh;
            height: 10vh;
            .left {
                cursor: pointer;
                width: 0.7rem;
                height: 0.7rem;
                background: url("../../assets/images/equipbg.gif") no-repeat;
                text-align: center;
                line-height: 0.7rem;
                background-size: 100% 100%;
                font-family: "jixieziti";
                color: #ed7777;
                font-size: 0.2rem;
                margin-right: 0.1rem;
                animation: mymove 5s infinite;
                -webkit-animation: mymove 5s infinite;
                animation-direction: alternate;
                animation-timing-function: ease-in-out;
                -webkit-animation: mymove 5s infinite;
                -webkit-animation-direction: alternate;
                -webkit-animation-timing-function: ease-in-out;
            }
            .right {
                min-width: 0.6rem;
                h4 {
                    cursor: pointer;
                    font-size: 0.3rem;
                    font-family: "jixieziti";
                    color: #4fb5ff;
                }
                span {
                    color: #fff;
                    font-size: 0.14rem;
                }
            }
        }
        // flex: 1;
        text-align: center;
        // float: left;
        width: 100%;
        height: 45vh;
    }
    #nhEcharts {
        width: 100%;
        height: 80%;
    }
}
.communitySituationEcharts {
    position: relative;
}
.register-big {
    display: flex;
    justify-content: space-between;
}
.register,
.floor {
    // width: 0.8rem;
    // height: 0.55rem;
    width: 4vw;
    height: 5.5vh;
    text-align: center;
    display: inline-block;
}
.register {
    margin-left: 0.2rem;
}
.floor {
    margin-right: 0.2rem;
}
.register h4 {
    font-size: 0.3rem;
    font-family: "jixieziti";
    color: #61c4ad;
}

.register span {
    color: #fff;
    font-size: 0.14rem;
}
.floor h4 {
    font-size: 0.3rem;
    font-family: "jixieziti";
    color: #4fb5ff;
}
p {
    color: #c1feef;
    line-height: 0.26rem;
    height: 0.26rem;
    text-indent: 0.1rem;
}
img {
    width: 0.9rem;
    height: 0.9rem;
    position: absolute;
    top: 0.3rem;
    left: 50%;
    transform: translateX(-50%);
}
ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
li {
    width: 33.3%;
    line-height: 0.26rem;
    height: 0.26rem;
    text-align: center;
    margin-top: 0.1vh;
}
.peo-color {
    font-size: 0.16rem;
    color: #25c2d3;
    margin-right: 0.2rem;
}
.peo-font {
    font-size: 0.16rem;
    font-family: "jixieziti";
    color: #fff;
}
#box {
    width: 100px;
    height: 100px;
    background: #999;
}
</style>
