<template>
    <div class="publicStyle_bg right-info">
        <span class="close-btn" @click="rightCloseBtn"
            ><i class="iconfont iconguanbi"></i
        ></span>
        <span class="publicStyle_line"></span>
        <h2 class="publicStyle_title">{{ title }}</h2>
        <!-- 选项卡 -->
        <div class="tab-card">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="出口入口" name="first">
                    <ul>
                        <li v-for="(item, index) in video1" :key="index">
                            <div class="time-info">
                                <span>{{ item.vid }}</span>
                                <span>{{ item.times }}</span>
                            </div>
                            <img class="img-size" :src="item.imgs" alt="" />
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="重点区域" name="second"
                    ><ul>
                        <li v-for="(item, index) in video2" :key="index">
                            <div class="time-info">
                                <span>{{ item.vid }}</span>
                                <span>{{ item.times }}</span>
                            </div>
                            <img class="img-size" :src="item.imgs" alt="" />
                        </li></ul
                ></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "rightInfo",
    // props: ["title"],
    components: {},
    data() {
        return {
            title: "视频监控",
            activeName: "first",
            video1: [
                {
                    vid: "小区一号监控摄像",
                    times: "2020/02/24 15:24:12",
                    imgs: require("../../assets/images/video_img1.png")
                },
                {
                    vid: "小区一号监控摄像",
                    times: "2020/02/24 15:24:12",
                    imgs: require("../../assets/images/video_img1.png")
                },
                {
                    vid: "小区一号监控摄像",
                    times: "2020/02/24 15:24:12",
                    imgs: require("../../assets/images/video_img1.png")
                },
                {
                    vid: "小区一号监控摄像",
                    times: "2020/02/24 15:24:12",
                    imgs: require("../../assets/images/video_img1.png")
                },
                {
                    vid: "小区一号监控摄像",
                    times: "2020/02/24 15:24:12",
                    imgs: require("../../assets/images/video_img1.png")
                }
            ],
            video2: [
                {
                    vid: "小区二号监控摄像",
                    times: "2020/02/24 15:24:12",
                    imgs: require("../../assets/images/video_img2.png")
                },
                {
                    vid: "小区二号监控摄像",
                    times: "2020/02/24 15:24:12",
                    imgs: require("../../assets/images/video_img2.png")
                },
                {
                    vid: "小区二号监控摄像",
                    times: "2020/02/24 15:24:12",
                    imgs: require("../../assets/images/video_img2.png")
                },
                {
                    vid: "小区二号监控摄像",
                    times: "2020/02/24 15:24:12",
                    imgs: require("../../assets/images/video_img2.png")
                },
                {
                    vid: "小区二号监控摄像",
                    times: "2020/02/24 15:24:12",
                    imgs: require("../../assets/images/video_img2.png")
                }
            ]
        };
    },
    watch: {},
    computed: {},
    methods: {
        ...mapActions(["SETIsSubPageListShow", "SETMapToolbarIsActive"]),
        rightCloseBtn() {
            this.SETIsSubPageListShow(false);
            this.SETMapToolbarIsActive(false);
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
    created() {},
    mounted() {}
};
</script>
<style lang="less" scoped>
.right-info {
}
.close-btn {
    position: absolute;
    right: 0.1rem;
    top: 0.1rem;
    cursor: pointer;
    color: #fff;
    font-size: 0.18rem;
}
.tab-card {
    padding: 0.1rem;
}
/deep/.el-tabs__nav {
    display: flex;
    float: none;
}
/deep/.el-tabs__active-bar {
    background-color: #2ec7d7;
}

/deep/.el-tabs__item {
    color: #fff;
    padding: 0;
    display: block;
    flex: 1;
    text-align: center;
}
ul {
    height: 74vh;
    padding-right: 0.52vw;
    overflow-y: auto;
}
li {
    position: relative;
    margin-bottom: 0.82vh;
}
.img-size {
    width: 100%;
}
.time-info {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    color: #fff;
    font-size: 0.72vw;
    line-height: 2.8vh;
    background: rgba(29, 30, 36, 0.6);
}
</style>
