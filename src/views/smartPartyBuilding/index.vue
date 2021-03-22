<template>
    <div class="party-box">
        <left-party-info
            class="party-left-box"
            @currIndex="currIndex"
        ></left-party-info>

        <!-- 党员 -->
        <right-party-info
            v-if="isShow == 1"
            ref="rightPartyInfoRef"
            :class="[
                'party-right-box',
                'subPageRightCon',
                isPartyShow ? 'active' : '',
            ]"
        ></right-party-info>
        <!-- 党组织 -->
        <right-organ-info
            v-else
            ref="rightOrganInfoRef"
            :class="[
                'party-right-box',
                'subPageRightCon',
                isPartyShow ? 'active' : '',
            ]"
        ></right-organ-info>

        <bottom-party-info
            :class="[
                'party-bottom-info',
                'subPageBottonCon',
                isSubPageListShow || isInfoShow || isNewsInfo ? 'active' : '',
            ]"
        >
        </bottom-party-info>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import leftPartyInfo from "./leftPartyInfo"; // 左侧列表
import rightPartyInfo from "./rightPartyInfo"; // 党员列表
import rightOrganInfo from "./rightOrganInfo"; // 组织列表
import bottomPartyInfo from "./bottomPartyInfo"; // 底部图表
export default {
    name: "smartPartyBuilding",
    components: {
        leftPartyInfo,
        rightPartyInfo,
        rightOrganInfo,
        bottomPartyInfo,
    },
    data() {
        return {
            isShow: "", // 判断右侧列表显示哪个
        };
    },
    computed: {
        // 获取vuex的state值
        ...mapState({
            isPartyShow: (state) => state.app.isPartyShow,
            isSubPageListShow: (state) => state.app.isSubPageListShow,
            isInfoShow: (state) => state.app.isInfoShow,
            isNewsInfo: (state) => state.app.isNewsInfo, // 新闻公告
        }),
    },
    methods: {
        ...mapActions([
            "SETIsPartyShow",
            "SETIsSubPageListShow",
            "SETIsInfoShow",
        ]),
        currIndex(data, ind) {
            // console.log(data.name);
            this.isShow = ind;
            switch (data.name) {
                case "党组织":
                    this.$nextTick(() => {
                        this.$refs.rightOrganInfoRef.getOrganInfoFun(); // 执行子级列表请求事件
                    });
                    break;
                default:
                    this.$nextTick(() => {
                        this.$refs.rightPartyInfoRef.getPartyInfoFun(); // 执行子级列表请求事件
                    });
                    break;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.party-box {
    .party-left-box,
    .party-right-box {
        transition: all 0.3s ease-in-out;
        position: fixed;
    }
    color: #fff;
    .party-llft-box {
        top: 8.7vh;
        left: 0.5%;
        width: 18%;
        bottom: 1%;
    }
    .party-right-box {
        right: -18%;
        width: 18%;
    }
    .party-right-box.active {
        right: 0%;
    }
    .party-bottom-info {
        transition: all 0.3s ease-in-out;
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .party-bottom-info.active {
        right: 19%;
    }
}
</style>