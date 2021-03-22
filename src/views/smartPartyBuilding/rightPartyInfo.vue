<template>
    <div class="rightInfo bg publicStyle_bg">
        <span class="line"></span>
        <div class="cont-padding">
            <div class="party-title">
                <h2 class="title">党员信息</h2>
                <i @click="close" class="el-icon-close"></i>
            </div>
            <el-input
                suffix-icon="el-icon-search"
                v-model="input1"
                placeholder="请输入党员姓名"
                @input="searchValueChange"
            >
            </el-input>
            <h4 class="party-list">党员列表</h4>
            <!-- 表单 -->
            <div class="party-table">
                <el-table
                    :data="tableData"
                    height="100%"
                    @row-click="partyTips"
                >
                    <el-table-column type="index" width="50" label="序号">
                    </el-table-column>
                    <el-table-column prop="xm" label="党员姓名">
                    </el-table-column>
                    <el-table-column prop="xl" label="学历"> </el-table-column>
                    <el-table-column prop="dylx" label="党员类型">
                    </el-table-column>
                </el-table>
            </div>

            <!-- 分页 -->
            <div>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="totalCount"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-size="size"
                >
                </el-pagination>
            </div>
            <!-- 党员信息弹框 -->
            <party-tips
                v-show="isShow"
                @closeTips="closeTips"
                :rowInfo="objNull"
            ></party-tips>
        </div>
    </div>
</template>

<script>
import _ from "lodash";
import { mapState, mapActions } from "vuex";
import partyTips from "../../views/smartPartyBuilding/partyTips";
export default {
    name: "rightPartyInfo",
    components: {
        partyTips,
    },
    data() {
        return {
            objNull: "", //弹框信息初始为空
            isShow: false, //弹框显示隐藏
            input1: "",
            totalCount: 20, //总条数
            page: 1,
            size: 20,
            tableData: [
                {
                    nums: 1,
                    name: "王小虎",
                    education: "本科",
                    partyType: "党员",
                },
                {
                    nums: 2,
                    name: "刘俊硕",
                    education: "硕士",
                    partyType: "党员",
                },
                {
                    nums: 3,
                    name: "岳慧",
                    education: "博士",
                    partyType: "党员",
                },
                {
                    nums: 4,
                    name: "郭文玲",
                    education: "大专",
                    partyType: "党员",
                },
                {
                    nums: 5,
                    name: "杨丽梅",
                    education: "高中以下",
                    partyType: "党员",
                },
                {
                    nums: 6,
                    name: "张春山",
                    education: "本科",
                    partyType: "党员",
                },
                {
                    nums: 7,
                    name: "崔瑞凤",
                    education: "本科",
                    partyType: "党员",
                },
                {
                    nums: 8,
                    name: "王小虎",
                    education: "本科",
                    partyType: "党员",
                },
                {
                    nums: 9,
                    name: "刘俊硕",
                    education: "硕士",
                    partyType: "党员",
                },
                {
                    nums: 10,
                    name: "岳慧",
                    education: "博士",
                    partyType: "党员",
                },
                {
                    nums: 11,
                    name: "郭文玲",
                    education: "大专",
                    partyType: "党员",
                },
                {
                    nums: 12,
                    name: "杨丽梅",
                    education: "高中以下",
                    partyType: "党员",
                },
                {
                    nums: 13,
                    name: "张春山",
                    education: "本科",
                    partyType: "党员",
                },
                {
                    nums: 14,
                    name: "崔瑞凤",
                    education: "本科",
                    partyType: "党员",
                },
                {
                    nums: 15,
                    name: "王小虎",
                    education: "本科",
                    partyType: "党员",
                },
                {
                    nums: 16,
                    name: "刘俊硕",
                    education: "硕士",
                    partyType: "党员",
                },
                {
                    nums: 17,
                    name: "岳慧",
                    education: "博士",
                    partyType: "党员",
                },
                {
                    nums: 18,
                    name: "郭文玲",
                    education: "大专",
                    partyType: "党员",
                },
                {
                    nums: 19,
                    name: "杨丽梅",
                    education: "高中以下",
                    partyType: "党员",
                },
                {
                    nums: 20,
                    name: "张春山",
                    education: "本科",
                    partyType: "党员",
                },
            ],
            params: {
                type: 6,
                pageNum: 1,
                pageSize: 20,
            },
            searchParams: {
                type: 6,
                pageNum: 1,
                pageSize: 20,
                name: "",
            },
            ifSearch: false, // 判断是否在搜索中
        };
    },

    mounted() {
        // this.getPartyInfo(this.params);
    },
    computed: {
        // 获取vuex的state值
        ...mapState({
            isPartyShow: (state) => state.app.isPartyShow,
            isSubPageListShow: (state) => state.app.isSubPageListShow,
            mapToolbarIsActive: (state) => state.app.mapToolbarIsActive,
        }),
    },
    methods: {
        // 父级点击事件
        getPartyInfoFun() {
            this.ifSearch = false; // 设置成未搜索状态
            this.input1 = ""; // 清空搜索内容
            this.params.pageNum = 1; // 默认加载第一页
            this.getPartyInfo(this.params); // 请求总列表
        },
        async getPartyInfo(params) {
            const res = await this.$Http.searZhsqListByType(params);
            this.tableData = res.rows;
            this.page = params.pageNum;
            this.totalCount = res.total;
            // console.log(res);
        },
        // 在 Input 值改变时触发 ,搜索获取的列表,忽略频繁执行
        searchValueChange: _.debounce(function (e) {
            if (e !== "" && e !== null) {
                this.ifSearch = true; // 判断是否在搜索状态
                this.searchParams.name = e;
                this.searchParams.pageNum = 1; // 默认请求第一页
                this.getPartyInfo(this.searchParams); // 请求列表数据
            } else {
                // console.log("内容为空请求列表");
                this.ifSearch = false; // 判断是否在搜索状态
                this.params.pageNum = 1; // 默认请求第一页
                this.getPartyInfo(this.params); // 请求列表数据
            }
        }, 500),
        ...mapActions([
            "SETIsPartyShow",
            "SETIsSubPageListShow",
            "SETMapToolbarIsActive",
        ]),
        close() {
            this.SETIsPartyShow(false);
            this.SETIsSubPageListShow(false);
            this.SETMapToolbarIsActive(false);
        },
        partyTips(row) {
            this.isShow = true;
            // console.log(row);
            this.objNull = row;
        },
        closeTips() {
            this.isShow = false;
        },
        // 点击分页
        handleCurrentChange(val) {
            // 判断是否是搜索状态
            if (this.ifSearch) {
                this.searchParams.pageNum = val; //显示当前第几页
                this.getPartyInfo(this.searchParams); // 搜索请求
            } else {
                this.params.pageNum = val; //显示当前第几页
                this.getPartyInfo(this.params); // 总列表请求
            }
        },
    },
};
</script>

<style scoped lang="less">
.rightInfo {
    width: 100%;
    height: 90%;
    max-height: 90%;
    min-height: 30%;
}

.title {
    text-align: left;
    letter-spacing: 2px;
    color: #fff;
    font-size: 0.18rem;
    font-weight: bold;
    display: inline-block;
}

.cont-padding {
    padding: 0.92vh 0.52vw;
}
.party-title {
    width: 100%;
    height: 4vh;
    line-height: 4vh;
    font-size: 1.2vw;
    overflow: hidden;
    margin-bottom: 0.92vh;
}
.party-list {
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 0.82vw;
    line-height: 3.4vh;
    background: url("../../assets/images/title3_Bg.png") no-repeat;
    background-size: 100% 100%;
    margin: 0.92vh 0;
}
/deep/ .el-icon-close {
    float: right;
    line-height: 4vh;
}
/deep/ .el-icon-close:hover {
    color: #43e8be;
}
/deep/ .el-input__inner {
    color: #e5e5e5;
    display: inline-block;
    width: 100%;
    height: 4vh;
    border-radius: 4px;
    // background: #26272c66;
    background: #26272c;
    border: none;
    line-height: 3vh;
    padding: 0.5vh 2vw 0.5vh 0.52vw;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
/deep/.el-icon-search:before {
    color: #43e8be;
}
.party-table {
    width: 100%;
    height: 68vh;
    margin-bottom: 1vh;
}
/deep/.el-table__body,
/deep/.el-table__footer,
/deep/.el-table__header {
    width: auto !important;
}
/deep/.el-table thead {
    color: #43e8be;
}
/deep/.el-table {
    color: #fff;
}
/deep/.el-table,
/deep/.el-table__expanded-cell {
    background: none;
}

/deep/.el-table th,
/deep/.el-table tr {
    font-size: 0.14rem;
    background: none;
    padding: 0.01rem 0;
}
/deep/.el-table td,
/deep/.el-table--border th.gutter:last-of-type /deep/.el-table th.is-leaf {
    border-bottom: none;
}
/deep/.el-table th.is-leaf {
    border-bottom: 1px solid #7c7875;
}
/deep/.el-table td,
/deep/.el-table th {
    padding: 0.1rem 0;
    text-align: center;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
    cursor: pointer;
    background: rgba(22, 217, 237, 0.4);
}
/deep/.el-table .cell {
    line-height: 0.24rem;
    padding: 0 0.05rem;
}
/deep/.el-table::before {
    height: 0px;
}

.publicStyle_bg:after {
    margin-left: none;
}

// 分页

/deep/.el-pagination {
    text-align: center;
}

/deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #43e8be;
    min-width: auto;
    border: none;
    border-radius: 0;
    font-size: 0.14rem;
    margin: 0;
    height: 0.28rem;
    line-height: 0.28rem;
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background: none;
    color: #43e8be;
    min-width: auto;
    border: none;
    border-radius: 0;
    font-size: 0.14rem;
    margin: 0;
    height: 0.28rem;
    line-height: 0.28rem;
}
/deep/.el-pagination.is-background
    .el-pager
    li:not(.disabled).active
    /deep/.el-pagination {
    text-align: center;
    padding: 0;
}

/deep/.el-pagination.is-background .btn-next,
/deep/ .el-pagination.is-background .btn-prev,
/deep/.el-pagination.is-background .el-pager li {
    background: none;
    color: #fff;
    min-width: auto;
    border: none;
    border-radius: 0;
    font-size: 0.14rem;
    margin: 0;
    height: 0.28rem;
    line-height: 0.28rem;
}

/deep/ .el-pagination span:not([class*="suffix"]) {
    margin: 0 0.04rem;
}

/deep/.btn-prev:hover {
    color: #43e8be !important;
}
/deep/.btn-next:hover {
    color: #43e8be !important;
}
</style>
