<template>
    <ul class="nav-bar">
        <li
            :class="isActive == index ? 'active' : ''"
            v-for="(item, index) in navList"
            :key="index"
            @click="navChange(index, item)"
        >
            <i :class="item.ico"></i>
            {{ item.title }}
        </li>
    </ul>
</template>

<script>
export default {
    name: "navBar",
    components: {},
    data() {
        return {
            isActive: -1,
            navList: [
                {
                    title: "视频",
                    ico: "iconfont iconjiankong"
                },
                // {
                //     title: "门禁",
                //     ico: "iconfont icondalou"
                // },
                {
                    title: "闸机",
                    ico: "iconfont iconcheliangzhaji"
                },
                // {
                //     title: "道杆",
                //     ico: "iconfont iconshebei"
                // },
                {
                    title: "烟感",
                    ico: "iconfont iconyanwubaojingqi"
                },
                {
                    title: "水表",
                    ico: "iconfont iconshuibiao"
                },
                {
                    title: "井盖",
                    ico: "iconfont iconjinggai"
                }
                // {
                //     title: "电表",
                //     ico: "iconfont iconshebei"
                // }
            ]
        };
    },
    watch: {},
    computed: {},
    methods: {
        // 切换子导航
        navChange(index, item) {
            this.isActive = index;
            this.$emit("navChange", index, item);
        }
    },
    created() {},
    mounted() {}
};
</script>
<style lang="less" scoped>
.nav-bar {
    position: fixed;
    z-index: 1000;
    left: 50%;
    top: 13vh;
    display: flex;
    justify-content: space-between;
    width: 24%;
    transform: translateX(-50%);
    li {
        cursor: pointer;
        text-align: center;
        color: #fff;
        line-height: 0.3rem;
        font-size: 0.16rem;
        padding: 0 0.1rem;
        background: url(../../assets/images/zhzl_tabBg_gray.png) no-repeat;

        background-size: 100% 100%;
        i {
            font-size: 0.16rem;
            margin-right: 0.05rem;
        }
    }
    li.active,
    li:hover {
        background: url(../../assets/images/zhzl_tabBg_active.png) no-repeat;
        background-size: 100% 100%;
    }
}
</style>
