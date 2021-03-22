<template>
    <div class="party-tips-info">
        <div class="bg-top-line"></div>
        <div class="title-line">
            <span class="title">井盖信息</span>
            <span class="close-btn" @click="closeBtn"
                ><i class="iconfont iconguanbi"></i
            ></span>
        </div>
        <div class="content">
            <img src="../../assets/images/cover.jpg" alt="" />
            <el-row :gutter="10" class="txt">
                <el-col :span="24">
                    <span class="color_blue">设备名称：</span
                    >{{ cCoverObj.SBMC }}
                </el-col>
                <el-col :span="24">
                    <span class="color_blue">设备状态：</span
                    >{{ cCoverObj.SBZT }}
                </el-col>
                <el-col :span="24">
                    <span class="color_blue">品牌名称：</span
                    >{{ cCoverObj.PPMC }}
                </el-col>
                <el-col :span="24">
                    <span class="color_blue">经度：</span>{{ cCoverObj.X }}
                </el-col>
                <el-col :span="24">
                    <span class="color_blue">纬度：</span>{{ cCoverObj.Y }}
                </el-col>
                <el-col :span="24">
                    <span class="color_blue">位置：</span>{{ cCoverObj.WZ }}
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "coverTips",
    props: ["cCoverObj"],
    data() {
        return {
            isShow: false
        };
    },
    methods: {
        closeBtn() {
            this.$emit("closeTips");
        }
    }
};
</script>
<style lang="less" scoped>
.party-tips-info {
    width: 4rem;
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
    margin-right: 10px;
}
.txt {
    flex: 1;
}
</style>
