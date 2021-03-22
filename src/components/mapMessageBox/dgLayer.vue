<template>
    <div class="messageBox">
        <div class="title">
            道杆信息
            <i class="closeBtn iconfont iconguanbi" @click="closeMessgeBtn"></i>
        </div>
        <div class="content">
            <el-carousel :interval="5000" arrow="always">
                <el-carousel-item v-for="(item, idx) in resultData" :key="idx">
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
                                <span class="color_blue">车主：</span>
                                <span class="right-txt">
                                    {{ item.XM }}
                                </span>
                            </p>
                            <p class="line-height">
                                <span class="color_blue">车牌号：</span>
                                <span class="right-txt">
                                    {{ item.CPH }}
                                </span>
                            </p>
                            <p class="line-height">
                                <span class="color_blue">车型：</span>
                                <span class="right-txt">{{ item.CX }}</span>
                            </p>
                            <p class="line-height">
                                <span class="color_blue">抓拍时间：</span>
                                <span class="right-txt">
                                    {{ item.JCSJ }}
                                </span>
                            </p>
                            <p class="line-height">
                                <span class="color_blue">抓拍位置：</span>
                                <span class="right-txt">
                                    {{ item.SBMC }}
                                </span>
                            </p>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
export default {
    // props: ["resultData"],
    data() {
        return {
            title: "",
            resultData: [
                {
                    XM: "空户",
                    CPH: "鄂A.S4356",
                    CX: "小型",
                    JCSJ: "2020年5月14日15:39:51",
                    SBMC: "北门入口",
                    id: 1,
                },
                {
                    XM: "朱建勋",
                    CPH: "鄂A.D4344",
                    CX: "小型",
                    JCSJ: "2020年5月14日15:39:51",
                    SBMC: "北门入口",
                    id: 1,
                },
            ],
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
    .gate-tips {
        width: 4rem;
        height: auto;
        background: url("../../assets/images/transparentBackground_h.png") left
            top repeat-x;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-size: 100% 100%;
        box-sizing: border-box;
        padding: 0.06rem;
        border-radius: 4px;
    }
    .content {
        padding: 10px;
    }
    .content-text {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 0.72vw;
        line-height: 4vh;
    }
    .img-size {
        width: 150px;
        height: 130px;
    }
    .swiper {
        width: 100%;
        display: flex;
        align-items: center;
    }
    .info-mess {
        // width: 45%;
        padding: 0 10px;
        position: relative;
        span {
            line-height: 22px;
        }
    }
    .color-blue {
        color: #62e8c7;
    }
    .right-txt {
        color: #fff;
    }
    // 隐藏横向滚动器
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

    /deep/.el-carousel__container {
        min-height: 130px;
        height: auto !important;
    }
}
</style>
