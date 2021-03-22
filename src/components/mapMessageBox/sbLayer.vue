<template>
    <div class="messageBox">
        <div class="title">
            水表信息
            <i class="closeBtn iconfont iconguanbi" @click="closeMessgeBtn"></i>
        </div>
        <div class="body sxtBody">
            <img src="../../assets/images/waterMeter.jpg" alt="" />
            <el-row :gutter="10" class="txt">
                <el-col :span="12">
                    <span class="color_blue">设备名称：</span>
                    <span>{{ resultData.SBMC }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">设备状态：</span>
                    <span>{{ resultData.SBZT }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">品牌名称：</span>
                    <span>{{ resultData.PPMC }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">总用水量：</span>
                    <span>{{ resultData.ZYSL }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">当月用水量：</span>
                    <span>{{ resultData.DYYS }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">当日用水量：</span>
                    <span>{{ resultData.DRYS }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">经度：</span>
                    <span>{{ resultData.X }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">纬度：</span>
                    <span>{{ resultData.Y }}</span>
                </el-col>
                <el-col :span="24">
                    <span class="color_blue">位置：</span>
                    <span>{{ resultData.WZ }}</span>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    // props: ["resultData"],
    data() {
        return {
            title: "",
            resultData: {
                DRYS: "0.8",
                DYYS: "15",
                PPMC: " ",
                SBMC: "水表04",
                SBZT: "在线",
                WZ: "5栋30层",
                X: "114.342538418",
                Y: "30.4772836935",
                Z: "84",
                ZYSL: "25",
                nums: 4,
            },
        };
    },
    mounted() {},
    methods: {
        closeMessgeBtn() {
            this.$mapView.clearLayerBoxFun(); // 清除弹框
        },
    },
};
</script>

<style lang="less" scoped>
.messageBox {
    width: 400px !important;
    background: rgba(29, 30, 36, 0.7);
    /deep/.video-js {
        width: 100%;
        height: 220px;
    }
    /deep/.video-js .vjs-big-play-button {
        border: none;
        left: 50%;
        top: 50%;
        margin-top: -20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        transform: translateX(-50%);
    }
    .title {
        padding: 10px;
        border-bottom: 1px solid #626a5d;
        position: relative;
        font-size: 16px;
        color: #70cebc;
        .closeBtn {
            position: absolute;
            right: 10px;
            top: 10px;
            color: #fff;
            cursor: pointer;
        }
    }
    .title:before {
        display: block;
        content: "";
        position: absolute;
        left: 0;
        top: -3px;
        width: 82px;
        height: 3px;
        background: url(../../assets/images/layerTitleStyle.png) no-repeat top
            left;
    }
    .sxtBody {
        padding: 10px;
        color: #fff;
        font-size: 14px;
        display: flex;
        img {
            width: 100px;
            height: 120px;
            margin-right: 10px;
        }
        .txt {
            flex: 1;
            font-size: 12px;
            line-height: 24px;
            color: #fff;
        }
    }
}
</style>
