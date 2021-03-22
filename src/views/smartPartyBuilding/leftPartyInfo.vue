<template>
    <div class="smartPartyBuilding bg subPageLeftCon">
        <span class="line"></span>
        <div class="icon-pos">
            <img src="../../assets/images/dydb_ico1.png" alt="" />
            <span class="font-color">党政队伍</span>
        </div>
        <ul>
            <li
                v-for="(item, index) in partyList"
                :key="index"
                @click="changeInfo(item, index)"
            >
                <span class="bg-hover">{{ item.name }}</span
                ><span class="col-num">{{ item.value }}</span>
            </li>
        </ul>

        <span class="line2"></span>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    name: "leftPartyInfo",
    data() {
        return {
            partyList: [
                // {
                //     name: "党组织",
                //     value: 10,
                // },
                // {
                //     name: "党员",
                //     value: 458,
                // },
            ],
        };
    },
    created() {
        this.getPartyYear();
        // this.getPartyPeople();
    },

    computed: {
        // 获取vuex的state值
        ...mapState({
            isPartyShow: (state) => state.app.isPartyShow,
            isSubPageListShow: (state) => state.app.isSubPageListShow,
            isInfoShow: (state) => state.app.isInfoShow,
            mapToolbarIsActive: (state) => state.app.mapToolbarIsActive,
        }),
    },

    methods: {
        //  请求后端党员党龄接口
        async getPartyYear() {
            const res = await this.$Http.partyYear();
            if (res.code == 0) {
                this.partyList = res.data.dzdw.map.block1;
            }
        },

        ...mapActions([
            "SETIsPartyShow",
            "SETIsSubPageListShow",
            "SETIsInfoShow",
            "SETMapToolbarIsActive",
            "SETIsNewsInfo",
            "SETIsNewsMessageShow",
        ]),
        // 列表点击事件
        changeInfo(item, index) {
            this.$emit("currIndex", item, index);

            this.SETIsInfoShow(false);
            this.SETIsPartyShow(true);
            this.SETMapToolbarIsActive(true);
            this.SETIsSubPageListShow(true);
            this.SETIsNewsInfo(false); // 隐藏新闻公告右侧列表
            this.SETIsNewsMessageShow(false); // 隐藏新闻公告弹框
        },
    },
};
</script>

<style lang="less" scoped>
.smartPartyBuilding {
    width: 10vw;
    // height: 18vh;
    color: #fff;
}
.bg {
    border-radius: 4px;
    background: url("../../assets/images/transparentBackground_h.png") left top
        repeat-x;
    background-size: 100% 100%;
    position: relative;
    padding: 0.06rem 0.1rem 0.06rem 0;
    box-sizing: border-box;
}

.line {
    top: -0.01rem;
    right: 0;
    left: 0;
    position: absolute;
    height: 0.02rem;
    background: url("../../assets/images/style_line.png") no-repeat;
    background-size: 100% 100%;
}
.line2 {
    bottom: -0.01rem;
    right: 0;
    left: 0;
    position: absolute;
    height: 0.02rem;
    background: url("../../assets/images/style_line.png") no-repeat;
    background-size: 100% 100%;
}

.icon-pos {
    width: 100%;
    overflow: hidden;
}
img {
    width: 2.6vw;
    display: inline-block;
    vertical-align: middle;
    margin-left: 0.1rem;
}
.font-color {
    line-height: 5.2vh;
    font-size: 0.72vw;
    color: #f2db77;
    float: right;
}
li {
    width: 100%;
    font-size: 0.72vw;
    // height: 0.4rem;
    line-height: 3.5vh;
    overflow: hidden;
}
.bg-hover {
    display: inline-block;
    width: 7vw;
}

.bg-hover:hover {
    background: url("../../assets/images/dj_txtBg_green_left.png") left
        no-repeat;
    background-size: 100% 100%;
}
li span:last-child {
    font-size: 1.2vw;
    font-family: "jixieziti";
    color: #22e6fc;
    vertical-align: top;
    float: right;
}
li span:first-child {
    color: #fff;
    padding-left: 0.1rem;
}
</style>
