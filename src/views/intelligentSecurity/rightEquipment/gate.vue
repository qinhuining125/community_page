<template>
    <div class="cont-padding">
        <div class="recode">
            <div
                @click="captureChange(item, index)"
                class="recode-nums"
                v-for="(item, index) in recodeData"
                :key="index"
            >
                <div class="recode-icon">
                    <i :class="item.icons"></i>
                    <h3 class="">{{ item.title }}</h3>
                </div>
                <h2 class="font-family">{{ item.nums }}</h2>
            </div>
        </div>
        <h4 class="capture-list">抓拍列表</h4>
        <!-- 抓拍列表 -->
        <div class="capture-table">
            <ul v-show="activeIndex == 0">
                <li
                    @click="peopleInto(item)"
                    class="list-size"
                    v-for="(item, index) in peopInto"
                    :key="index"
                >
                    <span class="list-family">{{ item.id }}</span>
                    <!-- <img class="img-pos" :src="item.images" /> -->
                    <img
                        class="img-pos"
                        src="../../../assets/images/personneInfo_img.png"
                    />
                    <p>
                        姓名：<span>{{ item.XM }}</span>
                    </p>
                    <p>
                        进入时间：<span>{{ item.JCSJ }}</span>
                    </p>
                    <p>
                        抓拍地点：<span>{{ item.WZ }}</span>
                    </p>
                </li>
                <div class="position">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="totalCount1"
                        :current-page="currentPage"
                        :page-size="pagesize"
                        @current-change="handleCurrentChange1"
                    >
                    </el-pagination>
                </div>
            </ul>
            <ul v-show="activeIndex == 1">
                <li
                    @click="peopleOut(item)"
                    class="list-size"
                    v-for="(item, index) in peopOut"
                    :key="index"
                >
                    <span class="list-family">{{ item.id }}</span>
                    <!-- <img class="img-pos" :src="item.images" /> -->
                    <img
                        class="img-pos"
                        src="../../../assets/images/personneInfo_img.png"
                    />
                    <p>
                        姓名：<span>{{ item.XM }}</span>
                    </p>
                    <p>
                        进入时间：<span>{{ item.JCSJ }}</span>
                    </p>
                    <p>
                        抓拍地点：<span>{{ item.WZ }}</span>
                    </p>
                </li>
                <div class="position">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="totalCount2"
                        :current-page="currentPage"
                        :page-size="pagesize"
                        @current-change="handleCurrentChange2"
                    >
                    </el-pagination>
                </div>
            </ul>
            <ul v-show="activeIndex == 2">
                <li
                    @click="carIntoEv(item)"
                    class="list-size"
                    v-for="(item, index) in carsInto"
                    :key="index"
                >
                    <span class="list-family">{{ item.id }}</span>
                    <!-- <img class="img-pos" :src="item.images" /> -->
                    <img
                        class="img-pos"
                        src="../../../assets/images/personneInfo_img.png"
                    />
                    <p>
                        车牌：<span>{{ item.CPHM }}</span>
                    </p>
                    <p>
                        车型：<span>{{ item.CX }}</span>
                    </p>
                    <p>
                        进入时间：<span>{{ item.JCSJ }}</span>
                    </p>
                    <p>
                        抓拍地点：<span>{{ item.WZ }}</span>
                    </p>
                </li>
                <div class="position">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="totalCount3"
                        @current-change="handleCurrentChange3"
                    >
                    </el-pagination>
                </div>
            </ul>
            <ul v-show="activeIndex == 3">
                <li
                    @click="carOutEv(item)"
                    class="list-size"
                    v-for="(item, index) in carsOut"
                    :key="index"
                >
                    <span class="list-family">{{ item.id }}</span>
                    <!-- <img class="img-pos" :src="item.images" /> -->
                    <img
                        class="img-pos"
                        src="../../../assets/images/personneInfo_img.png"
                    />
                    <p>
                        车牌：<span>{{ item.CPHM }}</span>
                    </p>
                    <p>
                        车型：<span>{{ item.CX }}</span>
                    </p>
                    <p>
                        进入时间：<span>{{ item.JCSJ }}</span>
                    </p>
                    <p>
                        抓拍地点：<span>{{ item.WZ }}</span>
                    </p>
                </li>
                <div class="position">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="totalCount4"
                        @current-change="handleCurrentChange4"
                    >
                    </el-pagination>
                </div>
            </ul>
        </div>

        <!-- 分页 -->
        <!-- <paging></paging> -->
        <!-- <div>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="totalCount"
                @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div> -->

        <!-- 人进出弹框 -->
        <gate-tips
            v-show="isShow"
            @closeTips="closeTips"
            :cPeoInto="cPeoInto"
            :cPeoOut="cPeoOut"
            :currentIndex="activeIndex"
        ></gate-tips>

        <!-- 车进出弹框 -->
        <car-tips
            @closeCarTips="closeCarTips"
            v-show="isActive"
            :cCarTo="cCarInto"
            :cCarFo="cCarOut"
            :currentIndex="activeIndex"
        ></car-tips>
    </div>
</template>

<script>
import gateTips from "../../../components/tips/gateTips"; //人进出弹框
import carTips from "../../../components/tips/carTips"; //车进出弹框
export default {
    name: "gate",
    components: {
        gateTips,
        carTips,
    },
    data() {
        return {
            peoInto: {
                page: 1,
                jczt: "进入",
                size: 10,
            }, //人员进入参数
            peoOut: {
                page: 1,
                jczt: "外出",
                size: 10,
            }, //人员外出参数
            carInto: {
                page: 1,
                jczt: "进入",
                size: 10,
            }, //车辆进入参数
            carOut: {
                page: 1,
                jczt: "外出",
                size: 10,
            }, //车辆外出参数
            cPeoInto: "", //传值人进入
            cPeoOut: "", //传值人外出
            cCarInto: "", //传值车进入
            cCarOut: "", //传值车外出
            isShow: false, //弹框人员显示隐藏
            isActive: false, //弹框显示隐藏
            activeIndex: 0,
            peopInto: [],
            peopOut: [],
            carsInto: [],
            carsOut: [],
            carIntoTotal: "", //进入车总数
            carOutTotal: "", //外出车总数
            recodeData: [
                {
                    icons: "iconfont iconwaichurenyuan1",
                    title: "进入人数",
                    nums: "60",
                },
                {
                    icons: "iconfont iconwaichurenyuan",
                    title: "外出人数",
                    nums: "70",
                },
                // {
                //     icons: "iconfont iconwaichucheliang1",
                //     title: "进入车辆",
                //     nums: "80",
                // },
                // {
                //     icons: "iconfont iconwaichucheliang",
                //     title: "外出车辆",
                //     nums: "90",
                // },
            ],
            totalCount1: 40, //总条数
            totalCount2: 50, //总条数
            totalCount3: 60, //总条数
            totalCount4: 70, //总条数
            currentPage: 1,
            pagesize: 20,
        };
    },
    created() {
        this.getPeoInto(this.peoInto); // 默认点击请求进入人数
        // this.getPeoOut(this.peoOut);
        // this.getCarInto();
        // this.getCarOut();
    },
    mounted() {},
    methods: {
        //  请求后端闸机人员进入接口
        async getPeoInto(params) {
            const res = await this.$Http.gateList(params);
            // console.log(res);
            if (res.code == 0) {
                var id = 1;
                res.data.rows.forEach((item) => {
                    this.$set(item, "id", id++);
                });
                this.peopInto = res.data.rows;
                this.totalCount1 = res.data.total; // 分页总数
                this.currentPage = this.peoInto.page; // 当前页数
                this.pagesize = this.peoInto.size; // 一页显示的数量
                this.recodeData[0].nums = res.data.JRRS; // 总数赋值
                this.recodeData[1].nums = res.data.WCRS; // 总数赋值
            }
        },
        // 请求后端闸机人员外出接口
        async getPeoOut(params) {
            const res = await this.$Http.gateList(params);
            // console.log(res);
            if (res.code == 0) {
                var id = 1;
                res.data.rows.forEach((item) => {
                    this.$set(item, "id", id++);
                });
                this.peopOut = res.data.rows;
                this.totalCount2 = res.data.total; // 总数
                this.currentPage = this.peoOut.page; // 当前页数
                this.pagesize = this.peoOut.size; // 一页显示的数量
                // this.recodeData[1].nums = res.data.total; // 总数赋值
            }
        },
        // 请求后端车辆进入接口
        async getCarInto() {
            const res = await this.$Http.carList(this.carInto);
            // console.log(res);
            if (res.code == 0) {
                this.carsInto = res.data.rows;
                var id = 1;
                res.data.rows.forEach((item) => {
                    this.$set(item, "id", id++);
                });
                this.carIntoTotal = res.data.total;
                this.totalCount3 = res.data.total;
                this.recodeData[2].nums = this.carIntoTotal;
                // console.log(this.carIntoTotal);
            }
        },
        //  请求后端车辆外出接口
        async getCarOut() {
            const res = await this.$Http.carList(this.carOut);
            // console.log(res);
            if (res.code == 0) {
                this.carsOut = res.data.rows;
                var id = 1;
                res.data.rows.forEach((item) => {
                    this.$set(item, "id", id++);
                });
                this.carOutTotal = res.data.total;
                this.totalCount4 = res.data.total;
                this.recodeData[3].nums = this.carOutTotal;
                // console.log(this.carOutTotal);
            }
        },
        //人进入显示弹框并点击每项的值进去
        peopleInto(item) {
            this.isShow = true;
            this.cPeoInto = item;
            // console.log(this.cPeoInto);
        },
        //人外出显示弹框并点击每项的值进去
        peopleOut(item) {
            this.isShow = true;
            this.cPeoOut = item;
            // console.log(this.cPeoOut);
        },
        //车进入显示弹框并点击每项的值进去
        carIntoEv(item) {
            this.isActive = true;
            this.cCarInto = item;
            // console.log(this.cPeoOut);
        },
        //车外出显示弹框并点击每项的值进去
        carOutEv(item) {
            this.isActive = true;
            this.cCarOut = item;
            // console.log(this.cCarOut);
        },
        //关闭人弹框
        closeTips() {
            this.isShow = false;
        },
        closeCarTips() {
            this.isActive = false;
        },
        // 点击tab切换
        captureChange(i, index) {
            console.log(i);
            if (i.title == "进入人数") {
                this.peoInto.page = 1;
                this.getPeoInto(this.peoInto);
            } else {
                this.peoOut.page = 1;
                this.getPeoOut(this.peoOut);
            }
            this.activeIndex = index;
            this.isShow = false;
            this.isActive = false;
        },
        // 分页
        handleCurrentChange1(val) {
            this.peoInto.page = val; //显示当前第几页
            this.peoInto.size = 10;
            this.getPeoInto(this.peoInto);
        },
        handleCurrentChange2(val) {
            this.peoOut.page = val; //显示当前第几页
            this.peoOut.size = 10;
            this.getPeoOut(this.peoOut);
        },
        handleCurrentChange3(val) {
            this.carInto.page = val; //显示当前第几页
            this.carInto.size = 10;
            this.getCarInto();
        },
        handleCurrentChange4(val) {
            this.carOut.page = val; //显示当前第几页
            this.carOut.size = 10;
            this.getCarOut();
        },
    },
};
</script>

<style scoped lang="less">
.cont-padding {
    padding: 0.92vh 0.52vw;
}
.recode {
    width: 100%;
}
.recode-nums {
    padding: 0.5vh 0.5vw;
    width: 43.8%;
    display: inline-block;
    background: url("../../../assets/images/style_txtBg_green.png") no-repeat;
    background-size: 100% 100%;
    margin-bottom: 0.5vh;
    overflow: hidden;
}
.recode-icon {
    // width: 50%;
    display: inline-block;
    text-align: center;
    color: #62e8c7;
}
.font-family {
    display: inline-block;
    font-size: 1.6vw;
    font-family: "jixieziti";
    line-height: 3.7vh;
    float: right;
}

.capture-list {
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 0.82vw;
    line-height: 3.4vh;
    background: url("../../../assets/images/title3_Bg.png") no-repeat;
    background-size: 100% 100%;
    margin: 0.92vh 0;
}
.capture-table {
    width: 100%;
    height: 68vh;
    overflow: hidden;
    overflow-y: scroll;
    margin-bottom: 2vh;
}
// ul {
//     position: relative;
// }
.list-size {
    cursor: pointer;
    border-bottom: 1px solid #707070;
    position: relative;
    padding: 0.92vh 0 0.92vh 5vw;
    color: #fff;
    font-size: 0.72vw;
    line-height: 2.6vh;
}
.list-family {
    position: absolute;
    left: 0;
    top: 0.92;
    font-size: 1.6vw;
    width: 1.6vw;
    text-align: center;
    color: #fff;
    font-family: "jixieziti";
}
.img-pos {
    left: 1.8vw;
    top: 0.92;
    display: block;
    width: 2.6vw;
    height: 6.8vh;
    position: absolute;
}

// 分页
.position {
    position: absolute;
    bottom: 4vh;
    left: 50%;
    transform: translateX(-50%);
}

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
