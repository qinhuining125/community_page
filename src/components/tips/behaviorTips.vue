<template>
    <div class="behavior-tips">
        <div class="bg-top-line"></div>
        <div class="title-line">
            <span class="title">{{ behaviorChange.YCLY }}</span>
            <span class="close-btn" @click="closeTips"
                ><i class="iconfont iconguanbi"></i
            ></span>
        </div>
        <div class="content">
            <el-row :gutter="10" class="txt">
                <el-col :span="24">
                    <span class="color_blue">异常内容：</span>
                    {{ behaviorChange.YCNR }}
                </el-col>
                <el-col :span="24">
                    <span class="color_blue">异常级别：</span>
                    <span
                        :class="[
                            behaviorChange.YCJB == '黄' ? 'color_yellow' : '',
                            behaviorChange.YCJB == '红' ? 'color-orange' : '',
                            behaviorChange.YCJB == '绿' ? 'color_green' : '',
                        ]"
                    >
                        <i class="iconfont iconbaojing ico"></i>
                        <!-- {{ behaviorChange.YCJB }} -->
                    </span>
                </el-col>
                <el-col :span="24">
                    <span class="color_blue">异常时间：</span>
                    {{ behaviorChange.YCSJ }}
                </el-col>
                <el-col :span="24">
                    <span class="color_blue">处置状态：</span>
                    {{ behaviorChange.CZZT }}
                </el-col>
                <!-- <img src="../../../assets/images/video_img1.png" alt="" /> -->
                <el-col :span="24" style="margin-top: 10px">
                    <img
                        class="imgs"
                        src="../../assets/images/video_img1.png"
                        alt=""
                    />
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "behaviorTips",

    props: ["behaviorChange"],
    data() {
        return {};
    },
    methods: {
        closeTips() {
            this.$emit("closeTips");
        },
    },
};
</script>
<style lang="less" scoped>
.behavior-tips {
    width: 4rem;
    height: auto;
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

.txt {
    flex: 1;
}
.color-orange {
    color: #ff7546;
}
.ico {
    line-height: 0.16rem;
    margin-right: 0.2vw;
    font-size: 0.14rem;
}
/deep/.el-col-24 {
    line-height: 0.2rem;
}
.imgs {
    width: 100%;
}
</style>
