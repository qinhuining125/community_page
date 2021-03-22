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
                    placeholder="请输入车牌号"
                    v-model="input"
                    suffix-icon="iconfont iconsousuo"
                    @input="searchValueChange"
                >
                </el-input>
            </div>
            <h5 class="listTitle">车辆列表</h5>
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
import tableList from "@/components/tableList";
import carLayer from "@/components/messageBox/carLayer"; // 车辆弹框

export default {
    name: "car",
    props: ["title", "getSeriveName"],
    components: {
        tableList,
    },
    data() {
        return {
            massageTitle: "车辆信息", // 弹框标题
            tableHeight: {
                height: "60%", // 表格高度设置
            },
            tableRowData: {}, // 点击表格当前行的信息
            massageComponent: "", // 弹框组件
            input: "", // 搜索值
            pageSize: 20,
            pageNum: 1,
            total: 10,
            params: {
                type: 4,
                pageNum: 1,
                pageSize: 20,
                cllx: "",
                name: "",
            },
            tableDolumnData: [],
            tableResultData: [],
            carTableDolumnData: [
                // 表头数据
                // { label: "序号", prop: "id", width: "15%" },
                { label: "车牌号", prop: "clhm", width: "30%" },
                { label: "车型", prop: "cx", width: "15%" },
                { label: "车主", prop: "czxm", width: "20%" },
                { label: "电话", prop: "lxdh", width: "20%" },
            ],
            carTableResultData: [
                {
                    id: 1,
                    clhm: "鄂A660HB",
                    cx: "小型",
                    czxm: "耿慧飞",
                    lxdh: "15011378393",
                    type: "车辆",
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
        // 左侧内容点击
        getSeriveName: {
            handler: function (newName) {
                // this.getCarList(this.params);
                // this.tableDolumnData = this.carTableDolumnData;
                // this.tableResultData = this.carTableResultData;
                // this.total = this.tableResultData.length;
                // console.log(newName);
            },
            deep: true,
            // immediate: true
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.getCarList(this.params);
            this.tableHeightFun();
            // window.addEventListener("resize", this.tableHeightFun);
            // 监听事件
            window.addEventListener(
                "resize",
                this.antiShake(this.tableHeightFun, 500)
            );
        });
    },

    methods: {
        // 获取所有车辆
        getCarListAll() {
            this.input = ""; // 清空搜索内容
            this.params.pageNum = 1; // 默认请求第一页
            this.params.type = 4; // 车辆总数的类型是4
            this.params.cllx = ""; //
            this.params.name = ""; // 搜索的内容
            this.getCarList(this.params); // 请求列表数据
        },
        // 获取外来车辆
        getCarOuterList() {
            this.input = ""; // 清空搜索内容
            this.params.pageNum = 1; // 默认请求第一页
            this.params.cllx = "外来车辆";
            this.params.type = 11; // 车辆总数的类型是4
            this.params.name = ""; // 搜索的内容
            this.getCarList(this.params); // 请求列表数据
        },
        // 获取小区车辆
        getCarLocalList() {
            this.input = ""; // 清空搜索内容
            this.params.pageNum = 1; // 默认请求第一页
            this.params.cllx = "小区车辆";
            this.params.type = 11; // 车辆总数的类型是4
            this.params.name = ""; // 搜索的内容
            this.getCarList(this.params); // 请求列表数据
        },
        // 在 Input 值改变时触发 ,搜索获取的列表,忽略频繁执行
        searchValueChange: _.debounce(function (e) {
            this.ifSearch = true; // 判断是否在搜索状态
            this.params.name = e;
            this.params.pageNum = 1; // 默认请求第一页
            this.getCarList(this.params); // 请求列表数据
        }, 500),
        // 获取车辆请求
        async getCarList(params) {
            const res = await this.$Http.searZhsqListByType(params);
            this.tableDolumnData = this.carTableDolumnData;
            // 每每个对象里面添加一个ID
            res.rows.forEach((item) => {
                this.$set(item, "type", "车辆");
            });
            this.pageNum = params.pageNum;
            this.tableResultData = res.rows;
            this.total = res.total;
            // console.log(res);
        },
        // 点击分页切换
        handleCurrentChange(page) {
            this.params.pageNum = page;
            this.getCarList(this.params);
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
                case "车辆":
                    this.SETIsMessageBoxShow(true); // 打开弹框
                    this.massageTitle = "车辆信息";
                    this.tableRowData = data; // 获取当前选中的数据
                    this.massageComponent = carLayer; // 车辆弹框
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
    // 销毁window事件，不然会后错 Cannot read property 'offsetHeight' of undefined
    beforeDestroy() {
        window.removeEventListener("resize", this.tableHeightFun);
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
