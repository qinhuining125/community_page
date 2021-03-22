<template>
    <div class="houseCon publicStyle_bg2 subPageLeftCon">
        <div class="content">
            <dl class="total">
                <dt class="fl">
                    <img
                        src="../../../assets/images/communityManagement_icon2.png"
                        alt=""
                    />
                </dt>
                <dd class="fr" @click="buildingClickFun">
                    <h5>{{ lDtotal }}</h5>
                    <h6>楼栋数</h6>
                </dd>
            </dl>

            <list-con
                :list="houseLeftList"
                :state="1"
                ref="houseLeftListRef"
                @getCount="getHouseCount"
            />
            <h6 class="publicStyle_subTitle">房屋入住情况</h6>
            <list-con
                ref="checkInListRef"
                :list="checkInList"
                @getCount="getHouseStateCount"
                :state="2"
            />
            <h6 class="publicStyle_subTitle">房屋使用用途</h6>
            <progree-con :progreeListData="houseProgreeListData"></progree-con>
            <h6 class="publicStyle_subTitle">房屋产权状态</h6>
            <div id="houseProperty" ref="houseProperty"></div>
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
            lDtotal: "",
            legend_data: ["租房", "自有"],
            ChartsName: [],
            houseProgreeListData: [
                // {
                //     name: "商业",
                //     value: "17",
                //     percentage: 50,
                //     color: "#43e8bf"
                // },
                // {
                //     name: "住宅",
                //     value: "772",
                //     percentage: 96.5,
                //     color: "#fde57c"
                // },
                // {
                //     name: "其它",
                //     value: "11",
                //     percentage: 2,
                //     color: "#f38949"
                // }
            ],
            houseLeftList: [
                // {
                //     name: "房屋总数",
                //     value: 800
                // },
                // {
                //     name: "入住率",
                //     value: "93.38%"
                // }
            ],
            checkInList: [
                // {
                //     name: "入住",
                //     value: 747
                // },
                // {
                //     name: "空置",
                //     value: "53"
                // }
            ],

            houseChartSriesData: [],
        };
    },
    mounted() {
        this.sqglFwTj(); // 获取房屋左侧列表
        this.echartsOnsize();
    },
    computed: {
        ...mapState({
            // 获取vuex state的变量
            isQuantityDisplayListActive: (state) =>
                state.app.isQuantityDisplayListActive,
            isInfoShow: (state) => state.app.isInfoShow, // 告警信息状态
        }),
    },
    methods: {
        // 获取房屋左侧列表
        async sqglFwTj() {
            const res = await this.$Http.sqglFwTj();
            // console.log(res);
            if (res.code == 0) {
                this.lDtotal = res.data.total; // 楼栋数
                // 入住率赋值
                const rzl = {
                    name: res.data.map.block2[0].name,
                    value: res.data.map.block2[0].percentage + "%",
                };
                this.houseLeftList = res.data.map.block1;
                this.houseLeftList.push(rzl); // 房屋总数
                this.checkInList = res.data.map.block3; // 房屋入住情况
                this.houseProgreeListData = res.data.map.block4; // 房屋使用用途
                this.houseChartSriesData = res.data.map.block5; // 房屋产权状态
                this.housePropertyEcharts(); // 加载图表
            }
        },

        // 房屋产权状态图表
        housePropertyEcharts() {
            // // var _this = this;
            // var isSet = true; // 为了做判断：当鼠标移动上去的时候，自动高亮就被取消
            // var charPie3currentIndex = 1;
            // var legend_data = ["租房", "自有"];
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
                        data: this.houseChartSriesData,
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
            this.$refs.checkInListRef.isActive = -1;
            this.$refs.houseLeftListRef.isActive = idx;
        },
        // 房屋入住情况点击事件
        getHouseStateCount(item, idx) {
            this.$emit("getpersonnelCount", item);
            this.$refs.houseLeftListRef.isActive = -1;
            this.$refs.checkInListRef.isActive = idx;
        },
        // 楼栋点击
        buildingClickFun(item) {
            this.$emit("getpersonnelCount", "楼栋");
            // this.searchLdList(); // 请求楼栋列表
            // 判断右侧的告警信息是否显示如果显示就隐藏
            if (this.isInfoShow) {
                this.SETIsInfoShow(false);
            }
            this.SETIsSubPageListShow(true); // 右侧内容显示
            this.SETMapToolbarIsActive(true); // 展开地图控制按钮
            // this.SETCurrentPage(1); // 分页默认设置第1页
            this.SETIsMessageBoxShow(false); // 关闭弹出层
            this.$refs.checkInListRef.isActive = -1;
            this.$refs.houseLeftListRef.isActive = -1;
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
            "SETIsSubPageListShow",
            "SETMapToolbarIsActive",
            "SETIsInfoShow",
            "SETCurrentPage",
            "SETIsMessageBoxShow",
            "SETIsquantityDisplayListActive",
            "SETGetSeriveName",
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
            cursor: pointer;
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
