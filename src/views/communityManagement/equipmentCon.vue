<template>
    <div class="equipmentCon publicStyle_bg2 subPageLeftCon">
        <div class="content">
            <dl class="total">
                <dt class="fl">
                    <img
                        src="../../assets/images/communityManagement_icon4.png"
                        alt=""
                    />
                </dt>
                <dd class="fr">
                    <h5>97</h5>
                    <h6>设备总数</h6>
                </dd>
            </dl>
            <!-- 设备总数 -->
            <list-con
                :list="equipmentLeftList"
                @getCount="getEquipmentCount"
                ref="equipmentLeftListRef"
            ></list-con>
            <!-- 设备概况 -->
            <state-list
                ref="equipmentNumberStateRef"
                :list="equipmentNumberState"
                :title="title"
                @stateChage="stateChage"
            ></state-list>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import listCon from "@/components/quantityDisplayList.vue";
import stateList from "@/components/stateList.vue";
export default {
    components: {
        listCon,
        stateList
    },
    data() {
        return {
            title: {
                name: "设备概况",
                state1: "异常",
                state2: "总数"
            },
            equipmentNumberState: [
                {
                    txt: "摄像头",
                    outNumber: 0,
                    enterNumber: 3,
                    type: "SXT"
                },
                {
                    txt: "烟感",
                    outNumber: 3,
                    enterNumber: 14,
                    type: "YG"
                },
                {
                    txt: "水表",
                    outNumber: 3,
                    enterNumber: 30,
                    type: "SB"
                },
                {
                    txt: "井盖",
                    outNumber: 1,
                    enterNumber: 15,
                    type: "JG"
                },
                {
                    txt: "手环",
                    outNumber: 3,
                    enterNumber: 35,
                    type: "JG"
                },
                {
                    txt: "闸机",
                    outNumber: 3,
                    enterNumber: 35,
                    type: "ZG"
                }
            ],
            equipmentLeftList: [
                {
                    name: "设备异常",
                    number: 10
                }
            ],
            tableDolumnData: [
                // 表头数据
                { label: "序号", prop: "id", width: "25%" },
                { label: "设备类型", prop: "sbType", width: "25%" },
                { label: "设备名称", prop: "name", width: "25%" },
                { label: "设备状态", prop: "state", width: "25%" }
            ],
            resultData: [
                {
                    id: 1,
                    sbType: "摄像头",
                    name: "充电桩01",
                    state: "在线",
                    type: "cdz",
                    syrl: "50",
                    dtdy: "220",
                    wd: "36",
                    local: "一栋一单元"
                }
            ]
        };
    },
    watch: {},
    computed: {},
    methods: {
        // 获取vuex的方法
        ...mapActions(["SETTableDolumnData", "SETTableResultData"]),
        // 设备概况
        stateChage(item, idx) {
            this.$refs.equipmentLeftListRef.isActive = -1;
            this.$refs.equipmentNumberStateRef.isActive = idx;
            this.SETTableDolumnData(this.tableDolumnData); // 赋值表格栏目
            this.SETTableResultData(this.resultData); // 赋值表格数据
            // console.log(item.txt);
        },
        getEquipmentCount(item, idx) {
            this.$refs.equipmentNumberStateRef.isActive = -1;
            this.$refs.equipmentLeftListRef.isActive = idx;
            this.SETTableDolumnData(this.tableDolumnData); // 赋值表格栏目
            this.SETTableResultData(this.resultData); // 赋值表格数据
            // console.log(item);
        }
    },
    created() {},
    mounted() {}
};
</script>
<style lang="less" scoped>
.equipmentCon {
    position: fixed;
    left: 0;
    top: 8.7vh;
    width: 10%;
    .total {
        padding: 0.1rem;
        overflow: hidden;
        text-align: right;
        dt {
            img {
                width: 0.42rem;
                height: 0.42rem;
            }
        }
        dd {
            h5 {
                font-family: "jixieziti";
                font-size: 0.24rem;
            }
            h6 {
                font-size: 0.15rem;
                color: #fee67c;
            }
        }
    }
}
</style>
