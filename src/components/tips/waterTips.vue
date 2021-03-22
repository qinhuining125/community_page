<template>
    <div class="party-tips-info">
        <div class="bg-top-line"></div>
        <div class="title-line">
            <span class="title">水表信息</span>
            <span class="close-btn" @click="closeBtn"
                ><i class="iconfont iconguanbi"></i
            ></span>
        </div>
        <div class="content">
            <img src="../../assets/images/waterMeter.jpg" alt="" />
            <el-row :gutter="10" class="txt">
                <el-col :span="12">
                    <span class="color_blue">设备名称：</span>
                    <span>{{ cWaterObj.SBMC }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">设备状态：</span>
                    <span>{{ cWaterObj.SBZT }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">品牌名称：</span>
                    <span>{{ cWaterObj.PPMC }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">总用水量：</span>
                    <span>{{ cWaterObj.ZYSL }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">当月用水量：</span>
                    <span>{{ cWaterObj.DYYS }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">当日用水量：</span>
                    <span>{{ cWaterObj.DRYS }}</span>
                </el-col>
                <el-col :span="12">
                    <span class="color_blue">经度：</span>
                    <span>{{ cWaterObj.X }}</span>
                </el-col>
                <el-col :span="24">
                    <span class="color_blue">纬度：</span>
                    <span>{{ cWaterObj.Y }}</span>
                </el-col>
                <el-col :span="24">
                    <span class="color_blue">位置：</span>
                    <span>{{ cWaterObj.WZ }}</span>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "waterTips",
    props: ["cWaterObj"],
    data() {
        return {
            isShow: false,
        };
    },
    methods: {
        closeBtn() {
            this.$emit("closeTips");
        },
    },
};
</script>
<style lang="less" scoped>
.party-tips-info {
    width: 400px !important;
    height: auto;
    // height: 1.8rem;
    background: url("../../assets/images/transparentBackground_h.png") left top
        repeat-x;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 0.06rem;
    border-radius: 4px;
}
.bg-top-line {
    top: -0.01rem;
    width: 0.82rem;
    right: 0;
    left: 0;
    position: absolute;
    height: 0.03rem;
    background: url("../../assets/images/layerTitleStyle.png") no-repeat;
    background-size: 100% 100%;
}
.title-line {
    display: flex;
    justify-content: space-between;
    padding: 0 0.1rem;
    border-bottom: 1px solid #626a5d;
    line-height: 0.34rem;
}
.title {
    color: #70cebc;
}
.content {
    display: flex;
    padding: 0.92vh 0.52vw;
}

img {
    width: 100px;
    height: 120px;
    margin-right: 10px;
}
.txt {
    flex: 1;
    span {
        color: #fff;
        line-height: 24px;
    }
}
.close-btn {
    color: #fff;
    cursor: pointer;
}
</style>
