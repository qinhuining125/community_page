<template>
    <div class="headerContent pr">
        <div class="pa"></div>
        <img class="logo pa" src="../assets/images/logo.png" alt="" />
        <ul class="navList">
            <li
                :class="[isActive === idx ? 'active' : '']"
                v-for="(item, idx) in navList"
                :key="idx"
                @click="navListChange(item)"
            >
                <router-link :to="item.linkUrl">{{ item.name }}</router-link>
            </li>
        </ul>
        <div class="weatherBox pa of">
            <dl class="fl time txtC">
                <dt>{{ gettime }}</dt>
                <!-- <dd class="color_blue">{{ dates }} {{ week }}</dd> -->
                <!-- <dd class="color_blue">2020年12月9日 星期四</dd> -->
                <dd class="color_blue">{{ gettime1 }} {{ gettime2 }}</dd>
            </dl>
            <dl class="fl weather">
                <dt>
                    空气质量：<span class="type">{{ air_level }}</span>
                    <!-- 空气质量：<span class="type">优</span> -->
                </dt>
                <dd>{{ city }}：{{ tem2 }}~{{ tem1 }}</dd>
                <!-- <dd>武汉：1℃~7℃</dd> -->
            </dl>
        </div>
        <div class="userInfo pa">
            <span class="userName pr" @click="userNameChick">
                {{ userName }}
                <span
                    v-show="isPassChangeShow"
                    class="pa password-change"
                    @click.stop="passChange"
                    >修改密码</span
                >
            </span>
            <span @click="signOut" title="注销"
                ><i class="iconfont iconzhuxiao1"></i
            ></span>
            <span @click="backstageLint" title="后台"
                ><i class="iconfont iconshezhi"></i
            ></span>
        </div>
        <change-password-layer
            :dialogVisible="dialogVisible"
            @closeMessgeBtn="closeMessgeBtn"
        ></change-password-layer>
    </div>
</template>

<script>
import mapView from "@/utils/mapView.js";
import changePasswordLayer from "@/components/messageBox/changePassword";
export default {
    components: { changePasswordLayer },
    name: "homeHeader",
    data() {
        return {
            dialogVisible: false,
            massageTitle: "修改密码",
            isPassChangeShow: false,
            userName: "你好，管理员",
            loginStateInfo: false,
            //weatherInfo:{},
            gettime: "", //时分秒
            gettime1: "", //年月日
            gettime2: "", //星期几
            city: "", //当前城市
            //dates: "", //当前日期
            air_level: "", //空气质量
            //week: "", //星期
            tem2: "", //最低温度
            tem1: "", //最高温度
            // id: 84983496, //天气api必传值
            // mm: "E4CRwGbh",
            // v1: "v1",
            isActive: 0,
            navList: [
                {
                    name: "综合态势",
                    linkUrl: "index",
                },
                {
                    name: "社区管理",
                    linkUrl: "communityManagement",
                },
                {
                    name: "智慧党建",
                    linkUrl: "smartPartyBuilding",
                },
                {
                    name: "智能安防",
                    linkUrl: "intelligentSecurity",
                },
                {
                    name: "综合治理",
                    linkUrl: "comprehensiveControl",
                },

                // {
                //     name: "统计展示",
                //     linkUrl: "statisticalDisplay"
                // }
            ],
        };
    },
    mounted() {
        this.getWeather(); // 获取天气接口
        this.getLoginState();
        // console.log(this.loginStateInfo);
        this.currentTime(); //创建时间
    },
    computed: {
        // 获取当前路由
        routerName() {
            return this.$route.name;
        },
    },
    watch: {
        // 当路由发生变化的时候执行导航栏选中事件
        routerName: {
            handler(newName) {
                if (newName) {
                    this.navListActive();
                }
            },
            immediate: true,
        },
        // 判断登录状态
        loginStateInfo: {
            handler(newName) {
                // console.log(newName);
                if (!newName) {
                    // window.open(
                    //     myConfig.backgroundAddress + "/service-wutanyuan/login",
                    //     "_self"
                    // );
                }
            },
            immediate: true,
        },
    },
    methods: {
        // 获取太原市天气接口
        async getWeather() {
            const res = await this.$Http.getWeather();
            if (res.status == 200) {
                // console.log(res);
                this.air_level = res.data.quality; // 空气质量
                this.city = res.cityInfo.city; // 当前城市
                this.tem2 = res.data.forecast[0].low.split(" ")[1]; // 最低温
                this.tem1 = res.data.forecast[0].high.split(" ")[1]; // 最高温
            }
        },
        // 点击关闭按钮
        closeMessgeBtn() {
            this.dialogVisible = false;
        },
        // 点击用户名展开
        userNameChick() {
            this.isPassChangeShow = !this.isPassChangeShow;
        },
        // 修改密码
        passChange() {
            this.userNameChick();
            this.dialogVisible = true;
        },
        //  请示后端登录接口判断是否登录
        async getLoginState() {
            const res = await this.$Http.loginState();
            if (res.code == 0) {
                this.loginStateInfo = true;
                this.userName = res.data.userName; // 获取管理员
                // console.log(res, this.userName);
            } else {
                // console.log(res);
                // 没有登录就自动跳转到后台登录
                this.loginStateInfo = false;
                this.isEnvFun(); // 如果未登录就跳转登录页
            }
        },
        // 判断是否是开发环境
        isEnvFun() {
            /* 
                本地默认跳转不到后台页面，开发时默认不跳转，打包后跳转(登录页是后端页面所有跳转会存在跨域)
                production  线上环境
                development 开发环境
            */
            if (process.env.NODE_ENV === "production") {
                console.log("线上环境");
                window.open(
                    myConfig.backgroundAddress + "/service-wutanyuan/login",
                    "_self"
                );
            }
        },
        // 点击菜单栏执行事件
        navListChange() {
            // 清除图标并回到初始位置
            mapView.clearPic();
            mapView.zhsqFlyHome();
        },
        // 通过当前的路由判断刷新选中样式
        navListActive() {
            this.navList.forEach((e, idx) => {
                if (this.$route.name === e.linkUrl) {
                    this.isActive = idx;
                }
            });
        },
        // 退出登录
        signOut() {
            // console.log("退出");
            window.open(
                myConfig.backgroundAddress + "/service-wutanyuan/logout",
                "_self"
            );
        },
        // 跳转后台链接
        backstageLint() {
            console.log(myConfig.backgroundAddress);
            window.open(
                myConfig.backgroundAddress + "/service-wutanyuan/console",
                "_self"
            );
            console.log("跳转后台");
        },
        //获取实时时间
        getTime() {
            // var _this = this;
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth() + 1;
            let dd = new Date().getDate();
            let week = new Date().getDay(); // 星期
            let weekArr = [
                "星期日",
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六",
            ];
            let weeks = weekArr[week];
            let hh = new Date().getHours();
            let mf =
                new Date().getMinutes() < 10
                    ? "0" + new Date().getMinutes()
                    : new Date().getMinutes();
            let ss =
                new Date().getSeconds() < 10
                    ? "0" + new Date().getSeconds()
                    : new Date().getSeconds();
            //   _this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
            this.gettime = hh + ":" + mf + ":" + ss;
            this.gettime1 = yy + "-" + mm + "-" + dd;
            this.gettime2 = weeks;
        },
        //创建定时器
        currentTime() {
            setInterval(this.getTime, 500);
        },
    },
};
</script>

<style lang="less" scoped>
.headerContent {
    padding-left: 18vw;
    height: 8.7vh;
    background: url("../assets/images/indexTopBg.png") no-repeat top center;
    background-size: 100% 100%;
    a {
        color: #fff;
    }
    .logo {
        display: inline-block;
        width: 4rem;
        left: 50%;
        margin-left: -2rem;
        top: 2vh;
    }
    .navList {
        overflow: hidden;
        li {
            position: relative;
            float: left;
            line-height: 5.5vh;
            font-size: 0.18rem;
            margin-right: 0.5rem;
        }
        li:after {
            content: "";
            position: absolute;
            display: none;
            width: 100%;
            bottom: 1vh;
            left: 0;
            right: 0;
            height: 0.27vh;
            background: url("../assets/images/navActiveStyle.png");
            background-size: 100% 100%;
        }
        li.active:after {
            display: block;
        }
        li:nth-child(3) {
            margin-right: 30vw;
        }
    }
    .weatherBox {
        top: 0;
        left: 0.1rem;
        color: #fff;
        font-size: 0.12rem;
        height: 5.2vh;
        display: flex;
        align-items: center;
        .time {
            dt {
                font-size: 0.26rem;
                font-family: "jixieziti";
            }
            padding-right: 0.1rem;
            border-right: 1px solid #3aa0af;
        }
        .weather {
            padding-right: 0.1rem;
            .type {
                display: inline-block;
                padding: 0 0.02rem;
                color: #fff;
                border-radius: 0.02rem;
                background: #3adfb7;
            }
        }

        dl {
            margin-right: 1vw;
            dt,
            dd {
                font-size: 0.14rem;
            }
        }
    }
    .userInfo {
        top: 0;
        right: 1vw;
        color: #fff;
        font-size: 0.12rem;
        height: 5.2vh;
        display: flex;
        align-items: center;
        .userName {
            cursor: pointer;
            font-size: 0.16rem;
            color: #62e8c7;
            margin-right: 0.1rem;
            letter-spacing: 1px;
        }
        .password-change {
            top: 4vh;
            left: 0;
            width: 100%;
            line-height: 0.4rem;
            background: rgba(29, 30, 36, 0.4);
            text-align: center;
            font-size: 0.16rem;
        }
        .iconfont {
            cursor: pointer;
            font-size: 0.18rem;

            margin: 0 0.05rem;
        }
    }
}
</style>
