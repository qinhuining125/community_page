<template>
    <el-dialog
        class="messageBoxCon"
        :title="massageTitle"
        :visible="isMessageBoxShow"
        :modal="false"
        width="auto"
        :close-on-click-modal="false"
        @close="closeMessgeBtn"
    >
        <div class="buildingLayer pr" v-if="isShow">
            <div class="search pa">
                <el-input
                    placeholder="请输入内容"
                    v-model="input"
                    suffix-icon="iconfont iconsousuo"
                    @input="searchValueChange"
                >
                </el-input>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                    :label="item.dyh"
                    :name="item.dyh"
                    v-for="item in tableRowData.zhsqFwListMap"
                    :key="item.dyh"
                    :ldid="item.ldid"
                >
                    <div class="body">
                        <p>
                            <span class="legendLine mr_10">居住</span>
                            <span class="legendLine legendLine_gray">空置</span>
                        </p>
                        <ul class="ResidenceList" ref="ResidenceList">
                            <li
                                :class="
                                    itemChild.fwrzqk == '入住'
                                        ? 'style_zz'
                                        : 'style_kz'
                                "
                                v-for="(itemChild, idx) in item.zhsqFws"
                                @click="residenceListFun(itemChild)"
                                :key="idx"
                            >
                                <span class="txtRT">{{ itemChild.cqzt }}</span>
                                <span>{{ itemChild.mph }}</span>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="buildingPersonelList" v-else>
            <p>
                <i class="iconfont iconback backBtn" @click="backBtn">返回</i>
            </p>
            <div class="hoseLayer">
                <div class="personelInfo">
                    <img
                        class="img"
                        src="../../assets/images/video_img1.png"
                        alt=""
                    />
                    <el-row :gutter="10" class="txt">
                        <el-col :span="12">
                            <span>房屋面积：{{ personelInfoList.fwmj }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span>入住情况：{{ personelInfoList.fwrzqk }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span>门牌号：{{ personelInfoList.mph }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span>使用用途：{{ personelInfoList.fwlylx }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span>产权状态：{{ personelInfoList.cqzt }}</span>
                        </el-col>
                        <el-col :span="24">
                            <span>房屋地址{{ personelInfoList.fwdz }}</span>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import _ from "lodash";
import { mapState, mapActions } from "vuex";
export default {
    /*
    tableRowData 当前点击表格的信息
    massageTitle 标题
    */
    props: ["tableRowData", "massageTitle"],
    components: {},
    data() {
        return {
            isShow: true,
            activeName: "1单元",
            input: "", // 搜索值
            searchParams: {
                type: 2,
                mph: "",
                ldid: "",
                dy: 1,
                pageNum: 1,
                pageSize: 50,
            },
            oldList: [],
            personelInfoList: {
                // id: "1",
                // fwrzqk: "入住",
                // fwmj: "180",
                // fwlylx: "商业",
                // mph: "101",
                // cqzt: "自有",
                // fwdz: "七宝街道莱茵风尚1栋1单元101室"
            },
            // dialogVisible: false
        };
    },
    watch: {},
    mounted() {
        // this.listScrollTop();
    },
    computed: {
        // 获取vuex state的变量
        ...mapState({
            isMessageBoxShow: (state) => state.app.isMessageBoxShow,
        }),
    },
    methods: {
        // 在 Input 值改变时触发 ,搜索获取的列表,忽略频繁执行
        searchValueChange: _.debounce(function (e) {
            if (e !== "" && e !== null) {
                // this.ifSearch = true; // 判断是否在搜索状态
                // this.searchParams.name = e;
                // this.searchParams.pageNum = 1;
                // this.searchLdList(this.searchParams);
                this.searchParams.mph = e;
                this.searZhsqListByType(this.searchParams);
            } else {
                // console.log("内容为空请求楼栋列表");
                // this.ifSearch = false; // 判断是否在搜索状态
                // this.params.pageNum = 1;
                // this.searchLdList(this.params);
                this.searchParams.mph = "";
                this.searZhsqListByType(this.searchParams);
            }
        }, 500),
        ...mapActions(["SETIsMessageBoxShow"]),
        // 关闭弹框
        closeMessgeBtn() {
            this.SETIsMessageBoxShow(false);
        },
        // tabs切换事件
        handleClick(tab, event) {
            this.input = "";
            this.searchParams.mph = "";
            this.searchParams.ldid = tab.$attrs.ldid; // 获取楼栋ID
            this.searchParams.dy = Number(tab.index) + 1; // 获取单元号
            // console.log(tab.$attrs.ldid, Number(tab.index) + 1);
            this.searZhsqListByType(this.searchParams);
        },
        // 房屋门牌号搜索
        async searZhsqListByType(params) {
            const currentDy = this.searchParams.dy - 1;
            const res = await this.$Http.searZhsqListByType(params);
            // console.log(res);
            if (res.code == 0) {
                // 获取单元号
                this.tableRowData.zhsqFwListMap[currentDy].zhsqFws = res.rows;
            }
        },
        // 点击返回
        backBtn() {
            this.isShow = true;
        },
        // 查看入住人数情况
        residenceListFun(data) {
            this.personelInfoList = data;
            this.isShow = false;
        },
        // 列表回到顶部
        listScrollTop() {
            var lth = this.$refs.ResidenceList;
            lth.forEach((item, idx) => {
                this.$refs.ResidenceList[idx].scrollTop = 0;
            });
            // console.log(this.$refs.ResidenceList[0].scrollTop);
        },
    },
};
</script>
<style lang="less" scoped>
.messageBoxCon {
    .backBtn {
        cursor: pointer;
    }
    /deep/.el-tabs__item {
        padding: 0 5px;
        color: #fff;
        font-size: 12px;
    }
    /deep/.el-tabs__nav-wrap::after {
        background-color: #2ec7d7;
        height: 1px;
    }
    /deep/.el-dialog {
        width: 450px !important;
    }
    /deep/.el-tabs__active-bar {
        background: #2ec7d7;
    }
    .search {
        right: 0;
        top: 5px;
        z-index: 99;
        width: 140px;
        /deep/.el-input__inner {
            line-height: 30px;
            height: 30px;
            background: #26272c;
            border: none;
            color: #fff;
        }
        /deep/.el-input__icon {
            line-height: 30px !important;
            height: 30px !important;
        }
    }
    .legendLine {
        padding-left: 20px;
        position: relative;
    }
    .legendLine:after {
        content: "";
        position: absolute;
        left: 0;
        top: 6px;
        display: inline-block;
        width: 14px;
        height: 6px;
        background: #0e956d;
    }
    .legendLine_gray:after {
        background: #6c6e6d;
    }
    .ResidenceList {
        padding: 10px 0;
        height: 200px;
        overflow-y: auto;
        li {
            cursor: pointer;
            position: relative;
            float: left;
            width: 31%;
            margin: 0 1% 10px 1%;
            height: 40px;
            line-height: 40px;
            padding-left: 10%;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            .txtRT {
                position: absolute;
                top: 0px;
                line-height: 20px;
                left: 0px;
                color: #fff;
                font-size: 12px;
            }
        }
        li.style_zz {
            background: url(../../assets/images/ResidenceList_zz.png);
            background-size: 100% 100%;
        }
        li.style_kz {
            background: url(../../assets/images/ResidenceList_kz.png);
            background-size: 100% 100%;
        }
    }
    .hoseLayer {
        max-height: 250px;
        overflow-y: auto;
        .personelInfo {
            font-size: 12px;
            padding: 10px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            margin-bottom: 10px;
            min-height: 100px;
            background: url(../../assets/images/ResidenceDetailListGg.png)
                no-repeat;
            background-size: 100% 100%;
            display: flex;
            img {
                width: 70px;
                height: 80px;
                margin-right: 10px;
            }
            .txt {
                flex: 1;
                line-height: 24px;
            }
        }
    }
}
</style>
