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
                    placeholder="请输入重点事件类型"
                    v-model="input"
                    suffix-icon="iconfont iconsousuo"
                    @input="searchValueChange"
                >
                </el-input>
            </div>
            <h5 class="listTitle">事件列表</h5>
        </div>
        <table-list
            @tableRowDbclick="tableRowDbclick"
            @tableRowClick="tableRowClick"
            :tableHeight="tableHeight.height"
            class="tableListCon"
            :tableDolumnData="evenTableDolumnData"
            :tableData="tableResultData"
            :pagesize="params.size"
            :currentPage="params.page"
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
import eventLayer from "@/components/messageBox/eventLayer.vue"; // 事件弹框

export default {
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
            params: {
                page: 1,
                size: 20,
                czzt: "", // 处置状态
                sjlx: "", // 搜索条件
            },
            tableDolumnData: [],
            tableResultData: [],
            evenTableDolumnData: [
                // { label: "序号", prop: "id", width: "25%" },
                { label: "事件类型", prop: "SJLX", width: "25%" },
                { label: "事件内容", prop: "YCNR", width: "25%" },
                { label: "状态", prop: "CZZT", width: "25%" },
            ],
            evenTableResultData: [
                {
                    id: 1,
                    SJLX: "矛盾纠纷",
                    YCNR: "视频设备发生报警，请前往查看",
                    CZZT: "未处置",
                    type: "事件",
                },
            ],
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
                // console.log(newName);
                // this.tableDolumnData = this.evenTableDolumnData;
                // this.tableResultData = this.evenTableResultData;
                // this.total = this.tableResultData.length;
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
        // 在 Input 值改变时触发 ,搜索获取的列表,忽略频繁执行
        searchValueChange: _.debounce(function (e) {
            this.params.sjlx = e;
            this.params.page = 1; // 默认请求第一页
            this.getZdsjList(); // 请求列表数据
        }, 500),
        // 左侧点击刷新列表
        initChangeList(name) {
            this.params.page = 1;
            this.input = "";
            this.params.czzt = name;
            this.params.sjlx = ""; // 搜索内容为空
            this.getZdsjList();
        },
        async getZdsjList(params) {
            const res = await this.$Http.getZdsjList(this.params);
            if (res.code == 0) {
                this.total = res.data.total;
                this.tableResultData = res.data.rows;
            }
        },
        ...mapActions([
            "SETIsSubPageListShow",
            "SETMapToolbarIsActive",
            "SETIsMessageBoxShow",
        ]),
        // 点击分页切换
        handleCurrentChange(page) {
            // console.log(page);
            this.params.page = page;
            this.getZdsjList();
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
            this.massageTitle = "事件信息";
            this.SETIsMessageBoxShow(true); // 打开弹框
            this.tableRowData = data;
            this.massageComponent = eventLayer;
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
