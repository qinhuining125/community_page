<template>
    <el-dialog
        class="messageBoxCon"
        :title="massageTitle"
        :visible="isNewsMessageShow"
        :modal="false"
        width="25%"
        :close-on-click-modal="false"
        @close="closeMessgeBtn"
    >
        <div class="content">
            <h5 class="title txtC">{{ rowData.noticeTitle }}</h5>
            <p class="txt">{{ rowData.noticeContent }}</p>
            <el-row :gutter="10" class="mt_20">
                <el-col :span="12"> 系统管理员 </el-col>
                <el-col :span="12" class="txtR">
                    {{ rowData.createTime }}
                </el-col>
            </el-row>
        </div>
        <div class="txtC">
            <el-button
                v-if="rowData.noticeRead == '0'"
                @click="confirmReadStatusBtn(rowData)"
                size="small"
                class="btn-green"
            >
                确认已读
            </el-button>
            <el-button
                v-else
                @click="readStatusBtn"
                size="small"
                class="btn-green--border"
            >
                已读
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    /*
    tableRowData 当前点击表格的信息
    massageTitle 标题
    */
    props: ["rowData", "massageTitle"],
    components: {},
    data() {
        return {
            dialogVisible: false,
        };
    },
    mounted() {},
    watch: {},
    computed: {
        // 获取vuex state的变量
        ...mapState({
            isNewsMessageShow: (state) => state.app.isNewsMessageShow,
        }),
    },
    methods: {
        ...mapActions(["SETIsNewsMessageShow"]),
        // 关闭弹框
        closeMessgeBtn() {
            this.SETIsNewsMessageShow(false);
        },
        // 点击确认已读按钮反馈给后台
        confirmReadStatusBtn() {
            // 向后台传ID
            console.log(this.rowData.noticeId);
            this.updateNotice(this.rowData.noticeId);
        },
        // 向后台返回已读状态
        async updateNotice(id) {
            const res = await this.$Http.updateNotice({ id: id });
            if (res.code == 0) {
                this.closeMessgeBtn(); // 关闭弹框
                this.$emit("updateNotice", "news");
            }
        },
        // 点击已读按钮
        readStatusBtn() {
            this.closeMessgeBtn(); // 关闭弹框
            // this.$emit("updateNotice", "news");
        },
    },
};
</script>
<style lang="less" scoped>
.messageBoxCon {
    /deep/.el-dialog {
        min-width: 500px !important;
    }
    .content {
        padding: 10px;
        .title {
            font-size: 16px;
            line-height: 30px;
        }
        .txt {
            text-indent: 28px;
            line-height: 28px;
            font-size: 14px;
        }
    }
}
</style>
