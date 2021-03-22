<template>
    <!-- 闸机弹框 -->
    <div class="gate-tips">
        <div class="bg-top-line"></div>
        <div class="title-line">
            <span v-if="currentIndex == 0" class="title">{{
                cPeoInto.SBMC
            }}</span>
            <span v-else class="title">{{ cPeoOut.SBMC }}</span>
            <span class="close-btn" @click="closeBtn"
                ><i class="iconfont iconguanbi"></i
            ></span>
        </div>

        <div class="content">
            <!-- swiper -->
            <el-carousel :interval="5000" arrow="always">
                <el-carousel-item v-for="item in 2" :key="item">
                    <!-- <h3>{{ item }}</h3> -->
                    <h3>
                        <div class="swiper">
                            <div class="img-pos">
                                <img
                                    class="img-size"
                                    src="../../assets/images/video_img1.png"
                                    alt=""
                                />
                            </div>

                            <div class="info-mess">
                                <!-- <span class="">进入</span> -->
                                <p class="line-height">
                                    <span class="color-blue">姓名：</span>
                                    <span
                                        v-if="currentIndex == 0"
                                        class="ma-left"
                                        >{{ cPeoInto.XM }}</span
                                    >
                                    <span v-else class="ma-left">{{
                                        cPeoOut.XM
                                    }}</span>
                                </p>
                                <p class="line-height">
                                    <span class="color-blue">抓拍时间：</span>

                                    <span
                                        v-if="currentIndex == 0"
                                        class="ma-left"
                                        >{{ cPeoInto.JCSJ }}</span
                                    >
                                    <span v-else class="ma-left">{{
                                        cPeoOut.JCSJ
                                    }}</span>
                                </p>
                                <p class="line-height">
                                    <span class="color-blue">抓拍位置：</span>
                                    <span
                                        v-if="currentIndex == 0"
                                        class="ma-left"
                                        >{{ cPeoInto.SBMC }}</span
                                    >
                                    <span v-else class="ma-left">{{
                                        cPeoOut.SBMC
                                    }}</span>
                                </p>
                                <p class="line-height">
                                    <span class="color-blue">住址：</span>
                                    <span
                                        v-if="currentIndex == 0"
                                        class="ma-left"
                                        >{{ cPeoInto.ZZ }}</span
                                    >
                                    <span v-else class="ma-left">{{
                                        cPeoOut.ZZ
                                    }}</span>
                                </p>
                                <p class="line-height">
                                    <span class="color_blue">标签：</span>
                                    <span class="ma-left"></span>
                                </p>
                            </div>
                        </div>
                    </h3>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
export default {
    name: "gateTips",
    props: ["cPeoInto", "cPeoOut", "currentIndex"],
    methods: {
        closeBtn() {
            this.$emit("closeTips");
        }
    }
};
</script>

<style lang="less" scoped>
.gate-tips {
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
    margin: 0 0.3vw;
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

/deep/.el-carousel__item h3 {
    color: #475669;
    font-size: 0.18rem;
    opacity: 0.75;
    // line-height: 300px;
    margin: 0;
    padding: 0.1rem 0.25rem 0.1rem 0.25rem;
}

/deep/.el-carousel__item:nth-child(2n) {
    // background-color: #99a9bf;
}
/deep/.el-carousel__item:nth-child(2n + 1) {
    // background-color: #d3dce6;
}
/deep/.el-carousel__indicator--horizontal {
    display: none;
}
/deep/.el-carousel__arrow {
    top: 48%;
}
/deep/.el-carousel__arrow--left {
    left: -4px;
}
/deep/.el-carousel__arrow--right {
    right: -8px;
}
/deep/.el-icon-arrow-right {
    width: 1.7vw;
    height: 3vh;
    background: url("../../assets/images/swiperRightBtn.png") no-repeat;
    background-size: 100% 100%;
}
/deep/.el-icon-arrow-left {
    width: 1.7vw;
    height: 3vh;
    background: url("../../assets/images/swiperLeftBtn.png") no-repeat;
    background-size: 100% 100%;
}
/deep/.el-icon-arrow-right:before,
/deep/.el-icon-arrow-left:before {
    content: none;
}
.img-size {
    width: 8vw;
    height: 15vh;
}
.swiper {
    width: 100%;
}
.img-pos {
    display: inline-block;
}
.info-mess {
    width: 45%;
    margin-left: 10px;
    top: -5px;
    display: inline-block;
    position: relative;
}
.line-height {
    font-size: 0.12rem;
    line-height: 0.2rem;
}
.color-blue {
    color: #62e8c7;
}
.ma-left {
    margin-left: 0.52vw;
    color: #fff;
}
/deep/.el-carousel__container {
    height: 1.6rem;
}
</style>