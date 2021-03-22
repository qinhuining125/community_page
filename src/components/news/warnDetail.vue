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
            <!-- <h5 class="title txtC">{{ rowData.title }}</h5>
            <p class="txt">{{ rowData.message }}</p> -->
            <el-row :gutter="10" class="">
                <el-col :span="12" class="mb_10">
                    <label class="color_blue">告警设备：</label>
                    <span>{{ rowData.sbmc }}</span>
                </el-col>
                <el-col :span="12" class="txtR mb_10">
                    <label class="color_blue">告警时间： </label>
                    <span>{{ rowData.ycsj }}</span>
                </el-col>
                <el-col :span="24" class="mb_10">
                    <label class="color_blue">位 置： </label>
                    <span>{{ rowData.wz }}</span>
                </el-col>
                <el-col :span="24" class="detail-txt mb_10">
                    <label class="color_blue"> 异常详情： </label>
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="rowData.ycnr"
                        :disabled="true"
                    >
                    </el-input>
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
            textarea: "",
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
            // console.log(this.rowData.ycid);
            this.updateYc(this.rowData.ycid);
        },
        // 向后台返回已读
        async updateYc(id) {
            const res = await this.$Http.updateYc({ id: id });
            if (res.code == 0) {
                this.closeMessgeBtn(); // 关闭弹框
                this.$emit("updateNotice", "warn");
            }
        },
        // 确认已读按钮
        readStatusBtn() {
            this.closeMessgeBtn(); // 关闭弹框
            // this.$emit("updateNotice", "warn");
        },
    },
};
</script>
<style lang="less" scoped>
.messageBoxCon {
    /deep/.el-dialog {
        min-width: 500px !important;
    }
    /deep/.el-textarea__inner,
    /deep/.el-textarea.is-disabled .el-textarea__inner {
        background: none;
        border: 1px solid #62e8c7;
        color: #fff;
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
        .detail-txt {
            display: flex;
            align-items: center;
        }
        label {
            width: 90px;
            display: inline-block;
        }
        .row {
            margin-bottom: 10;
        }
    }
}
</style>
