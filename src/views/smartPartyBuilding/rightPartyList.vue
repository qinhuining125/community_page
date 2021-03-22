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
                    placeholder="请输入党员姓名"
                    v-model="input"
                    suffix-icon="iconfont iconsousuo"
                >
                </el-input>
            </div>
            <h5 class="listTitle">人员列表</h5>
        </div>
        <key-person-list
            v-if="zhzlListChange"
            :tableHeight="tableHeight"
            class="tableListCon"
            :tableData="resultKeyPersonData"
            :pagesize="resultKeyPersonPagesize"
        ></key-person-list>
        <table-list
            v-else
            :tableHeight="tableHeight.height"
            class="tableListCon"
            :tableDolumnData="tableDolumnData"
            :tableData="tableResultData"
            :pagesize="pagesize"
        ></table-list>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import tableList from "@/components/tableList";
import keyPersonList from "@/components/keyPersonListTable";
export default {
    props: ["title"],
    components: {
        tableList,
        keyPersonList,
    },
    data() {
        return {
            isPefson: true,
            tableHeight: {
                height: "60%",
            },
            pagesize: 20, // 一页显示30条
            resultKeyPersonPagesize: 10,
            input: "",
            resultKeyPersonData: [
                {
                    id: 1,
                    name: "艾宝",
                    sex: "女",
                    age: "70",
                    label: "独居人员",
                },
                {
                    id: 2,
                    name: "岳静媛",
                    sex: "男",
                    age: "72",
                    label: "独居人员",
                },
                {
                    id: 3,
                    name: "岳富家",
                    sex: "男",
                    age: "72",
                    label: "独居人员",
                },
                {
                    id: 4,
                    name: "杨丽梅",
                    sex: "女",
                    age: "72",
                    label: "独居人员",
                },
                {
                    id: 5,
                    name: "朱熠轩",
                    sex: "男",
                    age: "72",
                    label: "独居人员",
                },
                {
                    id: 6,
                    name: "何京鸽",
                    sex: "男",
                    age: "72",
                    label: "独居人员",
                },
                {
                    id: 7,
                    name: "王子硕",
                    sex: "男",
                    age: "72",
                    label: "独居人员",
                },
                {
                    id: 8,
                    name: "高佳",
                    sex: "男",
                    age: "72",
                    label: "独居人员",
                },
                {
                    id: 9,
                    name: "王增学",
                    sex: "男",
                    age: "72",
                    label: "独居人员",
                },
                {
                    id: 10,
                    name: "邢彦坤",
                    sex: "男",
                    age: "72",
                    label: "独居人员",
                },
                {
                    id: 11,
                    name: "刘钊",
                    sex: "男",
                    age: "72",
                    label: "独居人员",
                },
                {
                    id: 12,
                    name: "邢彦坤",
                    sex: "男",
                    age: "72",
                    label: "独居人员",
                },
            ],
        };
    },
    computed: {
        // 获取vuex state的变量
        ...mapState({
            zhzlListChange: (state) => state.app.zhzlListChange,
            isSubPageListShow: (state) => state.app.isSubPageListShow,
            tableDolumnData: (state) => state.app.tableDolumnData,
            tableResultData: (state) => state.app.tableResultData,
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
    },
    mounted() {
        this.$nextTick(() => {
            this.tableHeightFun();
            window.addEventListener("resize", this.tableHeightFun);
        });
    },
    // 销毁window事件，不然会后错 Cannot read property 'offsetHeight' of undefined
    beforeDestroy() {
        window.removeEventListener("resize", this.tableHeightFun);
    },
    methods: {
        // 获取vuex公共方法
        ...mapActions(["SETIsSubPageListShow", "SETMapToolbarIsActive"]),
        // 计算获取表格的高度
        tableHeightFun() {
            this.tableHeight.height =
                this.$refs.subPageList.offsetHeight -
                this.$refs.subPageListHeight.offsetHeight -
                60 +
                "px";
        },

        //关闭右侧弹框
        rightCloseBtn() {
            this.SETIsSubPageListShow(false);
            this.SETMapToolbarIsActive(false);
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
        background: url(../../assets/images/title4_Bg.png) no-repeat center;
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
