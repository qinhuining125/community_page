<template>
    <!-- 水表 -->
    <div>
        <div class="search">
            <el-input
                placeholder="请输入设备名称"
                v-model="input"
                suffix-icon="iconfont iconsousuo"
                @input="searchValueChange"
            >
            </el-input>
        </div>
        <h5 class="listTitle">水表列表</h5>
        <!-- 数据列表 -->
        <div class="party-table">
            <el-table :data="tableData" height="100%" @row-click="waterTips">
                <el-table-column type="index" width="60" label="序号">
                </el-table-column>
                <el-table-column prop="SBMC" label="设备名称">
                </el-table-column>
                <el-table-column
                    prop="WZ"
                    label="位置"
                    :show-overflow-tooltip="true"
                    min-width="100"
                >
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页 -->
        <div>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="totalCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="info.page"
                :page-size="info.size"
            >
            </el-pagination>
        </div>

        <!-- 水表弹框 -->
        <water-tips
            @closeTips="closeTips"
            v-show="isShow"
            :cWaterObj="objNull"
        ></water-tips>
    </div>
</template>

<script>
import _ from "lodash";
import waterTips from "../../../components/tips/waterTips";
export default {
    name: "waterMeter",
    components: {
        waterTips,
    },
    data() {
        return {
            info: {
                page: 1,
                size: 20,
                sbmc: "", // 搜索内容
            }, //接口传参数
            objNull: "", //点击每项的空对象
            totalCount: 80, //总条数
            isShow: false, //弹框显示隐藏
            input: "", // 搜索值
            tableData: [],
        };
    },
    created() {
        // this.initGetWaterList();
    },
    methods: {
        // 初始化列表
        initGetWaterList() {
            this.input = "";
            this.info.sbmc = "";
            this.info.page = 1; // 默认请求第一页
            this.getWaterList();
        },
        // 在 Input 值改变时触发 ,搜索获取的列表,忽略频繁执行
        searchValueChange: _.debounce(function (e) {
            this.info.sbmc = e;
            this.info.page = 1; // 默认请求第一页
            this.getWaterList();
        }, 500),
        // 请求后端水表接口
        async getWaterList() {
            const res = await this.$Http.waterList(this.info);
            if (res.code == 0) {
                this.totalCount = res.data.total;
                this.tableData = res.data.rows;
            }
        },

        waterTips(row) {
            this.isShow = true;
            this.objNull = row;
            console.log(this.objNull);
        },
        closeTips() {
            this.isShow = false;
        },
        handleSizeChange(val) {
            this.getWaterList();
        },
        handleCurrentChange(val) {
            this.info.page = val; //显示当前第几页
            // this.info.size = 10;
            this.getWaterList();
        },
    },
};
</script>

<style lang="less" scoped>
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