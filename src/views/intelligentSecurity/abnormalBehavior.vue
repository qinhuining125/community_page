<template>
    <div class="abnormal-behavior subPageLeftCon">
        <ul :class="{ anim: animate }" @mouseenter="stop()" @mouseleave="up()">
            <li
                v-for="(item, index) in abnormalData"
                :key="index"
                @click="abnormalChange(item)"
            >
                <span class="font-color">[异常行为]</span>
                <span class="margin-right">{{ item.YCSJ }}</span>
                <span>{{ item.YCNR }}</span>
            </li>
        </ul>
        <!-- 异常行为弹框 -->
        <behavior-tips
            v-show="isTips"
            @closeTips="closeTips"
            :behaviorChange="objBehavior"
        ></behavior-tips>
    </div>
</template>

<script>
import behaviorTips from "../../components/tips/behaviorTips";
export default {
    name: "abnormalBehavior",
    components: {
        behaviorTips,
    },
    data() {
        return {
            info: {
                sqid: "SQ000001",
                xqid: "XQ000004",
            },
            isTips: false, //弹框显示隐藏
            objBehavior: "", //获取空弹框信息
            animate: false,
            intNum: undefined,
            abnormalData: [],
        };
    },
    watch: {},
    created() {
        this.scrollUp();
        this.getBehaviorList();
    },
    mounted() {},
    methods: {
        //  请求后端异常行为接口
        async getBehaviorList() {
            const res = await this.$Http.behaviorList(this.info);
            if (res.code == 0) {
                this.abnormalData = res.data;
            }
        },
        scrollUp() {
            this.intNum = setInterval(() => {
                this.animate = true; // 向上滚动的时候需要添加css3过渡动画
                setTimeout(() => {
                    this.abnormalData.push(this.abnormalData[0]); // 将数组的第一个元素添加到数组的
                    this.abnormalData.shift(); //删除数组的第一个元素
                    this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
                }, 100);
            }, 3000);
        },
        //鼠标移上去停止
        stop() {
            clearInterval(this.intNum);
        },
        //鼠标移出开始
        up() {
            this.scrollUp();
        },
        //关闭弹框
        closeTips() {
            this.isTips = false;
        },
        //点击每项实现每项的内容
        abnormalChange(item) {
            this.isTips = true;
            this.objBehavior = item;
        },
    },
};
</script>
<style lang="less" scoped>
.abnormal-behavior {
    position: fixed;
    z-index: 100;
    left: 0;
    bottom: 0;
    width: 26vw;
    height: 17vh;
    overflow: hidden;
}
ul {
    padding-top: 1vh;
    width: 26vw;
    height: 17vh;
}
li {
    cursor: pointer;
    border-radius: 2px;
    line-height: 3.5vh;
    height: 3.5vh;
    background: rgba(29, 30, 36, 0.6);
    font-size: 0.72vw;
    color: #fff;
    padding: 0 1vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0.05rem;
}
li:hover {
    background: rgba(43, 62, 95, 1);
}
li:last-child {
    margin-bottom: 0;
}
.anim {
    transition: all 0.1s;
    margin-top: -3.5vh;
}
.font-color {
    color: #fd8644;
    margin-right: 0.52vw;
}
.margin-right {
    margin-right: 0.2vw;
}
</style>
