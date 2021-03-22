<template>
    <div class="tableListCon">
        <el-table
            ref="multipleTable"
            :data="tableData"
            :height="tableHeight"
            style="width: 100%"
            @row-dblclick="changeCurrentChatFriends"
            @row-click="tableRowClick"
        >
            <el-table-column type="index" width="50" label="序号">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                v-for="item in tableDolumnData"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :min-width="item.width"
            >
                <template slot-scope="scope">
                    <!-- {{ scope.column.property }} -->
                    <span v-if="item.label == '标签'">
                        <i
                            v-show="tableData[scope.$index].sfdj == '是'"
                            class="iconfont iconlaoren color_dj_yellow"
                            title="独居老人"
                        ></i>
                        <i
                            v-show="tableData[scope.$index].sfkc == '是'"
                            class="iconfont iconlaoren color_kc_red"
                            title="空巢老人"
                        ></i>
                        <i
                            v-show="tableData[scope.$index].sfxmsf == '是'"
                            class="iconfont iconxingmanshifangrenyuan color_xm_orange"
                            title="刑满释放人员"
                        ></i>
                        <i
                            v-show="tableData[scope.$index].sftyjr == '是'"
                            class="iconfont iconjunren color_tyjr_green"
                            title="退役军人"
                        ></i>
                        <i
                            v-show="tableData[scope.$index].sfdb == '是'"
                            class="iconfont iconren color_db_blue"
                            title="低保人员"
                        ></i>
                        <i
                            v-show="tableData[scope.$index].sfcj == '是'"
                            class="iconfont iconcanjiren color_cj_yellow"
                            title="残疾人员"
                        ></i>
                    </span>
                    <span v-else>{{ scope.row[scope.column.property] }}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="prev, pager, next"
            :total="total"
            :pager-count="5"
        >
        </el-pagination>
    </div>
</template>

<script>
// :hide-on-single-page="value"  设置如只只有一页就不显示分页
import { mapState, mapActions } from "vuex";
export default {
    props: [
        "tableData",
        "tableDolumnData",
        "tableHeight",
        "pagesize",
        "total",
        "currentPage",
    ],
    components: {},
    data() {
        return {
            value: true, // 判断默认只有一页的时候分页不显示
            // currentPage: 1
        };
    },
    mounted() {},
    watch: {},
    computed: {
        ...mapState({
            // 获取vuex state的变量
            // currentPage: (state) => state.app.currentPage
        }),
    },
    methods: {
        // 双击表格执行事件
        changeCurrentChatFriends(row) {
            this.$emit("tableRowDbclick", row);
        },
        // 单击一行表格执行事件
        tableRowClick(row) {
            this.$emit("tableRowClick", row);
        },
        handleSizeChange(val) {
            this.pagesize = val;
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(currentPage) {
            // 点击分页table滚动到顶部
            this.$refs.multipleTable.bodyWrapper.scrollTop = 0;
            this.$emit("handleCurrentChange", currentPage);
            // this.SETCurrentPage(currentPage);
            // this.currentPage = currentPage;
            // console.log(`当前页: ${currentPage}`);
        },
        ...mapActions(["SETCurrentPage"]),
    },
};
</script>
<style lang="less" scoped>
// :show-overflow-tooltip="true"设置单行文本溢出
.tableListCon {
    /deep/.el-table__body-wrapper {
        // background: #999; // 高度测试
        // height: 100% !important;
    }
    /deep/.el-table .cell.el-tooltip {
        min-width: auto !important;
    }
    /deep/.el-table__body,
    /deep/.el-table__footer,
    /deep/.el-table__header {
        width: 100% !important;
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
    // 分页样式
    /deep/.el-pagination {
        margin-top: 10px;
        color: #fff;
        width: 100%;
        text-align: center;
    }
    /deep/.el-pagination button:disabled {
        color: rgba(255, 255, 255, 0.6);
    }
    /deep/.el-pagination button:disabled,
    // /deep/.el-dialog,
    /deep/.el-pagination .btn-next,
    /deep/.el-pagination .btn-prev,
    /deep/.el-pager li {
        background: none;
    }
    /deep/ .el-pagination .btn-next,
    /deep/.el-pagination .btn-prev {
        color: #fff;
    }
    /deep/.el-pagination button,
    /deep/.el-pager li,
    /deep/.el-pagination span:not([class*="suffix"]) {
        font-size: 14px;
        min-width: auto;
        height: 20px;
        line-height: 20px;
    }
    /deep/.el-pager li {
        padding: 0 0.05rem;
    }
    /deep/.el-pager li.active {
        color: #43e8be;
    }
    /deep/.el-pager li.btn-quicknext,
    /deep/.el-pager li.btn-quickprev {
        color: #fff;
        height: 20px;
        line-height: 20px;
    }
    /deep/.el-pager .more::before {
        height: 20px;
        line-height: 20px;
    }
    /deep/.el-table td,
    /deep/.el-table th.is-leaf {
        border-bottom: none;
    }
}
</style>
