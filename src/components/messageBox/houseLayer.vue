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
        <div class="hoseLayer">
            <ul>
                <li
                    class="personelInfo"
                    v-for="item in tableRowData"
                    :key="item.jmid"
                >
                    <img
                        class="img"
                        src="../../assets/images/personImg.jpg"
                        alt=""
                    />
                    <el-row :gutter="10" class="txt">
                        <el-col :span="12">
                            <span>姓名：{{ item.xm }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span>性别：{{ item.xb }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span>民族：{{ item.mz }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span>年龄：{{ item.nl }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span>是否房主：{{ item.sffz }}</span>
                        </el-col>
                        <el-col :span="24">
                            <span>电话：{{ item.phone }}</span>
                        </el-col>
                        <el-col :span="24">
                            <span
                                >标签：
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
                                ></i>
                            </span>
                        </el-col>
                    </el-row>
                </li>
            </ul>
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
    props: ["tableRowData", "massageTitle"],
    components: {},
    data() {
        return {
            personelInfo: [
                {
                    id: "1",
                    name: "王淑芹",
                    sex: "女",
                    age: 30,
                    label: "",
                    master: "是",
                    nation: "汉族",
                    type: "person",
                    phone: "15601310131",
                },
                {
                    id: "2",
                    name: "王淑芹",
                    sex: "女",
                    age: 30,
                    label: "",
                    master: "是",
                    nation: "汉族",
                    type: "person",
                    phone: "15601310131",
                },
            ],
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
        min-width: 400px !important;
    }
    .hoseLayer {
        max-height: 250px;
        overflow-y: auto;
        ul {
            .personelInfo {
                font-size: 12px;
                padding: 10px;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                margin-bottom: 10px;
                min-height: 100px;
                background: url(../../assets/images/ResidenceDetailListGg.png)
                    no-repeat;
                background-size: 100% 100%;
                display: flex;
                img {
                    width: 70px;
                    height: 80px;
                    margin-right: 10px;
                }
                .txt {
                    flex: 1;
                }
            }
        }
    }
}
</style>
