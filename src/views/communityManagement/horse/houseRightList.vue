<template>
    <div class="publicStyle_bg subPageList" ref="subPageList">
        <div class="height" ref="subPageListHeight">
            <span class="rightCloseBtn" @click="rightCloseBtn"
                ><i class="iconfont iconguanbi"></i
            ></span>
            <span class="publicStyle_line"></span>
            <h2 class="publicStyle_title">{{ title }}</h2>
            <div class="search">
                <el-input
                    placeholder="请输入楼栋名称"
                    v-model="input"
                    suffix-icon="iconfont iconsousuo"
                    @input="searchValueChange"
                >
                </el-input>
            </div>
            <h5 class="listTitle">房屋列表</h5>
        </div>
        <table-list
            @tableRowDbclick="tableRowDbclick"
            @tableRowClick="tableRowClick"
            :tableHeight="tableHeight.height"
            class="tableListCon"
            :tableDolumnData="tableDolumnData"
            :tableData="tableResultData"
            :pagesize="pageSize"
            :currentPage="pageNum"
            :total="total"
            ref="multipleTableCon"
            @handleCurrentChange="handleCurrentChange"
        ></table-list>
        <component
            :is="massageComponent"
            :tableRowData="tableRowData"
            ref="massageRef"
            :massageTitle="massageTitle"
        ></component>
    </div>
</template>

<script>
import _ from "lodash";
import { mapState, mapActions } from "vuex";
import tableList from "@/components/tableList"; // 表格列表
import houseLayerCon from "@/components/messageBox/houseLayer.vue"; // 房屋弹框
import buildingLayerCon from "@/components/messageBox/buildingLayer.vue"; // 房屋弹框

export default {
    name: "house",
    props: ["title", "getSeriveName"],
    components: {
        tableList,
    },
    data() {
        return {
            massageTitle: "人员信息", // 弹框标题
            tableHeight: {
                height: "60%", // 表格高度设置
            },
            tableRowData: {}, // 点击表格当前行的信息
            massageComponent: "", // 弹框组件
            input: "", // 搜索值
            total: 10,
            pageNum: 1,
            pageSize: 20,
            // 楼栋传值
            params: {
                type: 2,
                pageNum: 1,
                pageSize: 20,
                fwrzqk: "",
                name: "",
            },
            // 楼栋搜索
            ldParams: {
                type: 1,
                pageNum: 1,
                pageSize: 20,
                ldmc: "",
            },
            // 楼栋搜索
            searchLdParams: {
                type: 1,
                pageNum: 1,
                pageSize: 20,
                ldmc: "",
            },
            // 房屋
            searchParams: {
                type: 2,
                pageNum: 1,
                pageSize: 20,
                name: "",
                fwrzqk: "",
            },
            tableDolumnData: [],
            tableResultData: [],
            houseTableDolumnData: [
                // 表头数据
                // { label: "序号", prop: "id", width: "15%" },
                { label: "楼栋名称", prop: "ldmc", width: "25%" },
                { label: "门牌号", prop: "mph", width: "20%" },
                { label: "入住情况", prop: "fwrzqk", width: "25%" },
                { label: "用途", prop: "fwlylx", width: "15%" },
            ],
            houseResultData: [
                {
                    id: 1,
                    ldmc: "莱茵风尚1栋",
                    mph: "101",
                    fwrzqk: "入住",
                    fwlylx: "商业",
                    type: "房屋",
                },
            ],
            buildingtableDolumnData: [
                // 表头数据
                // { label: "序号", prop: "id", width: "15%" },
                { label: "楼栋名称", prop: "ldmc", width: "30%" },
                { label: "层数", prop: "cs", width: "20%" },
                { label: "建筑物面积", prop: "jzwmj", width: "35%" },
            ],
            buildingResultData: [
                {
                    id: 1,
                    ldmc: "莱茵风尚1栋",
                    cs: "12",
                    jzwmj: "710.127062",
                    type: "楼栋",
                },
            ],
            ifSearch: false, // 判断是否在搜索中
        };
    },
    computed: {
        // 获取vuex state的变量
        ...mapState({
            isSubPageListShow: (state) => state.app.isSubPageListShow,
        }),
    },
    watch: {
        // 监听右侧内容是否显示如果显示就加载图表
        isSubPageListShow: {
            handler: function (newName) {
                if (newName) {
                    this.$nextTick(() => {
                        this.tableHeightFun();
                        window.addEventListener("resize", this.tableHeightFun);
                    });
                }
            },
            deep: true,
            // immediate: true
        },
        // 左侧内容点击(有一个弊端就是重复点击相同的时候就不会重新请求)
        getSeriveName: {
            handler: function (newName) {
                // this.params.pageNum = 1;
                // console.log(newName);
                // if (newName == "楼栋") {
                //     this.params.type = 1;
                //     this.searchLdList(this.params);
                // } else {
                //     this.params.type = 2;
                //     this.searZhsqListByType(this.params);
                // }
            },
            deep: true,
            // immediate: true
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.tableHeightFun();
            // window.addEventListener("resize", this.tableHeightFun);
            window.addEventListener(
                "resize",
                this.antiShake(this.tableHeightFun, 500)
            );
        });
    },
    // 销毁window事件，不然会后错 Cannot read property 'offsetHeight' of undefined
    beforeDestroy() {
        window.removeEventListener("resize", this.tableHeightFun);
    },
    methods: {
        // 获取楼栋列表
        getLdList() {
            this.input = "";
            this.ldParams.pageNum = 1;
            this.ldParams.ldmc = "";
            this.searchLdList(this.ldParams);
        },
        // 获取房屋总列表
        getFwList() {
            this.input = "";
            this.params.pageNum = 1;
            this.params.fwrzqk = "";
            this.params.name = "";
            this.searZhsqListByType(this.params);
        },
        // 获取房屋入住列表
        getFwRzList() {
            this.input = "";
            this.params.pageNum = 1;
            this.params.fwrzqk = "入住";
            this.params.name = "";
            this.searZhsqListByType(this.params);
        },
        // 获取房屋空置列表
        getFwKzList() {
            this.input = "";
            this.params.pageNum = 1;
            this.params.fwrzqk = "空置";
            this.params.name = "";
            this.searZhsqListByType(this.params);
        },
        // 在 Input 值改变时触发 ,搜索获取的列表,忽略频繁执行
        searchValueChange: _.debounce(function (e) {
            switch (this.getSeriveName) {
                case "楼栋":
                    this.ldParams.pageNum = 1;
                    this.ldParams.ldmc = e;
                    this.searchLdList(this.ldParams);
                    break;
                default:
                    this.params.name = e;
                    this.params.pageNum = 1;
                    this.searZhsqListByType(this.params);
                    break;
            }
        }, 500),
        // 获取房屋总数列表
        async searZhsqListByType(params) {
            const res = await this.$Http.searZhsqListByType(params);
            // console.log(res);
            if (res.code == 0) {
                var id = 1;
                // 每每个对象里面添加一个ID
                res.rows.forEach((item) => {
                    // this.$set(item, "id", id++);
                    this.$set(item, "type", "房屋");
                });
                this.pageNum = params.pageNum;
                this.total = res.total;
                this.tableResultData = res.rows;
                this.tableDolumnData = this.houseTableDolumnData;
            }
        },
        // 获取楼栋信息
        async searchLdList(params) {
            const res = await this.$Http.searchLdList(params);
            // console.log(res);
            if (res.code == 0) {
                var id = 1;
                // 每每个对象里面添加一个ID
                res.rows.forEach((item) => {
                    // this.$set(item, "id", id++);
                    this.$set(item, "type", "楼栋");
                });
                this.pageNum = params.pageNum;
                this.total = res.total;
                this.tableResultData = res.rows;
                this.tableDolumnData = this.buildingtableDolumnData;
            }
        },

        // 点击分页切换
        handleCurrentChange(page) {
            if (this.getSeriveName == "楼栋") {
                this.ldParams.pageNum = page;
                this.searchLdList(this.ldParams);
            } else {
                this.params.pageNum = page;
                this.searZhsqListByType(this.params);
            }
        },
        // 计算表格的高度
        tableHeightFun() {
            // 判断如果页面存在则执行
            if (this.$refs.subPageList) {
                // 在请求获得数据后，立刻获取更新后的DOM,否则显示隐藏后高度就不会自适应--开始
                this.$refs.multipleTableCon.$refs.multipleTable.doLayout();
                // 在请求获得数据后，立刻获取更新后的DOM,否则显示隐藏后高度就不会自适应--结束
                // 用内容的总高度 - 除列表以外的高度 = 列表的高度
                this.tableHeight.height =
                    this.$refs.subPageList.offsetHeight -
                    this.$refs.subPageListHeight.offsetHeight -
                    50 +
                    "px";
            }
        },
        // 监听防抖
        antiShake(fn, wait) {
            let timeout = null;
            return function () {
                if (timeout !== null) clearTimeout(timeout);
                timeout = setTimeout(fn, wait);
            };
        },
        ...mapActions([
            "SETIsSubPageListShow",
            "SETMapToolbarIsActive",
            "SETIsMessageBoxShow",
            "SETTableDolumnData",
            "SETTableResultData",
        ]),
        //关闭右侧弹框
        rightCloseBtn() {
            this.SETIsSubPageListShow(false);
            this.SETMapToolbarIsActive(false);
        },
        // 双击表格一行执行事件
        tableRowDbclick(data) {
            // console.log(data + "双击");
        },
        // 单击表格一行执行事件
        tableRowClick(data) {
            switch (data.type) {
                case "房屋":
                    this.$nextTick(() => {
                        this.SETIsMessageBoxShow(true); // 打开弹框
                        this.massageTitle = "住户信息";
                        this.tableRowData = data.zhsqJms;
                        this.massageComponent = houseLayerCon; // 显示的组件
                    });

                    break;
                case "楼栋":
                    this.SETIsMessageBoxShow(true); // 打开弹框
                    this.massageTitle = "房屋信息";
                    this.searchLdList(this.params);
                    this.tableRowData = data;
                    this.massageComponent = buildingLayerCon; // 显示的组件
                    this.$nextTick(() => {
                        this.$refs.massageRef.isShow = true;
                        this.$refs.massageRef.searchParams.ldid = data.ldid; // 设置楼栋ID
                        this.$refs.massageRef.input = ""; // 清空搜索框内容
                        this.$refs.massageRef.searchParams.mph = ""; // 清空搜索内容
                        this.$refs.massageRef.activeName = "1单元";
                        this.$refs.massageRef.listScrollTop(); // 列表滚动条默认回到顶部
                        // this.$refs.massageRef.ResidenceList.scrollTop = 0;
                    });
                    break;
                default:
                    break;
            }
        },
        // 地图房屋本地json数据
        async getHouseMapList() {
            const res = await this.$Http.getHouseMapList();
            // console.log(res);
            this.$mapView.addBoxByEntityFun(res); // 楼栋模型加载
        },
    },
};
</script>
<style lang="less" scoped>
.subPageList {
    .rightCloseBtn {
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        cursor: pointer;
        color: #fff;
        font-size: 0.18rem;
        .iconfont {
            font-size: 0.16rem;
        }
    }
    .search {
        margin-bottom: 0.1rem;
        /deep/.el-input__inner {
            line-height: 0.4rem;
            height: 0.4rem;
            background: #26272c;
            border: none;
            color: #fff;
        }
    }
    .listTitle {
        // margin-bottom: 0.1rem;
        text-align: center;
        color: #fff;
        background: url(../../../assets/images/title4_Bg.png) no-repeat center;
        background-size: 100% 100%;
        line-height: 0.34rem;
    }
    /deep/.el-input__icon {
        height: 100%;
        width: 0.24rem;
        text-align: center;
        transition: all 0.3s;
        line-height: 0.4rem;
    }
}
</style>
