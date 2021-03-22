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
                    placeholder="请输入内容"
                    v-model="input"
                    suffix-icon="iconfont iconsousuo"
                >
                </el-input>
            </div>
            <h5 class="listTitle">任务列表</h5>
        </div>
        <table-list
            @tableRowDbclick="tableRowDbclick"
            @tableRowClick="tableRowClick"
            :tableHeight="tableHeight.height"
            class="tableListCon"
            :tableDolumnData="tableDolumnData"
            :tableData="tableResultData"
            :pagesize="params.pageSize"
            :currentPage="params.pageNum"
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
import { mapState, mapActions } from "vuex";
import tableList from "@/components/tableList";
import taskLayer from "@/components/messageBox/taskLayer.vue"; // 巡检

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
                pageNum: 1,
                pageSize: 20,
            },
            tableDolumnData: [
                // { label: "序号", prop: "id", width: "25%" },
                { label: "任务名称", prop: "taskName", width: "25%" },
                { label: "巡检人员", prop: "name", width: "25%" },
                { label: "状态", prop: "state", width: "25%" },
            ],
            tableResultData: [
                {
                    id: "1",
                    taskName: "巡查楼梯",
                    name: "张莎莎",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "2",
                    taskName: "巡查自来水",
                    name: "王苍",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "3",
                    taskName: "巡查安全通道",
                    name: "林杨",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "4",
                    taskName: "巡查天花板",
                    name: "刘易",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "5",
                    taskName: "巡查楼梯",
                    name: "张莎莎",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "6",
                    taskName: "巡查自来水",
                    name: "王苍",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "7",
                    taskName: "巡查安全通道",
                    name: "林杨",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "8",
                    taskName: "巡查天花板",
                    name: "刘易",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "9",
                    taskName: "巡查楼梯",
                    name: "张莎莎",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "10",
                    taskName: "巡查自来水",
                    name: "王苍",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "11",
                    taskName: "巡查安全通道",
                    name: "林杨",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "12",
                    taskName: "巡查天花板",
                    name: "刘易",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "13",
                    taskName: "巡查楼梯",
                    name: "张莎莎",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "14",
                    taskName: "巡查自来水",
                    name: "王苍",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "15",
                    taskName: "巡查安全通道",
                    name: "林杨",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "16",
                    taskName: "巡查天花板",
                    name: "刘易",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "17",
                    taskName: "巡查楼梯",
                    name: "张莎莎",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "18",
                    taskName: "巡查自来水",
                    name: "王苍",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "19",
                    taskName: "巡查安全通道",
                    name: "林杨",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "20",
                    taskName: "巡查天花板",
                    name: "刘易",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "21",
                    taskName: "巡查安全通道",
                    name: "林杨",
                    state: "未巡",
                    type: "巡检",
                },
                {
                    id: "22",
                    taskName: "巡查天花板",
                    name: "刘易",
                    state: "未巡",
                    type: "巡检",
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
                this.total = this.tableResultData.length;
                console.log(newName);
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
        // 点击分页切换
        handleCurrentChange(page) {
            console.log(page);
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
            // console.log(data.type);
            switch (data.type) {
                case "巡检":
                    this.massageTitle = "巡检详情";
                    this.SETIsMessageBoxShow(true); // 打开弹框
                    this.tableRowData = data;
                    this.massageComponent = taskLayer;
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
