<template>
    <ul class="subNav">
        <li
            :class="isActive == idx ? 'active' : ''"
            v-for="(item, idx) in subNavList"
            :key="idx"
            @click="subNavChage(idx, item)"
        >
            <i :class="item.ico"></i>
            {{ item.name }}
        </li>
    </ul>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    props: ["subNavList"],
    components: {},
    data() {
        return {
            isActive: 0
        };
    },
    watch: {},
    computed: {},
    methods: {
        ...mapActions(["SETIsMessageBoxShow"]),
        // 切换子导航
        subNavChage(idx, item) {
            this.SETIsMessageBoxShow(false); // 关闭弹出框
            this.isActive = idx;
            this.$emit("subNavChage", item);
        }
    },
    created() {},
    mounted() {}
};
</script>
<style lang="less" scoped>
.subNav {
    position: fixed;
    z-index: 1000;
    left: 50%;
    top: 13vh;
    display: flex;
    justify-content: space-between;
    min-width: 20%;
    transform: translateX(-50%);
    li {
        margin: 0 0.05rem;
        cursor: pointer;
        text-align: center;
        color: #fff;
        font-size: 0.16rem;
        padding: 0.05rem 0.1rem;
        background: url(../assets/images/zhzl_tabBg_gray.png) no-repeat;
        background-size: 100% 100%;
        i {
            font-size: 0.16rem;
            margin-right: 0.05rem;
        }
    }
    li.active,
    li:hover {
        background: url(../assets/images/zhzl_tabBg_active.png) no-repeat;
        background-size: 100% 100%;
    }
}
</style>
