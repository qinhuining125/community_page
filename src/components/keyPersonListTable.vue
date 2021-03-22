<template>
    <div class="keyPersonListTableCon">
        <ul class="keyPersonListTable" :style="tableHeight" ref="multipleTable">
            <li
                v-for="(item, idx) in tableData"
                :key="idx"
                @click="tableRowClick(item)"
            >
                <span class="number">{{ item.id }}</span>
                <el-row>
                    <el-col :sm="12" :md="12" :lg="10"
                        ><span class="color_blue">姓名：</span
                        >{{ item.xm }}</el-col
                    >
                    <el-col :sm="12" :md="12" :lg="7"
                        ><span class="color_blue">性别：</span
                        >{{ item.xb }}</el-col
                    >
                    <el-col :sm="12" :md="12" :lg="7"
                        ><span class="color_blue">年龄：</span
                        >{{ item.nl }}</el-col
                    >
                    <el-col :span="24">
                        <span class="color_blue">标签：</span>
                        <span>
                            <i
                                v-show="item.sfdj == '是'"
                                class="iconfont iconlaoren color_dj_yellow"
                                title="独居老人"
                            ></i>
                            <i
                                v-show="item.sfkc == '是'"
                                class="iconfont iconlaoren color_kc_red"
                                title="空巢老人"
                            ></i>
                            <i
                                v-show="item.sfxmsf == '是'"
                                class="iconfont iconxingmanshifangrenyuan color_xm_orange"
                                title="刑满释放人员"
                            ></i>
                            <i
                                v-show="item.sftyjr == '是'"
                                class="iconfont iconjunren color_tyjr_green"
                                title="退役军人"
                            ></i>
                            <i
                                v-show="item.sfdb == '是'"
                                class="iconfont iconren color_db_blue"
                                title="低保人员"
                            ></i>
                            <i
                                v-show="item.sfcj == '是'"
                                class="iconfont iconcanjiren color_cj_yellow"
                                title="残疾人员"
                            ></i
                        ></span>
                    </el-col>
                </el-row>
            </li>
        </ul>
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
import { mapState, mapActions } from "vuex";
export default {
    props: ["tableData", "tableHeight", "pagesize", "total", "currentPage"],
    components: {},
    data() {
        return {
            // :hide-on-single-page="value"   // 设置判断默认只有一页的时候分页不显示
            // value: true // 判断默认只有一页的时候分页不显示
            // currentPage: 1
        };
    },
    watch: {},
    computed: {
        ...mapState({
            // 获取vuex state的变量
            // currentPage: (state) => state.app.currentPage
        }),
    },
    mounted() {},
    methods: {
        //
        // 单击一行表格执行事件
        tableRowClick(data) {
            this.$emit("tableRowClick", data);
        },
        changeCurrentChatFriends(node, data) {
            console.log(node);
        },
        handleSizeChange(val) {
            this.pagesize = val;
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(currentPage) {
            // 点击分页table滚动到顶部
            this.$refs.multipleTable.scrollTop = 0;
            this.SETCurrentPage(currentPage);
            // this.currentPage = currentPage;
            // console.log(`当前页: ${currentPage}`);
        },
        ...mapActions(["SETCurrentPage"]),
    },
};
</script>
<style lang="less" scoped>
.keyPersonListTableCon {
    padding: 0 0.1rem;
    .keyPersonListTable {
        overflow-y: auto;
        li {
            cursor: pointer;
            display: flex;
            font-size: 0.14rem;
            line-height: 0.32rem;
            position: relative;
            border-bottom: 1px solid #7b7c7e;
            padding: 0.1rem 0 0.1rem 0.2rem;
            .number {
                font-family: "jixieziti";
                position: absolute;
                left: 0;
                top: 50%;
                margin-top: -0.16rem;
                font-size: 0.16rem;
                width: 0.2rem;
                text-align: center;
                color: #fff;
            }
        }
        li:hover {
            background: rgba(35, 169, 181, 0.4);
        }
    }
    // 分页样式
    /deep/.el-pagination {
        margin-top: 0.1rem;
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
        font-size: 0.14rem;
        min-width: auto;
        height: 0.28rem;
        line-height: 0.28rem;
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
        height: 0.28rem;
        line-height: 0.28rem;
    }
    /deep/.el-pager .more::before {
        height: 0.28rem;
        line-height: 0.28rem;
    }
}
</style>
