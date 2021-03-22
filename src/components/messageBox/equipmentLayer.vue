<template>
    <el-dialog
        class="messageBoxCon"
        :title="massageTitle"
        :visible.sync="dialogVisible"
        :modal="false"
        width="25%"
        :close-on-click-modal="false"
    >
        <el-row :gutter="10">
            <el-col :span="12">
                <span class="color_blue">位置：</span>{{ tableRowData.local }}
            </el-col>
            <el-col :span="12" class="txtR">
                <span class="color_blue">状态：</span>{{ tableRowData.state }}
            </el-col>
        </el-row>
        <div class="personelInfo mt_10">
            <img src="../../assets/images/cdz.jpg" alt="" />
            <el-row :gutter="10" class="txt">
                <el-col :span="24">
                    <span class="color_blue">剩余容量：</span
                    >{{ tableRowData.syrl }}
                </el-col>
                <el-col :span="24">
                    <span class="color_blue">单体电压：</span
                    >{{ tableRowData.dtdy }}
                </el-col>
                <el-col :span="24">
                    <span class="color_blue">温度：</span>{{ tableRowData.wd }}
                </el-col>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
export default {
    /*
    tableRowData 当前点击表格的信息
    massageTitle 标题
    */
    props: ["tableRowData", "massageTitle"],
    components: {},
    data() {
        return {
            dialogVisible: false
        };
    },
    mounted() {},
    watch: {},
    computed: {},
    methods: {}
};
</script>
<style lang="less" scoped>
.messageBoxCon {
    /deep/.el-dialog {
        min-width: 400px !important;
    }

    .personelInfo {
        display: flex;
        img {
            width: 160px;
            height: 120px;
            margin-right: 10px;
        }
        .txt {
            flex: 1;
        }
    }
}
</style>
