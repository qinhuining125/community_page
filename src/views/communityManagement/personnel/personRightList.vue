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
                    placeholder="请输入姓名"
                    v-model="input"
                    @change="searchChangeFun"
                    @input="searchValueChange"
                >
                    <i
                        slot="suffix"
                        class="iconfont iconsousuo"
                        @click="handleIconClick"
                    ></i>
                </el-input>
            </div>
            <h5 class="listTitle">人员列表</h5>
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
import personelLayerCon from "@/components/messageBox/personelLayer.vue";

export default {
    name: "person",
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
            total: 10, // 一页总数
            pageNum: 1,
            pageSize: 20,
            // 接口请求传值params
            getJmListParams: {
                type: 3,
                pageNum: 1,
                pageSize: 20,
                sfcz: "是",
            },
            searchparams: {
                pageNum: 1,
                pageSize: 20,
                type: 3,
                sfcz: "是",
                name: "",
            },
            tableDolumnData: [], // 表单数据
            perTableDolumnData: [
                // 表头数据
                // { label: "序号", prop: "id", width: "15%" },
                { label: "姓名", prop: "xm", width: "20%" },
                { label: "性别", prop: "xb", width: "20%" },
                { label: "年龄", prop: "nl", width: "20%" },
                { label: "标签", prop: "label", width: "25%" },
            ],
            tableResultData: [
                // 表格数据
                {
                    id: "1",
                    xm: "张泉",
                    xb: "男",
                    nl: 30,
                    label: "",
                    mz: "汉族",
                    type: "人员",
                },
                {
                    id: "2",
                    xm: "王炫烨",
                    xb: "男",
                    nl: 30,
                    label: "",
                    type: "人员",
                },
                {
                    id: "3",
                    xm: "王晨艳",
                    xb: "女",
                    nl: 30,
                    label: "残疾人",
                    type: "人员",
                },
                {
                    id: "4",
                    xm: "李帅",
                    xb: "女",
                    nl: 30,
                    label: "低保人员",
                    type: "人员",
                },
                {
                    id: "5",
                    xm: "刘国胜",
                    xb: "女",
                    nl: 30,
                    label: "",
                    type: "人员",
                },
                {
                    id: "6",
                    xm: "张泉",
                    xb: "男",
                    nl: 30,
                    label: "",
                    type: "人员",
                },
            ],
            ifSearch: false, // 判断是否在搜索中
        };
    },
    computed: {
        // 获取vuex state的变量
        ...mapState({
            isSubPageListShow: (state) => state.app.isSubPageListShow,
            // getSeriveName: (state) => state.app.getSeriveName
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
            handler: function (newName, oldName) {
                // this.input = ""; // 清空搜索内容
                // // 只有内容发生变化的时候才会去请求，如果传的值与当前的值相同就不会请求
                // if (newName == "常驻人数") {
                //     this.getJmListParams.pageNum = 1; // 默认加载第1页
                //     this.getJmListParams.sfcz = "是"; // 请示列表的名称
                //     this.searchparams.sfcz = "是"; // 搜索请求判断
                //     this.searZhsqListByType(this.getJmListParams); // 请示列表
                // } else {
                //     this.getJmListParams.pageNum = 1; // 默认加载第1页
                //     this.getJmListParams.sfcz = "否"; // 请示列表的名称
                //     this.searchparams.sfcz = "否"; // 搜索请求判断
                //     this.searZhsqListByType(this.getJmListParams); // 请示列表
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
        // 常驻人员请求--每次父级点击都要请求就执行此事件
        getCzPersonelList() {
            this.ifSearch = false;
            this.input = ""; // 清空搜索内容
            this.getJmListParams.pageNum = 1; // 默认加载第1页
            this.getJmListParams.sfcz = "是"; // 请示列表的名称
            this.searchparams.sfcz = "是"; // 搜索请求判断
            this.searZhsqListByType(this.getJmListParams); // 请求列表
        },
        // // 外来人口请求--每次父级点击都要请求就执行此事件
        getWlPersonelList2() {
            this.ifSearch = false;
            this.input = ""; // 清空搜索内容
            this.getJmListParams.pageNum = 1; // 默认加载第1页
            this.getJmListParams.sfcz = "否"; // 请示列表的名称
            this.searchparams.sfcz = "否"; // 搜索请求判断
            this.searZhsqListByType(this.getJmListParams); // 请求列表
        },
        // 点击搜索按钮
        handleIconClick() {
            // this.searchparams.name = this.input;
            // this.searZhsqListByType(this.searchparams); // 请求列表
        },
        // 在 Input 值改变时触发 ,搜索获取的列表,忽略频繁执行
        searchValueChange: _.debounce(function (e) {
            if (e !== "" && e !== null) {
                this.ifSearch = true; // 判断是否在搜索状态
                this.searchparams.name = e;
                this.searchparams.pageNum = 1; // 默认请求第一页
                this.searZhsqListByType(this.searchparams); // 请求列表
            } else {
                // console.log("内容为空请求列表");
                this.ifSearch = false; // 判断是否在搜索状态
                this.getJmListParams.pageNum = 1; // 默认请求第一页
                this.searZhsqListByType(this.getJmListParams);
            }
        }, 500),
        // 搜索输入失去焦点时触发
        searchChangeFun() {
            // console.log(value);
        },
        // 居民列表
        async searZhsqListByType(params) {
            const res = await this.$Http.searZhsqListByType(params);
            // console.log(res);
            if (res.code == 0) {
                // var id = 1;
                // 每每个对象里面添加一个ID
                res.rows.forEach((item) => {
                    // this.$set(item, "id", id++);
                    this.$set(item, "type", "人员");
                });
                this.pageNum = params.pageNum;
                this.total = res.total;
                // this.total = parseInt(res.total);
                // console.log(typeof this.total);
                this.tableResultData = res.rows;
                // console.log(this.tableResultData);
                this.tableDolumnData = this.perTableDolumnData;
            }
        },
        // 点击分页切换
        handleCurrentChange(page) {
            // 判断是否是搜索状态
            if (this.ifSearch) {
                this.searchparams.pageNum = page;
                this.searZhsqListByType(this.searchparams); // 请求列表
            } else {
                this.getJmListParams.pageNum = page;
                this.searZhsqListByType(this.getJmListParams); // 请求列表
            }
            // console.log(page);
        },
        // 计算表格的高度
        tableHeightFun() {
            // 判断如果页面存在则执行
            this.$nextTick(() => {
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
                    // console.log(
                    //     "列表高" + this.$refs.subPageList.offsetHeight,
                    //     "标题高" + this.$refs.subPageListHeight.offsetHeight,
                    //     "值" + this.tableHeight.height
                    // );
                }
            });
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
            // this.input = ""; // 清空搜索内容
            this.SETIsSubPageListShow(false);
            this.SETMapToolbarIsActive(false);
        },
        // 双击表格一行执行事件
        tableRowDbclick(data) {
            // console.log(data + "双击");
        },
        // 单击表格一行执行事件
        tableRowClick(data) {
            // console.log(data);
            switch (data.type) {
                case "人员":
                    this.$nextTick(() => {
                        // 人员弹框
                        this.SETIsMessageBoxShow(true); // 打开弹框
                        this.massageTitle = "人员信息";
                        this.tableRowData = data;
                        this.massageComponent = personelLayerCon; // 显示的组件
                        // this.getHouseMapList(); // 随机定位一层
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
    /deep/.el-input__icon,
    /deep/.el-input__suffix-inner {
        height: 100%;
        width: 0.24rem;
        text-align: center;
        transition: all 0.3s;
        line-height: 0.4rem;
        cursor: pointer;
    }
}
</style>
