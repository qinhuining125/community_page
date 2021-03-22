<template>
    <div class="subMenu">
        <h6
            :class="['homeShrinkBtn', isShrink ? 'active' : '']"
            @click="homeShrinkBtn"
        >
            <i class="iconfont iconNMStubiao- color_blue"></i>
        </h6>
        <ul>
            <li
                v-for="(item, idx) in subMenu"
                :key="item.name"
                :class="isActiveSubMenu == idx ? 'active' : ''"
                @click="subMenuChange(item, idx)"
            >
                <i :class="item.icon"></i>
                <h6>{{ item.name }}</h6>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "subMenu",
    props: ["isActiveSubMenu", "isShrink"],
    data() {
        return {
            subMenu: [
                {
                    name: "安防",
                    icon: "iconfont iconjiankong color_red"
                },
                {
                    name: "资产",
                    icon: "iconfont iconzichan color_blue"
                },
                {
                    name: "人员",
                    icon: "iconfont iconrenyuan-shi color_navy_blue"
                },
                {
                    name: "异常",
                    icon: "iconfont iconyichang color_red"
                }
            ]
        };
    },
    methods: {
        // 点击首页栏目收缩隐藏(事件在父级执行--index.vue)
        homeShrinkBtn() {
            this.$emit("homeShrinkBtn");
        },
        // 点击子导航栏(事件在父级执行--index.vue)
        subMenuChange(i, idx) {
            this.$emit("subMenuChange", i, idx);
        }
    }
};
</script>

<style lang="less" scoped>
.subMenu {
    .homeShrinkBtn {
        min-height: 0.36rem;
        line-height: 0.36rem;
        padding: 0.05rem;
    }
    .homeShrinkBtn,
    ul li {
        position: relative;
        text-align: center;
        font-size: 0.18rem;
        cursor: pointer;
        min-width: 0.36rem;
        padding: 0.02rem 0.05rem;
        // height: 0.36rem;
        margin-bottom: 0.15rem;
        border-radius: 4px;
        // border: 1px solid #7df1fe;
        background: rgba(2, 18, 51, 0.6);
        color: #fff;
        text-align: center;
        h6 {
            font-size: 0.14rem;
        }
        .iconfont {
            font-size: 0.18rem;
        }
    }
    .homeShrinkBtn.active,
    .homeShrinkBtn:hover,
    li.active,
    li:hover {
        background: rgba(43, 62, 95, 1);
    }
}
</style>
