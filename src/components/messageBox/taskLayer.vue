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
        <el-row :gutter="10">
            <el-col :span="24">
                <span class="color_blue">巡检名称：</span>
                <span>巡查自来水</span>
            </el-col>
            <el-col :span="24">
                <span class="color_blue">巡检时间：</span>
                <span>2020-05-18</span>
            </el-col>
            <el-col :span="24">
                <span class="color_blue">巡检状态：</span>
                <span>未巡</span>
            </el-col>
            <el-col :span="24">
                <span class="color_blue">是否异常：</span>
                <span>否</span>
            </el-col>
            <el-col :span="24">
                <span class="color_blue">巡检记录：</span>
                <span class="color_orange">从大门开始巡检</span>
            </el-col>
            <el-col :span="24">
                <span class="color_blue">巡检附件：</span>
                <span>无</span>
            </el-col>
        </el-row>
        <img
            class="img mt_10"
            src="../../assets/images/video_img1.png"
            alt=""
        />
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
        return {};
    },
    mounted() {},
    watch: {},
    computed: {
        // 获取vuex state的变量
        ...mapState({
            isMessageBoxShow: state => state.app.isMessageBoxShow
        })
    },
    methods: {
        ...mapActions(["SETIsMessageBoxShow"]),
        // 关闭弹框
        closeMessgeBtn() {
            this.SETIsMessageBoxShow(false);
        }
    }
};
</script>
<style lang="less" scoped>
.messageBoxCon {
    /deep/.el-dialog {
        width: 300px !important;
    }
    span {
        font-size: 13px !important;
        line-height: 20px;
    }
    img {
        width: 100%;
        height: 150px;
    }
}
</style>
