<template>
    <div class="newsAnnouncement pr">
        <div class="pa news-title">
            <i class="iconfont icontongzhi color_yellow"></i>
            <span class="color_blue" @click="newTitleFun">新闻公告：</span>
        </div>
        <el-carousel direction="vertical">
            <el-carousel-item v-for="item in newsList" :key="item.noticeId">
                <p class="medium" @click="newsListRow(item)">
                    {{ item.noticeTitle }}
                </p>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            // 新闻公告列表
            newsList: [
                // {
                //     searchValue: null,
                //     createBy: null,
                //     createByid: null,
                //     createTime: null,
                //     updateBy: null,
                //     updateByid: null,
                //     updateTime: null,
                //     remark: null,
                //     params: {},
                //     noticeId: "1",
                //     noticeTitle: "温馨提醒：2018-07-01 新版本发布啦",
                //     noticeType: "2",
                //     noticeContent: null,
                //     status: null,
                // },
            ],
        };
    },
    mounted() {
        this.getNoticeList(); // 获取通知公告列表
    },
    computed: {
        // 获取vuex的state值
        ...mapState({
            isNewsInfo: (state) => state.app.isNewsInfo, // 新闻公告
            mapToolbarIsActive: (state) => state.app.mapToolbarIsActive, // 地图控制菜单
            isInfoShow: (state) => state.app.isInfoShow, //
            isSubPageListShow: (state) => state.app.isSubPageListShow,
        }),
    },
    methods: {
        // 设置vuex的方法
        ...mapActions([
            "SETIsNewsInfo",
            "SETMapToolbarIsActive",
            "SETIsInfoShow",
            "SETIsSubPageListShow",
            "SETIsPartyShow",
            "SETIsMessageBoxShow",
            "SETIsNewsMessageShow",
        ]),
        // 点击新闻公告标题
        newTitleFun() {
            this.SETIsSubPageListShow(false); // 判断如果告警信息显示就隐藏
            this.SETIsInfoShow(false); // 判断如果子页面右侧内容显示就隐藏
            this.SETMapToolbarIsActive(true); // 地图控制栏展开状态
            this.SETIsNewsInfo(true); // 右侧新闻公告显示
            this.SETIsPartyShow(false); //智慧党建右侧内容关闭
            this.SETIsMessageBoxShow(false); // 关闭弹框
            this.SETIsNewsMessageShow(false); // 关闭新闻公告弹框
            this.$emit("newTitleFun");
        },
        // 列表点击事件
        newsListRow(i) {
            this.$emit("newsListRow", i);
        },
        // 获取新闻公告
        async getNoticeList() {
            const res = await this.$Http.noticeList();
            if (res.code == 0) {
                this.newsList = res.rows; // 列表赋值
                // console.log(res, "请求接口");
            }
        },
    },
};
</script>

<style lang="less" scoped>
.newsAnnouncement {
    padding-left: 84px;
    font-size: 12px;
    line-height: 2.8vh;
    height: 2.8vh;
    overflow: hidden;
    background: url("../../assets/images/news_bg.png") no-repeat left;
    background-size: 100% 100%;
    color: #fff;
    .news-title {
        left: 0;
        top: 0;
        bottom: 0;
        font-size: 12px;
        .iconfont {
            font-size: 16px;
            margin: 0 5px;
            float: left;
        }
        span {
            cursor: pointer;
        }
    }
    /deep/.el-carousel__container {
        height: 2.8vh;
    }
    .el-carousel__item p {
        font-size: 0.12rem;
        cursor: pointer;
    }
    /deep/.el-carousel__indicators--vertical {
        display: none;
    }
}
</style>
