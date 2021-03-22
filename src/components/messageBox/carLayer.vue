<template>
    <el-dialog
        class="messageBoxCon"
        :title="massageTitle"
        :visible="isMessageBoxShow"
        :modal="false"
        width="25%"
        :close-on-click-modal="false"
        @close="closeMessgeBtn"
    >
        <div class="personelInfo">
            <img class="img" src="../../assets/images/video_img1.png" alt="" />
            <el-row :gutter="10" class="txt">
                <el-col :span="12">
                    <span class="color_blue">车牌号：</span>
                    <span>{{ tableRowData.clhm }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">车主姓名：</span>
                    <span>{{ tableRowData.czxm }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">车型：</span>
                    <span>{{ tableRowData.cx }}</span>
                </el-col>
                <el-col :span="24">
                    <span class="color_blue">电话：</span>
                    <span>{{ tableRowData.lxdh }}</span>
                </el-col>
            </el-row>
        </div>
        <!-- <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false"
                    >确 定</el-button
                >
            </div> -->
    </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    /*
    tableRowData 当前点击表格的信息
    massageTitle 标题
    */
    props: ["tableRowData", "massageTitle"],
    components: {},
    data() {
        return {
            // dialogVisible: false
        };
    },
    mounted() {},
    watch: {},
    computed: {
        // 获取vuex state的变量
        ...mapState({
            isMessageBoxShow: (state) => state.app.isMessageBoxShow,
        }),
    },
    methods: {
        ...mapActions(["SETIsMessageBoxShow"]),
        // 关闭弹框
        closeMessgeBtn() {
            this.SETIsMessageBoxShow(false);
        },
    },
};
</script>
<style lang="less" scoped>
.messageBoxCon {
    /deep/.el-dialog {
        width: 400px !important;
    }

    .personelInfo {
        display: flex;
        img {
            width: 70px;
            height: 80px;
            margin-right: 10px;
        }
        span {
            font-size: 13px !important;
            line-height: 24px;
        }
        .txt {
            flex: 1;
            font-size: 12px;
        }
    }
}
</style>
