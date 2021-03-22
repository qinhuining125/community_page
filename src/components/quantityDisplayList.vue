<template>
    <div class="wrapper">
        <ul class="list">
            <li
                :class="[isActive == idx ? 'active' : '']"
                @click="getCount(item, idx)"
                v-for="(item, idx) in list"
                :key="idx"
            >
                <el-row>
                    <el-col :span="12" class="txt">{{ item.name }}</el-col>
                    <el-col :span="12" class="color_navy_blue number">{{
                        item.value
                    }}</el-col>
                </el-row>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    props: ["list"],
    components: {},
    data() {
        return {
            isActive: -1,
            newList: [],
        };
    },
    watch: {},
    computed: {
        ...mapState({
            // 获取vuex state的变量
            isInfoShow: (state) => state.app.isInfoShow, // 告警信息状态
        }),
    },
    methods: {
        getCount(item, idx) {
            this.isActive = idx;
            this.SETIsInfoShow(false); // 隐藏告警信息
            this.SETIsNewsInfo(false); // 隐藏新闻公告右侧列表
            this.SETIsSubPageListShow(true); // 子页面右侧内容显示
            this.SETMapToolbarIsActive(true); // 地图控制栏展开状态
            this.SETCurrentPage(1); // 设置默认分页为1
            this.SETIsMessageBoxShow(false); // 关闭弹出层
            this.SETIsNewsMessageShow(false); // 关闭新闻公告弹框
            this.$emit("getCount", item, idx); // 给父级传递执行的事件
        },
        // 获取vuex的方法
        ...mapActions([
            "SETIsSubPageListShow",
            "SETMapToolbarIsActive",
            "SETIsInfoShow",
            "SETCurrentPage",
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
    .list {
        padding: 0 0.1rem;
        line-height: 0.32rem;
        li {
            cursor: pointer;
            padding-left: 0.1rem;
            overflow: hidden;
        }
        li:hover,
        li.active {
            background: url(../assets/images/zhzl_txtBg_green_left.png) left
                no-repeat;
        }
        .txt {
            font-size: 0.16rem;
        }
        .number {
            font-family: "jixieziti";
            font-size: 0.2rem;
            text-align: right;
        }
    }
}
</style>
