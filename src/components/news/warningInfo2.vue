<template>
    <div class="rightContent publicStyle_bg" ref="warnInfoContent">
        <span class="publicStyle_line"></span>
        <h2 class="publicStyle_title">告警信息</h2>
        <div class="content">
            <ul
                ref="warnInfoList"
                :class="{ anim: animate }"
                @mouseenter="stop()"
                @mouseleave="up()"
            >
                <li
                    v-for="(item, index) in warnInfo"
                    :key="index"
                    @click="warnInfoRow(item)"
                >
                    <!-- <p>{{ item.message }}</p> -->
                    <p>
                        <span class="txt">{{ item.ycnr }}</span>
                        <span class="time">【{{ item.ycsj }}】</span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    name: "rightContent",
    data() {
        return {
            animate: false,
            intNum: undefined,
            warnInfo: [
                {
                    name: "翰林小区",
                    message:
                        "翰林小区保安态度真好，态度不错保安态度真好，态度不错,保安态度真好，态度不错保安态度真好，态度不错",
                    title: "标题1",
                    time: "2020 - 12 - 31",
                    sbmc: "烟感",
                    wz: "小区三栋二单元",
                },
                {
                    name: "翰林小区",
                    message:
                        "翰林小区保安态度真好，态度不错,保安态度真好，态度不错，保安态度真好，态度不错，保安态度真好，态度不错",
                    title: "标题2",
                    time: "2020 - 12 - 31",
                    sbmc: "闸机",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错电放费",
                    title: "标题3",
                    time: "2020 - 12 - 31",
                    sbmc: "水表",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错方法",
                    title: "标题4",
                    time: "2020 - 12 - 31",
                    sbmc: "井盖",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题5",
                    time: "2020 - 12 - 31",
                    sbmc: "闸机",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题6",
                    time: "2020 - 12 - 31",
                    sbmc: "闸机",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题7",
                    time: "2020 - 12 - 31",
                    sbmc: "闸机",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题8",
                    time: "2020 - 12 - 31",
                    sbmc: "闸机",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题9",
                    time: "2020 - 12 - 31",
                    sbmc: "闸机",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题10",
                    time: "2020 - 12 - 31",
                    sbmc: "闸机",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题11",
                    time: "2020 - 12 - 31",
                    sbmc: "闸机",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题12",
                    time: "2020 - 12 - 31",
                    sbmc: "闸机",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题13",
                    time: "2020 - 12 - 31",
                    sbmc: "闸机",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题14",
                    time: "2020 - 12 - 31",
                    sbmc: "闸机",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题15",
                    time: "2020 - 12 - 31",
                    sbmc: "闸机",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题16",
                    time: "2020 - 12 - 31",
                    sbmc: "水表",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题17",
                    time: "2020 - 12 - 31",
                    sbmc: "水表",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题18",
                    time: "2020 - 12 - 31",
                    sbmc: "水表",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题19",
                    time: "2020 - 12 - 31",
                    sbmc: "水表",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题20",
                    time: "2020 - 12 - 31",
                    sbmc: "水表",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题21",
                    time: "2020 - 12 - 31",
                    sbmc: "井盖",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题22",
                    time: "2020 - 12 - 31",
                    sbmc: "井盖",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题23",
                    time: "2020 - 12 - 31",
                    sbmc: "井盖",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题24",
                    time: "2020 - 12 - 31",
                    sbmc: "井盖",
                    wz: "小区二栋一单元",
                },
                {
                    name: "翰林小区",
                    message: "翰林小区保安态度真好，态度不错",
                    title: "标题25",
                    time: "2020 - 12 - 31",
                    sbmc: "井盖",
                    wz: "小区二栋一单元",
                },
            ],
            type: 7,
        };
    },
    created() {
        this.getWarningInfo();
        this.scrollUp();
    },
    watch: {
        // 监听右侧内容是否显示
        isInfoShow: {
            handler: function (newName) {
                // if (newName) {
                //     // 获取右边内容盒子的高度
                //     let warnInfoContentHeight = this.$refs.warnInfoContent
                //         .offsetHeight;
                //     // 获取列表的高度
                //     let warnInfoListHeight = this.$refs.warnInfoList
                //         .offsetHeight;
                //     // 如果内容高度大于盒子高度则启动滚动效果
                //     if (warnInfoContentHeight > warnInfoListHeight) {
                //         this.stop();
                //     } else {
                //         this.up();
                //     }
                // }
            },
            deep: true,
            // immediate: true
        },
    },
    mounted() {},
    computed: {
        ...mapState({
            isInfoShow: (state) => state.app.isInfoShow,
        }),
    },
    methods: {
        scrollUp() {
            this.intNum = setInterval(() => {
                this.animate = true; // 向上滚动的时候需要添加css3过渡动画
                setTimeout(() => {
                    this.warnInfo.push(this.warnInfo[0]); // 将数组的第一个元素添加到数组的
                    this.warnInfo.shift(); //删除数组的第一个元素
                    this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
                }, 500);
            }, 2000);
        },
        //鼠标移上去停止
        stop() {
            clearInterval(this.intNum);
        },
        //鼠标移出开始
        up() {
            this.scrollUp();
        },
        // 点击列表事件
        warnInfoRow(i) {
            this.$emit("warnInfoRow", i);
        },
        // 获取告警信息列表
        async getWarningInfo() {
            const res = await this.$Http.searZhsqListByType({
                type: this.type,
            });
            this.warnInfo = res.rows;
            console.log(res);
        },
    },
};
</script>

<style lang="less" scoped>
.rightContent {
    width: 100%;
    height: 90%;
    max-height: 90%;
    min-height: 30%;
    .content {
        overflow: hidden;
        padding: 0 0.1rem 0.2rem 0.1rem;
        .title {
            text-align: left;
            padding: 0.1rem;
            letter-spacing: 2px;
            color: #fff;
            font-size: 0.18rem;
        }

        .anim {
            transition: all 0.5s;
            margin-top: -0.36rem;
        }
        ul {
            // max-height: 85vh;
            // min-height: 20vh;
            overflow: hidden;
            li {
                position: relative;
                height: 0.36rem;
                line-height: 0.36rem;
                font-size: 0.16rem;
                cursor: pointer;
                p {
                    display: flex;
                    // padding-right: 1.4rem;
                }
                .txt {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    display: block;
                    flex: 2;
                }
                .color-red {
                    color: #f17774;
                    margin-right: 0.2rem;
                }
                .time {
                    padding-left: 0.1rem;
                    flex: 1;
                    white-space: nowrap;
                    // position: absolute;
                    // right: 0;
                    // top: 0;
                }
            }
        }
    }
}
</style>
