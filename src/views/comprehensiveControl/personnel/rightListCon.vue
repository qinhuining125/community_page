<template>
    <div class="publicStyle_bg subPageList" ref="subPageList">
        <div class="height" ref="subPageListHeight">
            <span class="rightCloseBtn" @click="rightCloseBtn"
                ><i class="iconfont iconguanbi"></i
            ></span>
            <span class="publicStyle_line"></span>
            <h2 class="publicStyle_title">{{ title }}</h2>
            <div class="search">
                <el-input
                    placeholder="请输入重点人员姓名"
                    v-model="input"
                    suffix-icon="iconfont iconsousuo"
                    @input="searchValueChange"
                >
                </el-input>
            </div>
            <h5 class="listTitle">人员列表</h5>
        </div>
        <key-person-list
            @tableRowClick="keyTableRowClick"
            v-if="zhzlListChange"
            :tableHeight="tableHeight"
            class="tableListCon"
            :tableData="resultPersonData"
            :pagesize="pagesize"
            :total="total"
            :currentPage="currentPage"
            @handleCurrentChange="handleCurrentChange"
        ></key-person-list>
        <component
            :is="massageComponent"
            :tableRowData="tableRowData"
            :wristbandInfo="wristbandInfo"
            ref="massageRef"
            :massageTitle="massageTitle"
            @getPersonShInfo="getPersonShInfo"
        ></component>
    </div>
</template>

<script>
import _ from "lodash";
import { mapState, mapActions } from "vuex";
import tableList from "@/components/tableList";
import keyPersonList from "@/components/keyPersonListTable";
import keyPersonelLayer from "@/components/messageBox/keyPersonelLayer.vue"; // 重点人员弹框
import personelLayer from "@/components/messageBox/personelLayer.vue"; // 人员弹框
export default {
    props: ["title", "getSeriveName"],
    components: {
        tableList,
        keyPersonList,
    },
    data() {
        return {
            massageTitle: "",
            tableRowData: {}, // 点击表格当前行的信息
            wristbandInfo: {}, // 获取的手环信息
            massageComponent: "",
            tableHeight: {
                height: "60%",
            },
            total: 10,
            pagesize: 20, // 一页显示30条
            currentPage: 1,
            input: "",
            resultPersonData: [],
            resultKeyPersonDataOld: [
                {
                    id: 1,
                    xm: "艾宝",
                    xb: "女",
                    nl: "70",
                    label: "独居人员",
                    type: "elderly",
                },
                {
                    id: 2,
                    xm: "岳静媛",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "elderly",
                },
                {
                    id: 3,
                    xm: "岳富家",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "elderly",
                },
                {
                    id: 4,
                    xm: "杨丽梅",
                    xb: "女",
                    nl: "72",
                    label: "独居人员",
                    type: "elderly",
                },
                {
                    id: 5,
                    xm: "朱熠轩",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "elderly",
                },
            ],
            resultKeyPersonData: [
                {
                    id: 1,
                    xm: "艾宝",
                    xb: "女",
                    nl: "70",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 2,
                    xm: "岳静媛",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 3,
                    xm: "岳富家",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 4,
                    xm: "杨丽梅",
                    xb: "女",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 5,
                    xm: "朱熠轩",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 6,
                    xm: "何京鸽",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 7,
                    xm: "王子硕",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 8,
                    xm: "高佳",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
                {
                    id: 9,
                    xm: "王增学",
                    xb: "男",
                    nl: "72",
                    label: "独居人员",
                    type: "人员",
                },
            ],
            // 刑满释放
            params: {
                pageNum: 1,
                pageSize: 20,
                sfxmsf: "", //刑满释放
                sfcj: "", // 是否残疾
                sfdb: "", // 是否低保
                sfdj: "", // 是否独居
                sftyjr: "", // 退役军人
                sfkc: "", // 空巢
                zdry: "", // 人员姓名搜索
            },
            // 人员ID
            jmid: "",
        };
    },
    computed: {
        // 获取vuex state的变量
        ...mapState({
            zhzlListChange: (state) => state.app.zhzlListChange,
            isSubPageListShow: (state) => state.app.isSubPageListShow,
        }),
    },
    watch: {
        // 监听右侧内容是否显示如果显示就加载图表
        isSubPageListShow: {
            handler: function (newName) {
                if (newName) {
                    this.$nextTick(() => {
                        this.tableHeightFun();
                        window.addEventListener("resize", this.tableHeightFun);
                    });
                }
            },
            deep: true,
            // immediate: true
        },
        // 左侧内容点击
        getSeriveName: {
            handler: function (newName) {
                // console.log(newName);
                // var indexOf = newName.indexOf("老人");
                // if (indexOf != -1) {
                //     this.currentPage = 1; // 默认为第一页
                //     this.total = this.resultKeyPersonDataOld.length;
                //     this.resultPersonData = this.resultKeyPersonDataOld;
                // } else {
                //     this.currentPage = 1; // 默认为第一页
                //     this.total = this.resultKeyPersonData.length;
                //     this.resultPersonData = this.resultKeyPersonData;
                // }
            },
            deep: true,
            // immediate: true
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.tableHeightFun();
            // window.addEventListener("resize", this.tableHeightFun);
            window.addEventListener(
                "resize",
                this.antiShake(this.tableHeightFun, 500)
            );
        });
    },
    // 销毁window事件，不然会后错 Cannot read property 'offsetHeight' of undefined
    beforeDestroy() {
        window.removeEventListener("resize", this.tableHeightFun);
    },
    methods: {
        // 在 Input 值改变时触发 ,搜索获取的列表,忽略频繁执行
        searchValueChange: _.debounce(function (e) {
            this.params.zdry = e;
            this.params.pageNum = 1; // 默认请求第一页
            this.getZdRyListAll(this.params); // 请求列表数据
        }, 500),
        // 点击分页切换
        handleCurrentChange(page) {
            this.params.pageNum = page;
            this.getZdRyListAll(this.params);
        },
        // 刑满释放
        getXmstList() {
            this.params.pageNum = 1; // 默认请求第一页
            this.params.sfxmsf = "是"; //刑满释放
            this.params.sfcj = ""; // 是否残疾
            this.params.sfdb = ""; // 是否低保
            this.params.sfdj = ""; // 是否独居
            this.params.sftyjr = ""; // 退役军人
            this.params.sfkc = ""; // 空巢
            this.params.zdry = ""; // 人员姓名
            this.getZdRyListAll(this.params);
        },
        // 残疾人员
        getSfcjList() {
            this.params.pageNum = 1; // 默认请求第一页
            this.params.sfxmsf = ""; //刑满释放
            this.params.sfcj = "是"; // 是否残疾
            this.params.sfdb = ""; // 是否低保
            this.params.sfdj = ""; // 是否独居
            this.params.sftyjr = ""; // 退役军人
            this.params.sfkc = ""; // 空巢
            this.params.zdry = ""; // 人员姓名
            this.getZdRyListAll(this.params);
        },
        // 低保人员
        getSfdbList() {
            this.params.pageNum = 1; // 默认请求第一页
            this.params.sfxmsf = ""; //刑满释放
            this.params.sfcj = ""; // 是否残疾
            this.params.sfdb = "是"; // 是否低保
            this.params.sfdj = ""; // 是否独居
            this.params.sftyjr = ""; // 退役军人
            this.params.sfkc = ""; // 空巢
            this.params.zdry = ""; // 人员姓名
            this.getZdRyListAll(this.params);
        },
        // 是否独居
        getSfdjList() {
            this.params.pageNum = 1; // 默认请求第一页
            this.params.sfxmsf = ""; //刑满释放
            this.params.sfcj = ""; // 是否残疾
            this.params.sfdb = ""; // 是否低保
            this.params.sfdj = "是"; // 是否独居
            this.params.sftyjr = ""; // 退役军人
            this.params.sfkc = ""; // 空巢
            this.params.zdry = ""; // 人员姓名
            this.getZdRyListAll(this.params);
        },
        // 退役军人
        getTyjrList() {
            this.params.pageNum = 1; // 默认请求第一页
            this.params.sfxmsf = ""; //刑满释放
            this.params.sfcj = ""; // 是否残疾
            this.params.sfdb = ""; // 是否低保
            this.params.sfdj = ""; // 是否独居
            this.params.sftyjr = "是"; // 退役军人
            this.params.sfkc = ""; // 空巢
            this.params.zdry = ""; // 人员姓名
            this.getZdRyListAll(this.params);
        },
        // 空巢
        getSfkcList() {
            this.params.pageNum = 1; // 默认请求第一页
            this.params.sfxmsf = ""; //刑满释放
            this.params.sfcj = ""; // 是否残疾
            this.params.sfdb = ""; // 是否低保
            this.params.sfdj = ""; // 是否独居
            this.params.sftyjr = ""; // 退役军人
            this.params.sfkc = "是"; // 空巢
            this.params.zdry = ""; // 人员姓名
            this.getZdRyListAll(this.params);
        },
        // 获取右侧列表
        async getZdRyListAll(params) {
            const res = await this.$Http.getZdRyList(params);
            if (res.code == 0) {
                this.currentPage = 1; // 默认为第一页
                this.total = res.total;
                this.resultPersonData = res.rows;
                this.params.pageSize = this.pagesize;
                console.log(this.resultPersonData);
                // this.$nextTick(() => {});
            }
        },
        getPersonShInfo(id) {
            this.getRyShInfo({
                jmid: id,
                // jmid: "JM000671",
            });
        },
        // 人员ID搜索
        async getRyShInfo(params) {
            const res = await this.$Http.getRyShInfo(params);
            // console.log(res); // 手环信息
            if (res.code == 0) {
                this.wristbandInfo = res.data;
            }
        },
        // 获取vuex公共方法
        ...mapActions([
            "SETIsSubPageListShow",
            "SETMapToolbarIsActive",
            "SETIsMessageBoxShow",
        ]),
        // 计算获取表格的高度
        tableHeightFun() {
            // 判断如果页面存在则执行
            if (this.$refs.subPageList) {
                this.tableHeight.height =
                    this.$refs.subPageList.offsetHeight -
                    this.$refs.subPageListHeight.offsetHeight -
                    60 +
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
        //关闭右侧弹框
        rightCloseBtn() {
            this.SETIsSubPageListShow(false);
            this.SETMapToolbarIsActive(false);
        },
        // 双击表格一行执行事件
        tableRowDbclick(data) {
            // console.log(data + "双击");
        },
        // 重点人员列表的弹框
        keyTableRowClick(data) {
            this.jmid = data.jmid; // 人员搜索手环ID
            this.getRyShInfo({
                jmid: this.jmid,
                // jmid: "JM000671",
            });
            this.SETIsMessageBoxShow(true); // 打开弹框
            this.massageTitle = "人员信息";
            this.tableRowData = data;
            this.massageComponent = keyPersonelLayer; // 显示的组件
        },
    },
};
</script>
<style lang="less" scoped>
.subPageList {
    .rightCloseBtn {
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        cursor: pointer;
        color: #fff;
        font-size: 0.18rem;
    }
    .search {
        margin-bottom: 0.1rem;
        /deep/.el-input__inner {
            line-height: 0.4rem;
            height: 0.4rem;
            background: #26272c;
            border: none;
            color: #fff;
        }
    }
    .listTitle {
        // margin-bottom: 0.1rem;
        text-align: center;
        color: #fff;
        background: url(../../../assets/images/title4_Bg.png) no-repeat center;
        background-size: 100% 100%;
        line-height: 0.34rem;
    }
    /deep/.el-input__icon {
        height: 100%;
        width: 0.24rem;
        text-align: center;
        transition: all 0.3s;
        line-height: 0.4rem;
    }
}
</style>
