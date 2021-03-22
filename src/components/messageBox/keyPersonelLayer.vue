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
        <div class="personelInfo pr">
            <el-button
                size="medium"
                type="primary"
                class="btn pa"
                v-if="wristbandInfo.flag"
                @click="getPersonShInfo(tableRowData.jmid)"
                >指标监测</el-button
            >
            <img class="img" src="../../assets/images/personImg.jpg" alt="" />
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
                    <span></span>{{ tableRowData.mz }}
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">年龄：</span>
                    <span></span>{{ tableRowData.nl }}
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">电话：</span>
                    <span></span>{{ tableRowData.pnone }}
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">标签：</span>
                    <span></span>{{ tableRowData.label }}
                </el-col>
                <el-col
                    :span="24"
                    :class="wristbandInfo.flag ? 'border_b' : ''"
                >
                    <span class="color_blue">居住地址：</span>
                    <span>{{ tableRowData.zz }}</span>
                </el-col>
                <section v-if="wristbandInfo.flag">
                    <el-col :span="12">
                        <span class="color_blue">体温：</span>
                        <span>{{ wristbandInfo.shxx.temperature }}</span>
                    </el-col>
                    <el-col :span="12">
                        <span class="color_blue">心率：</span>
                        <span>{{ wristbandInfo.shxx.heartRate }}</span>
                    </el-col>
                    <el-col :span="12">
                        <span class="color_blue">血压(高压)：</span>
                        <span>{{ wristbandInfo.shxx.high }}</span>
                    </el-col>
                    <el-col :span="12">
                        <span class="color_blue">血压(低压)：</span>
                        <span>{{ wristbandInfo.shxx.low }}</span>
                    </el-col>
                    <el-col :span="24">
                        <span class="color_blue">时间：</span>
                        <span>{{ wristbandInfo.shxx.createTime }}</span>
                    </el-col>
                    <el-col :span="12">
                        <span class="color_blue">电量：</span>
                        <span v-if="wristbandInfo.shxx.battery == 1">有电</span>
                        <span v-else>没电</span>
                    </el-col>
                    <!-- <el-col :span="12">
                        <span class="color_blue">步数：</span>
                        <span>0</span>
                    </el-col> -->
                    <el-col :span="24">
                        <span class="color_blue">定位：</span>
                        <span
                            >{{ wristbandInfo.shxx.nodeBLat }},{{
                                wristbandInfo.shxx.nodeBLng
                            }}</span
                        >
                    </el-col>
                    <el-col :span="12">
                        <span class="color_blue">报警类型：</span>
                        <span>{{ wristbandInfo.shxx.alarmState }}</span>
                    </el-col>
                    <!-- <el-col :span="24">
                        <span class="color_blue">报警定位：</span>
                        <span>用户可能摔倒了，请尽快确认！</span>
                    </el-col> -->
                    <el-col :span="24">
                        <span class="color_blue">报警内容：</span>
                        <span>{{ wristbandInfo.shxx.alarmContent }}</span>
                    </el-col>
                    <el-col :span="24">
                        <span class="color_blue">报警时间：</span>
                        <span>{{ wristbandInfo.shxx.updateTime }}</span>
                    </el-col>
                </section>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    /*
    tableRowData 当前点击表格的信息
    massageTitle 标题
    wristbandInfo 获取手环信息
    */
    props: ["tableRowData", "massageTitle", "wristbandInfo"],
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
        // 点击指标监测，刷新数据
        getPersonShInfo(id) {
            this.$emit("getPersonShInfo", id);
        },
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
    .personelInfo {
        .border_b {
            border-bottom: 1px solid #626a5d;
        }
        .btn {
            left: 0;
            top: 120px;
            width: 70px;
            height: 24px;
            line-height: 24px;
            padding: 0;
            border: none;
            font-size: 13px;
            background: rgba(22, 217, 237, 0.6);
        }
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
