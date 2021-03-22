<template>
    <div class="wrapper">
        <dl class="carNumberState">
            <dt>
                <el-row>
                    <el-col :span="12" class="left color_navy_blue">{{
                        title.name
                    }}</el-col>
                    <el-col :span="12" class="right txtR">
                        <span class="color_yellow">{{ title.state1 }}</span
                        >/{{ title.state2 }}
                    </el-col>
                </el-row>
            </dt>
            <dd
                :class="[isActive == idx ? 'active' : '']"
                v-for="(item, idx) in list"
                :key="idx"
                @click="stateChage(item, idx)"
            >
                <el-row>
                    <el-col :span="12" class="left">{{ item.name }}</el-col>
                    <el-col :span="12" class="right txtR">
                        <span class="color_yellow">{{ item.outerNumber }}</span
                        >/{{ item.enterNumber }}
                    </el-col>
                </el-row>
            </dd>
        </dl>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    props: ["list", "title"],
    components: {},
    data() {
        return {
            isActive: -1,
        };
    },
    watch: {},
    computed: {
        ...mapState({
            // 获取vuex state的变量
            isInfoShow: (state) => state.app.isInfoShow,
        }),
    },
    methods: {
        stateChage(item, idx) {
            this.isActive = idx;
            this.SETIsInfoShow(false); // 隐藏告警信息
            this.SETIsNewsInfo(false); // 隐藏新闻公告右侧列表
            this.SETIsSubPageListShow(true); // 右侧显示
            this.SETMapToolbarIsActive(true); // 地图控制按钮向右侧移动
            this.SETIsMessageBoxShow(false); // 关闭新闻公告弹框
            this.SETIsNewsMessageShow(false); // 关闭弹框
            this.$emit("stateChage", item, idx);
        },
        // 获取vuex的方法
        ...mapActions([
            "SETIsSubPageListShow",
            "SETMapToolbarIsActive",
            "SETIsInfoShow",
            "SETIsMessageBoxShow",
            "SETIsNewsInfo",
            "SETIsNewsMessageShow",
        ]),
    },
    created() {},
    mounted() {},
};
</script>
<style lang="less" scoped>
.wrapper {
    .carNumberState {
        padding: 0 0.1rem;
        font-size: 0.16rem;
        line-height: 0.32rem;
        dt {
            font-size: 0.16rem;
            margin-bottom: 0.1rem;
        }
        dd {
            padding-left: 0.1rem;
            cursor: pointer;
            font-size: 0.16rem;
            margin-bottom: 0.1rem;
            .right {
                font-family: "jixieziti";
                font-size: 0.22rem;
            }
        }
        dd.active,
        dd:hover {
            background: url(../assets/images/zhzl_txtBg_green_left.png) left
                no-repeat;
        }
    }
}
</style>
