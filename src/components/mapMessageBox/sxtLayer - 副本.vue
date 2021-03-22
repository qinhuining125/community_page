<template>
    <div class="messageBox">
        <div class="title">
            摄像头
            <i class="closeBtn iconfont iconguanbi" @click="closeMessgeBtn"></i>
        </div>
        <div class="body sxtBody">
            <el-row :gutter="10">
                <el-col :span="12" class="mb_10">
                    <span class="color_blue">位置：</span>{{ resultData.wz }}
                </el-col>
                <el-col :span="12" class="txtR">
                    <span class="color_blue">状态：</span>{{ resultData.sbzt }}
                </el-col>
            </el-row>
            <div class="webcamBox pr">
                <object
                    classid="clsid:067A4418-EBAC-4394-BFBE-8C533BA6503A"
                    id="h3c_IMOS_ActiveX"
                    events="true"
                    height="100%"
                    width="100%"
                ></object>
                <i
                    class="iconfont iconplay pa btn playBtn"
                    @click="doStartPlay"
                    v-if="isPlayShow"
                ></i>
                <i
                    v-else
                    class="iconfont iconzanting1 pa btn timeOutBtn"
                    @click="doStopPlay"
                ></i>
            </div>
            <video
                id="myVideo"
                ref="myVideo"
                class="video-js"
                v-if="resultData.sbzt == '在线'"
            >
                <source src="../../assets/images/video.mp4" type="video/mp4" />
            </video>
            <video id="myVideo" ref="myVideo" class="video-js" v-else>
                <!-- <source src="../../assets/images/video.mp4" type="video/mp4" /> -->
            </video>
            <!-- <video src="movie.ogg" controls="controls"> -->
            <!-- <img class="img" src="../../assets/images/video.mp4" alt="" /> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ["resultData"],
    data() {
        return {
            isPlayShow: true,
            title: "",
            g_curFrameNum: 1,
            g_UserLoginId: null,
            g_xmlActive: null,
            g_imosActivePlayer: null,
        };
    },
    mounted() {
        // this.initPage();
        this.initVideo();
    },
    methods: {
        initPage() {
            this.g_imosActivePlayer = document.getElementById(
                "h3c_IMOS_ActiveX"
            );
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
            console.log(xmldoc);
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
            this.doGetAllCamList(); // 设置摄像头样式
            // var res = this.g_imosActivePlayer.IMOSAX_SetAttributeParam(
            //     "<?xml version='1.0' ?> <data><LayoutNum>1</LayoutNum></data>"
            // );
            // console.log(res);
            var g_isLogin = this.g_imosActivePlayer.IMOSAX_InitOCX(
                serverIP,
                "8800",
                userName,
                passWd,
                1
            );
            if (0 != g_isLogin) {
                alert("IMOSAX_InitOCX Error:" + g_isLogin);
                return;
            }

            //获取用户信息
            var retStr = this.g_imosActivePlayer.IMOSAX_GetUserLoginInfo();
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
        doStartPlay() {
            this.isPlayShow = false; // 显示暂停按钮
            if (!this.g_imosActivePlayer) {
                alert("未安装控件，请先安装后再使用本页面");
                return;
            }
            var cameraId = "35-6B-6F_1";
            var frameNum = this.g_curFrameNum; // 输入几号摄像头
            frameNum = parseInt(frameNum, 10);
            if (isNaN(frameNum) || frameNum < 1 || frameNum > 25) {
                alert("请先选择一个窗格");
                return;
            }
            var flag = this.g_imosActivePlayer.IMOSAX_StartFrameLive(
                frameNum,
                cameraId
            );
            console.log(frameNum, cameraId);
            if (0 == flag) {
                // alert("实况播放成功");
            } else {
                alert("播放实况失败，错误码：" + flag);
            }
        },
        // 停止播放
        doStopPlay() {
            this.isPlayShow = true; // 隐藏暂停按钮
            if (!this.g_imosActivePlayer) {
                alert("未安装控件，请先安装后再使用本页面");
                return;
            }
            var frameNum = this.g_curFrameNum;
            if (isNaN(frameNum) || frameNum < 1 || frameNum > 25) {
                alert("请选择一个窗格");
                return;
            }
            var flag = this.g_imosActivePlayer.IMOSAX_StopFramelive(frameNum);
            if (0 == flag) {
                // alert("停止实况成功");
            } else {
                alert("停止实况失败，错误码：" + flag);
            }
        },
        // 设置摄像头样式
        doGetAllCamList() {
            this.g_imosActivePlayer.IMOSAX_SetAttributeParam(
                "<?xml version='1.0' ?> <data><LayoutNum>1</LayoutNum></data>"
            );
        },
        initVideo() {
            //初始化视频方法
            this.$video(document.getElementById("myVideo"), {
                //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                controls: true,
                //自动播放属性,muted:静音播放
                autoplay: "muted",
                //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                preload: "auto",
                //设置视频播放器的显示宽度（以像素为单位）
                width: "100%",
                //设置视频播放器的显示高度（以像素为单位）
                height: "100%",
            });
        },
        closeMessgeBtn() {
            this.$mapView.clearLayerBoxFun(); // 清除弹框
        },
    },
};
</script>

<style lang="less" scoped>
.messageBox {
    width: 400px !important;
    background: rgba(29, 30, 36, 0.7);
    /deep/.video-js {
        width: 100%;
        height: 220px;
    }
    /deep/.video-js .vjs-big-play-button {
        border: none;
        left: 50%;
        top: 50%;
        margin-top: -20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        transform: translateX(-50%);
    }
    .title {
        padding: 10px;
        border-bottom: 1px solid #626a5d;
        position: relative;
        font-size: 16px;
        color: #70cebc;
        .closeBtn {
            position: absolute;
            right: 10px;
            top: 10px;
            color: #fff;
            cursor: pointer;
        }
    }
    .title:before {
        display: block;
        content: "";
        position: absolute;
        left: 0;
        top: -3px;
        width: 82px;
        height: 3px;
        background: url(../../assets/images/layerTitleStyle.png) no-repeat top
            left;
    }
    .sxtBody {
        padding: 10px;
        color: #fff;
        font-size: 14px;
        .img {
            width: 100%;
            height: 200px;
        }
    }
    .webcamBox {
        width: 100%;
        height: 220px;
        background: #f00;
        .btn {
            border: none;
            left: 50%;
            top: 50%;
            margin-top: -20px;
            width: 40px;
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            transform: translateX(-50%);
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
            display: none;
        }
    }
    .webcamBox:hover {
        .timeOutBtn {
            display: block;
        }
    }
}
</style>
