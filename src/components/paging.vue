<template>
    <div>
        <!-- 分页 -->
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
</template>

<script>
export default {
    name: "paging",
    data() {
        return {
            info: {
                page: 1, //当前页
                size: 10 //每页显示数据
            },
            tableData: [], //总数据

            totalCount: 80 //总条数
        };
    },
    created() {
        this.getSmokeList();
    },

    methods: {
        //  请求后端设备接口
        async getSmokeList() {
            const res = await this.$Http.smokeList(this.info);
            if (res.code == 0) {
                this.totalCount = res.data.total;
                this.tableData = res.data.rows;
                // this.$emit("pageC2", this.tableData);
                var nums = 1;
                this.tableData.forEach((item) => {
                    this.$set(item, "nums", nums++);
                });
            }
        },

        handleSizeChange(val) {
            this.getSmokeList();
        },
        handleCurrentChange(val) {
            this.info.page = val; //显示当前第几页
            this.info.size = 10;
            this.getSmokeList();
        }
    }
};
</script>

<style scoped lang="less">
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