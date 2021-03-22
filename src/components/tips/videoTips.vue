<template>
    <!-- 摄像头弹框 -->
    <div class="video-tips" v-show="isShow">
        <div class="bg-top-line"></div>
        <div class="title-line">
            <span v-if="activeModel == 0" class="title">{{
                intoChange.SBMC
            }}</span>
            <span v-else class="title">{{ areaChange.SBMC }}</span>
            <span class="close-btn" @click="closeBtn"
                ><i class="iconfont iconguanbi"></i
            ></span>
        </div>
        <div class="content">
            <div class="content-text">
                <div class="">
                    <span class="color-blue">位置:</span>
                    <span v-if="activeModel == 0" class="ma-left">{{
                        intoChange.WZ
                    }}</span>
                    <span v-else class="ma-left">{{ areaChange.WZ }}</span>
                </div>
                <div class="">
                    <span class="color-blue">状态:</span>
                    <span v-if="activeModel == 0" class="ma-left">{{
                        intoChange.SBZT
                    }}</span>
                    <span v-else class="ma-left">{{ areaChange.SBZT }}</span>
                </div>
            </div>
            <div class="camera-img">
                <img src="../../assets/images/video_img1.png" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "videoTips",
    props: ["activeModel", "intoChange", "areaChange"],
    data() {
        return {
            isShow: "true"
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
.video-tips {
    width: 4rem;
    height: auto;
    // height: 300px;
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
    margin: 0 0.52vw;
}
.content-text {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 0.72vw;
    line-height: 4vh;
}
.color-blue {
    color: #62e8c7;
}
.ma-left {
    margin-left: 0.52vw;
}
img {
    width: 100%;
}
</style>