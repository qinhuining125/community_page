<template>
    <div class="rightContent publicStyle_bg" ref="subPageList">
        <span class="rightCloseBtn" @click="rightCloseBtn"
            ><i class="iconfont iconguanbi"></i
        ></span>
        <span class="publicStyle_line"></span>
        <h2 class="publicStyle_title" ref="publicStyle_title">告警信息</h2>
        <div class="list-content" :style="tableHeight" ref="subPageListHeight">
            <ul>
                <li
                    v-for="(item, index) in newsList"
                    :key="index"
                    @click="warnDetailShow(item)"
                >
                    <p :title="item.noticeTitle">
                        <span class="txt">{{ item.ycnr }}</span>
                        <span class="time">【{{ item.ycsj }}】</span>
                    </p>
                    <!-- <p>
                        <span class="color-red">【{{ item.name }}】</span>
                        <span class="size-weight">{{ item.message }}</span>
                    </p> -->
                </li>
            </ul>
        </div>
        <div ref="page" class="page">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="params.pageNum"
                :page-size="params.pageSize"
                layout="prev, pager, next"
                :total="total"
                :pager-count="5"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    name: "newsInfo",
    data() {
        return {
            tableHeight: {
                height: "60%", // 表格高度设置
            },
            total: 3, // 新闻列表总数
            params: {
                pageNum: 1, // 当前页数
                pageSize: 30, // 一页显示的总数
                type: "7", // 总数必须是数字类型
            },
            // 新闻公告列表
            newsList: [
                {
                    createBy: null,
                    createByid: null,
                    createTime: null,
                    czjg: null,
                    czry: "张海",
                    czzt: "未处置",
                    fj: null,
                    remark: null,
                    searchValue: null,
                    status: null,
                    updateBy: null,
                    updateByid: null,
                    updateTime: null,
                    x: "121.3413303",
                    y: "31.1549558",
                    ycid: "YC000001",
                    ycjb: "红",
                    ycly: "设备报警",
                    ycnr: "视频设备发生报警，请前往查看",
                    ycsj: "2020/5/2",
                    z: "18.013",
                },
            ],
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.params.pageNum = 1; // 默认请求第一页
            this.getWarnInfoList(this.params); // 获取新闻公告列表
            this.heightFun(); // 计算列表高度
            window.addEventListener(
                "resize",
                this.antiShake(this.heightFun, 500)
            );
        });
    },
    computed: {
        // 获取vuex state的变量
        ...mapState({
            isInfoShow: (state) => state.app.isInfoShow,
        }),
    },
    watch: {
        isInfoShow: {
            handler: function (newName) {
                if (newName) {
                    this.$nextTick(() => {
                        this.heightFun();
                        window.addEventListener("resize", this.heightFun);
                    });
                }
            },
            deep: true,
            // immediate: true
        },
    },
    methods: {
        // 计算表格的高度
        heightFun() {
            // 当页面存在则执行
            if (this.$refs.subPageList) {
                this.tableHeight.height =
                    this.$refs.subPageList.offsetHeight -
                    this.$refs.publicStyle_title.offsetHeight -
                    this.$refs.page.offsetHeight -
                    10 +
                    "px";
            }
        },
        // 监听防抖
        antiShake(fn, wait) {
            let timeout = null;
            return function () {
                if (timeout !== null) clearTimeout(timeout);
                timeout = setTimeout(fn, wait);
            };
        },
        ...mapActions([
            "SETIsInfoShow",
            "SETMapToolbarIsActive",
            "SETIsPartyShow",
            "SETIsMessageBoxShow",
        ]),
        //关闭右侧弹框
        rightCloseBtn() {
            this.SETIsInfoShow(false);
            this.SETMapToolbarIsActive(false);
        },
        // 点击列表事件
        warnDetailShow(i) {
            this.$emit("warnDetailShow", i);
        },
        // 分页切换
        handleCurrentChange(currentPage) {
            // console.log(`当前页: ${currentPage}`);
            this.params.pageNum = currentPage;
            this.getWarnInfoList(this.params); // 列表请求
        },
        // 获取新闻公告
        async getWarnInfoList(params) {
            const res = await this.$Http.searZhsqListByType(params);
            if (res.code == 0) {
                this.total = parseInt(res.total); // 获取分页总数
                res.rows.forEach((item) => {
                    item.ycsj = item.ycsj.trim().split(" ")[0]; // 通过空格截取只需要显示年月日
                });
                this.newsList = res.rows; // 列表赋值
                // console.log(res, "请求接口");
            }
        },
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.heightFun);
    },
};
</script>

<style lang="less" scoped>
.rightContent {
    // 列表
    .list-content {
        overflow-y: auto;
        padding: 0 0.1rem 0.2rem 0.1rem;
        box-sizing: border-box;
        .title {
            text-align: left;
            padding: 0.1rem;
            letter-spacing: 2px;
            color: #fff;
            font-size: 0.18rem;
        }
        ul {
            li {
                position: relative;
                cursor: pointer;
                height: 0.36rem;
                line-height: 0.36rem;
                font-size: 0.16rem;
                p {
                    // padding-right: 1.4rem;
                    display: flex;
                }
                .txt {
                    cursor: pointer;
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
            .color-red {
                color: #f17774;
                margin-right: 0.2rem;
            }
        }
    }
    // width: 100%;
    // height: 90%;
    // max-height: 90%;
    // min-height: 30%;
    // 关闭按钮
    .rightCloseBtn {
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        cursor: pointer;
        color: #fff;
        font-size: 0.18rem;
        .iconfont {
            font-size: 0.16rem;
        }
    }
    // 分页样式
    /deep/.el-pagination {
        color: #fff;
        width: 100%;
        text-align: center;
    }
    /deep/.el-pagination button:disabled {
        color: rgba(255, 255, 255, 0.6);
    }
    /deep/.el-pagination button:disabled,
    /deep/.el-pagination .btn-next,
    /deep/.el-pagination .btn-prev,
    /deep/.el-pager li {
        background: none;
    }
    /deep/ .el-pagination .btn-next,
    /deep/.el-pagination .btn-prev {
        color: #fff;
    }
    /deep/.el-pagination button,
    /deep/.el-pager li,
    /deep/.el-pagination span:not([class*="suffix"]) {
        font-size: 0.14rem;
        min-width: auto;
        height: 0.28rem;
        line-height: 0.28rem;
    }
    /deep/.el-pager li {
        padding: 0 0.05rem;
    }
    /deep/.el-pager li.active {
        color: #43e8be;
    }
    /deep/.el-pager li.btn-quicknext,
    /deep/.el-pager li.btn-quickprev {
        color: #fff;
        height: 0.28rem;
        line-height: 0.28rem;
    }
    /deep/.el-pager .more::before {
        height: 0.28rem;
        line-height: 0.28rem;
    }
}
</style>
