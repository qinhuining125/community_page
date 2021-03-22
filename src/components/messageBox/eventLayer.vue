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
                <span class="color_blue">异常内容：</span>
                <span>{{ tableRowData.YCNR }}</span>
            </el-col>
            <el-col :span="24">
                <span class="color_blue">异常级别：</span>
                <span>
                    <i
                        class="iconfont iconbaojing1 color_red"
                        v-if="tableRowData.YCJB == '红'"
                    ></i>
                    <i
                        class="iconfont iconbaojing1 color_green"
                        v-else-if="tableRowData.YCJB == '绿'"
                    ></i>
                    <i class="iconfont iconbaojing1 color_yellow" v-else></i>
                    <!-- {{ tableRowData.YCJB }} -->
                </span>
            </el-col>
            <el-col :span="24">
                <span class="color_blue">异常时间：</span>
                <span>{{ tableRowData.YCSJ }}</span>
            </el-col>
            <el-col :span="24">
                <span class="color_blue">处置状态：</span>
                <span class="color_yellow">{{ tableRowData.CZZT }}</span>
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
        width: 350px !important;
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
