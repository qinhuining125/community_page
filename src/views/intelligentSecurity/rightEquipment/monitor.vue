<template>
    <!-- 选项卡 -->
    <div class="tab-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="出口入口" name="first">
                <!-- <div class="webcamWrap">
                    <div
                        class="webcamBox"
                        v-for="(item, idx) in cameraIdArr"
                        :key="idx"
                    >
                        <div class="time-info">
                            <span>{{ item.SBMC }}</span>
                            <span>{{ item.WZ }}</span>
                        </div>
                        <object
                            class="objectBox"
                            classid="clsid:067A4418-EBAC-4394-BFBE-8C533BA6503A"
                            :id="item.SXTID"
                            events="true"
                            height="220"
                            width="100%"
                        ></object>
                        <i
                            class="iconfont iconplay btn playBtn"
                            @click="doStartPlay(item, idx)"
                            v-if="item.isShow"
                        ></i>
                        <i
                            v-else
                            class="iconfont iconzanting1 btn timeOutBtn"
                            @click="doStopPlay(item, idx)"
                        ></i>
                    </div>
                </div> -->
                <!-- <div class="webcamBox">
                    <object
                        class="objectBox"
                        classid="clsid:067A4418-EBAC-4394-BFBE-8C533BA6503A"
                        id="35-6B-6F_1"
                        events="true"
                        height="220"
                        width="100%"
                    ></object>
                    <i
                        class="iconfont iconplay btn playBtn"
                        @click="doStartPlay('35-6B-6F_1')"
                        v-if="isPlayShow"
                    ></i>
                    <i
                        v-else
                        class="iconfont iconzanting1 btn timeOutBtn"
                        @click="doStopPlay"
                    ></i>
                </div> -->
                <!-- <ul>
                    <li
                        v-for="(item, index) in video1"
                        :key="index"
                        @click="monitorChange(item)"
                    >
                        <div class="time-info">
                            <span>{{ item.SBMC }}</span>
                            <span>{{ item.JCSJ }}</span>
                        </div>
                        <img
                            class="img-size"
                            src="../../../assets/images/video_img1.png"
                            alt=""
                        />
                    </li>
                </ul> -->
            </el-tab-pane>
            <el-tab-pane label="重点区域" name="second">
                <!-- <div class="webcamWrap">
                    <div
                        class="webcamBox"
                        v-for="(item, idx) in cameraIdArr"
                        :key="idx"
                    >
                        <div class="time-info">
                            <span>{{ item.SBMC }}</span>
                            <span>{{ item.WZ }}</span>
                        </div>
                        <object
                            class="objectBox"
                            classid="clsid:067A4418-EBAC-4394-BFBE-8C533BA6503A"
                            :id="item.SXTID"
                            events="true"
                            height="220"
                            width="100%"
                        ></object>
                        <i
                            class="iconfont iconplay btn playBtn"
                            @click="doStartPlay(item, idx)"
                            v-if="item.isShow"
                        ></i>
                        <i
                            v-else
                            class="iconfont iconzanting1 btn timeOutBtn"
                            @click="doStopPlay(item, idx)"
                        ></i>
                    </div>
                </div> -->
                <!-- <ul>
                    <li
                        v-for="(item, index) in video2"
                        :key="index"
                        @click="area(item)"
                    >
                        <div class="time-info">
                            <span>{{ item.SBMC }}</span>
                            <span>{{ item.JCSJ }}</span>
                        </div>
                        <img
                            class="img-size"
                            src="../../../assets/images/video_img2.png"
                            alt=""
                        />
                    </li>
                </ul> -->
            </el-tab-pane>
        </el-tabs>
        <div class="webcamWrap" ref="webcamWrap">
            <div
                class="webcamBox"
                v-for="(item, idx) in cameraIdArr"
                :key="idx"
            >
                <div class="time-info">
                    <span>{{ item.SBMC }}</span>
                    <span>{{ item.WZ }}</span>
                </div>
                <object
                    class="objectBox"
                    classid="clsid:067A4418-EBAC-4394-BFBE-8C533BA6503A"
                    :id="item.SXTID"
                    events="true"
                    height="220"
                    width="100%"
                ></object>
                <i
                    class="iconfont iconplay btn playBtn"
                    @click="doStartPlay(item, idx)"
                    v-if="item.isShow"
                ></i>
                <i
                    v-else
                    class="iconfont iconzanting1 btn timeOutBtn"
                    @click="doStopPlay(item, idx)"
                ></i>
            </div>
        </div>
        <!-- 分页 -->
        <div>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="totalCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-size="params.size"
            >
            </el-pagination>
        </div>
        <!-- 弹框 -->
        <video-tips
            v-show="isShow"
            @closeTips="closeTips"
            :intoChange="objInto"
            :areaChange="objArea"
            :activeModel="actives"
        ></video-tips>
    </div>
</template>

<!--ActiveX控件事件, 初始化完成后会触发, 告知界面当前的播放器ID-->
  <script type="text/javascript" for="35-6B-6F_1" event="eventClickFrame(ulFrameNum,  pcFrameInfo)">
if (typeof dealEventClickFrame == "function") {
    dealEventClickFrame(ulFrameNum, pcFrameInfo);
}
</script>

<script>
import videoTips from "../../../components/tips/videoTips"; //视屏弹框
export default {
    name: "monitor",
    components: {
        videoTips,
    },
    data() {
        return {
            // 请求参数
            params: {
                page: 1,
                size: 3,
                sbmc: "出口入口",
            },
            totalCount: 80, //总条数
            cameraIdArr: [
                {
                    SXTID: "35-6B-6F_1",
                    isShow: true,
                },
                {
                    SXTID: "35-6B-73_1",
                    isShow: true,
                },
                {
                    SXTID: "35-6B-6A_1",
                    isShow: true,
                },
                {
                    SXTID: "35-6B-72_1",
                    isShow: true,
                },
                {
                    SXTID: "35-6B-5E_1",
                    isShow: true,
                },
                {
                    SXTID: "35-6B-60_1",
                    isShow: true,
                },
            ],
            isPlayShow: true,
            title: "",
            g_curFrameNum: 1,
            g_UserLoginId: null,
            g_xmlActive: null,
            g_imosActivePlayer: [],
            cameraId: "35-6B-60_1", // 摄像头ID
            actives: "", //下标
            objInto: "", //出入口空对象
            objArea: "", //重点空对象
            isShow: false, //弹框显示隐藏
            isActive: -1,
            title: "视频监控",
            activeName: "first",
            video1: [],
            video2: [],
        };
    },
    mounted() {},
    created() {},
    methods: {
        handleSizeChange(val) {},
        // 点击分页
        handleCurrentChange(val) {
            this.$refs.webcamWrap.scrollTop = 0; // 设置滚动条默认回到顶部
            this.params.page = val;
            this.getMonitorList(this.params);
        },
        // 摄像头初始化
        initPage(arr) {
            this.g_imosActivePlayer = [];
            arr.forEach((i) => {
                this.g_imosActivePlayer.push(document.getElementById(i.SXTID));
            });
            console.log(arr);
            if (!this.g_imosActivePlayer) {
                alert("未安装控件，请先安装后再使用本页面");
            }
            var xmldoc;
            xmldoc = new ActiveXObject("Microsoft.XMLDOM");
            try {
                xmldoc = new ActiveXObject("Microsoft.XMLDOM");
                if (!xmldoc) {
                    xmldoc = new ActiveXObject("MSXML2.DOMDocument.3.0");
                }
            } catch (e) {}
            this.g_xmlActive = xmldoc;
            // console.log(xmldoc);
            if (!this.g_xmlActive) {
                alert("xml解析器获取错误，将导致某些功能不可用");
            } else {
                this.g_xmlActive.async = "false";
            }

            setTimeout(() => {
                console.log("3秒后执行");
                this.doLogin();
            }, 20);
        },
        //登录
        doLogin() {
            console.log("登录");
            if (!this.g_imosActivePlayer) {
                alert("未安装控件，请先安装后再使用本页面");
                return;
            }
            var serverIP = "172.16.0.10";
            var userName = "loadmin";
            var passWd = "*Ab123456";
            var retStr;
            this.g_imosActivePlayer.forEach((i) => {
                this.doGetAllCamList(i); // 设置摄像头样式
                i.IMOSAX_InitOCX(serverIP, "8800", userName, passWd, 1);
                retStr = i.IMOSAX_GetUserLoginInfo();
            });

            //获取用户信息
            var userObj = this.loadXML(retStr);
            console.log(userObj);
            this.g_UserLoginId = userObj.documentElement.selectNodes(
                "//LOGININFO/UserLoginIDInfo/UserLoginCode"
            )[0].text;
            console.log("this.g_UserLoginId", this.g_UserLoginId);
        },
        /**
         * 解析从控件返回的xml字符串
         */
        loadXML(xmlString) {
            if (!this.g_xmlActive) {
                return;
            }
            this.g_xmlActive.loadXML(xmlString);
            if (0 == this.g_xmlActive.parseError.errorCode) {
                return this.g_xmlActive;
            } else {
                alert("xml解析错误:" + this.g_xmlActive.parseError.reason);
                return null;
            }
        },
        // 播放
        doStartPlay(item, idx) {
            // item.isShow = false;
            this.cameraIdArr.forEach((i) => {
                if (item.SXTID == i.SXTID) {
                    this.$set(i, "isShow", false);
                }
            });
            // this.isPlayShow = false; // 显示暂停按钮
            if (!this.g_imosActivePlayer) {
                alert("未安装控件，请先安装后再使用本页面");
                return;
            }

            var frameNum = this.g_curFrameNum; // 输入几号摄像头
            frameNum = parseInt(frameNum, 10);
            if (isNaN(frameNum) || frameNum < 1 || frameNum > 25) {
                alert("请先选择一个窗格");
                return;
            }
            this.g_imosActivePlayer.forEach((i, index) => {
                if (idx == index) {
                    i.IMOSAX_StartFrameLive(frameNum, item.SXTID);
                }
            });
        },
        // 停止播放
        doStopPlay(item, idx) {
            // this.isPlayShow = true; // 隐藏暂停按钮
            this.cameraIdArr.forEach((i) => {
                if (item.SXTID == i.SXTID) {
                    this.$set(i, "isShow", true);
                }
            });

            if (!this.g_imosActivePlayer) {
                alert("未安装控件，请先安装后再使用本页面");
                return;
            }
            var frameNum = this.g_curFrameNum;
            if (isNaN(frameNum) || frameNum < 1 || frameNum > 25) {
                alert("请选择一个窗格");
                return;
            }
            var flag;
            // var flag = this.g_imosActivePlayer.IMOSAX_StopFramelive(frameNum);
            this.g_imosActivePlayer.forEach((i, index) => {
                if (idx == index) {
                    i.IMOSAX_StopFramelive(frameNum);
                }
            });
        },
        // 关闭所有摄像头
        doStopPlayAll() {
            this.g_imosActivePlayer.forEach((i, index) => {
                i.IMOSAX_StopFramelive(1);
            });
        },
        // 设置摄像头样式
        doGetAllCamList(i) {
            i.IMOSAX_SetAttributeParam(
                "<?xml version='1.0' ?> <data><LayoutNum>1</LayoutNum></data>"
            );
        },
        // 获取出口出入数据
        getCkcrMonitorList() {
            this.params.page = 1;
            this.params.sbmc = "出口入口";
            this.getMonitorList(this.params);
        },
        // 获取重点区域数据
        getZdqyMonitorList() {
            this.params.page = 1;
            this.params.sbmc = "重点区域";
            this.getMonitorList(this.params);
        },
        //  请求后端设备接口
        async getMonitorList(params) {
            const res = await this.$Http.monitorList(params);
            if (res.code == 0) {
                // console.log(res);
                this.totalCount = res.data.total;
                res.data.splb.forEach((item) => {
                    this.$set(item, "isShow", true);
                });

                this.cameraIdArr = res.data.splb; // 出口入口
                this.$nextTick(() => {
                    this.initPage(this.cameraIdArr); // 摄像头dom初始化登录
                    this.doStopPlayAll(); // 关闭所有摄像头
                });
            }
        },
        // tab切换事件
        handleClick(tab, event) {
            switch (tab.label) {
                case "出口入口":
                    console.log(tab.label);
                    this.getCkcrMonitorList();
                    break;
                case "重点区域":
                    console.log(tab.label);
                    this.getZdqyMonitorList();
                    break;
            }
            this.actives = tab.index;
            // console.log(tab.index);
            this.isShow = false;
        },
        monitorChange(item) {
            this.isShow = true;
            this.objInto = item;
        },
        //主动删掉
        area(item) {
            this.isShow = true;
            this.objArea = item;
        },
        closeTips() {
            this.isShow = false;
        },
    },
    // 页面销毁
    beforeDestroy() {
        console.log("页面销毁");
        this.doStopPlayAll();
    },
};
</script>

<style lang="less" scoped>
.tab-card {
    padding: 0.1rem;
}
/deep/.el-tabs__nav {
    display: flex;
    float: none;
}
/deep/.el-tabs__active-bar {
    background-color: #2ec7d7;
}

/deep/.el-tabs__item {
    color: #fff;
    padding: 0;
    display: block;
    flex: 1;
    text-align: center;
}
ul {
    height: 74vh;
    padding-right: 0.52vw;
    overflow-y: auto;
}
li {
    position: relative;
    margin-bottom: 0.82vh;
}
.img-size {
    width: 100%;
}
.time-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 0.72vw;
    line-height: 2.8vh;
    background: rgba(29, 30, 36, 0.6);
}
.webcamBox {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
    // height: 240px;
    // background: #f00;
    .btn {
        display: inline-block;
        z-index: 999;
        border: none;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        // left: 50%;
        // top: 50%;
        // margin-top: -20px;
        // transform: translateX(-50%);
        cursor: pointer;
        background-color: rgba(43, 51, 63, 0.7);
        border-radius: 0.3em;
        transition: all 0.4s;
        text-align: center;
    }
    .btn:hover {
        background: #3a4350;
    }
    .timeOutBtn {
        // display: none;
        display: block;
    }
    .objectBox {
        // position: absolute;
        // z-index: 9;
    }
}
.webcamBox:hover {
    .timeOutBtn {
        // display: block;
    }
}
.webcamWrap {
    padding-right: 10px;
    height: 74vh;
    overflow: hidden;
    overflow-y: auto;
}
// 分页

/deep/.el-pagination {
    text-align: center;
}

/deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #43e8be;
    min-width: auto;
    border: none;
    border-radius: 0;
    font-size: 0.14rem;
    margin: 0;
    height: 0.28rem;
    line-height: 0.28rem;
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background: none;
    color: #43e8be;
    min-width: auto;
    border: none;
    border-radius: 0;
    font-size: 0.14rem;
    margin: 0;
    height: 0.28rem;
    line-height: 0.28rem;
}
/deep/.el-pagination.is-background
    .el-pager
    li:not(.disabled).active
    /deep/.el-pagination {
    text-align: center;
    padding: 0;
}

/deep/.el-pagination.is-background .btn-next,
/deep/ .el-pagination.is-background .btn-prev,
/deep/.el-pagination.is-background .el-pager li {
    background: none;
    color: #fff;
    min-width: auto;
    border: none;
    border-radius: 0;
    font-size: 0.14rem;
    margin: 0;
    height: 0.28rem;
    line-height: 0.28rem;
}

/deep/ .el-pagination span:not([class*="suffix"]) {
    margin: 0 0.04rem;
}

/deep/.btn-prev:hover {
    color: #43e8be !important;
}
/deep/.btn-next:hover {
    color: #43e8be !important;
}
</style>