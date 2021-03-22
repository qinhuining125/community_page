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
            <img
                class="img"
                :src="
                    tableRowData.xb == '女'
                        ? '/page-wutanyuan/static/img/personImg.jpg'
                        : '/page-wutanyuan/static/img/personImg_02.jpg'
                "
                alt=""
            />
            <el-row :gutter="10" class="txt">
                <el-col :span="12">
                    <span class="color_blue">姓名：</span>
                    <span>{{ tableRowData.xm }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">性别：</span>
                    <span>{{ tableRowData.xb }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">民族：</span>
                    <span>{{ tableRowData.mz }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">年龄：</span>
                    <span>{{ tableRowData.nl }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">电话：</span>
                    <span>{{ tableRowData.pnone }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">标签：</span>
                    <span>
                        <i
                            v-show="tableRowData.sfdj == '是'"
                            class="iconfont iconlaoren color_dj_yellow"
                            title="独居老人"
                        ></i>
                        <i
                            v-show="tableRowData.sfkc == '是'"
                            class="iconfont iconlaoren color_kc_red"
                            title="空巢老人"
                        ></i>
                        <i
                            v-show="tableRowData.sfxmsf == '是'"
                            class="iconfont iconxingmanshifangrenyuan color_xm_orange"
                            title="刑满释放人员"
                        ></i>
                        <i
                            v-show="tableRowData.sftyjr == '是'"
                            class="iconfont iconjunren color_tyjr_green"
                            title="退役军人"
                        ></i>
                        <i
                            v-show="tableRowData.sfdb == '是'"
                            class="iconfont iconren color_db_blue"
                            title="低保人员"
                        ></i>
                        <i
                            v-show="tableRowData.sfcj == '是'"
                            class="iconfont iconcanjiren color_cj_yellow"
                            title="残疾人员"
                        ></i>
                    </span>
                </el-col>
                <el-col :span="24">
                    <span class="color_blue">居住地址：</span>
                    <span>{{ tableRowData.zz }}</span>
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
