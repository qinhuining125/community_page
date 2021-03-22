<template>
    <el-dialog
        class="messageBoxCon"
        :title="massageTitle"
        :visible="isFaceLareyShow"
        :modal="false"
        width="25%"
        :close-on-click-modal="false"
        @close="resetForm('ruleForm')"
    >
        <div class="personelInfo">
            <div class="oh">
                <img
                    class="fl"
                    src="../../assets/images/personImg.jpg"
                    id="img0"
                />
                <el-button
                    size="small"
                    type="primary"
                    class="btn-green"
                    @click="choiceImg"
                    id="btn"
                    style="margin-top: 50px"
                    >上传图片</el-button
                >
                <input
                    type="file"
                    name="file0"
                    id="file0"
                    ref="filElem"
                    multiple="multiple"
                    @change="changeFn($event)"
                />
                <div slot="tip" class="el-upload__tip color_green">
                    请上传需要识别的图像，格式.jpg、png等
                </div>
            </div>

            <!-- <img class="img" src="../../assets/images/personImg.jpg" alt="" />

            <el-row :gutter="10" class="txt">
                <el-upload
                    class="upload-demo"
                    style="margin-bottom: 50px"
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-success="successUpload"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :show-file-list="false"
                >
                    <el-button size="small" type="primary" class="btn-green">
                        点击上传
                    </el-button>
                    <div slot="tip" class="el-upload__tip color_green">
                        请上传需要识别的图像，格式.jpg、png等
                    </div>
                </el-upload>
            </el-row> -->
        </div>
        <el-row>
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="pass-ruleForm"
            >
                <el-form-item label="开始时间" prop="BeginTime">
                    <el-date-picker
                        size="small"
                        v-model="ruleForm.BeginTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择开始时间"
                        @change="timeChangeClk"
                    >
                    </el-date-picker>
                    <!-- <el-input
                        size="small"
                        type=""
                        v-model="ruleForm.BeginTime"
                        placeholder="2021-03-17 08:50:00"
                        autocomplete="off"
                    ></el-input> -->
                </el-form-item>
                <el-form-item label="结束时间" prop="EndTime">
                    <el-date-picker
                        size="small"
                        v-model="ruleForm.EndTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择结束时间"
                    >
                    </el-date-picker>
                    <!-- <el-input
                        size="small"
                        type=""
                        v-model="ruleForm.EndTime"
                        autocomplete="off"
                        placeholder="2021-03-18 08:59:00"
                    ></el-input> -->
                </el-form-item>
                <el-form-item label="最小相似度" prop="MinSimilarity">
                    <el-input
                        size="small"
                        type=""
                        v-model="ruleForm.MinSimilarity"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="最大相似度" prop="MaxSimilarity">
                    <el-input
                        size="small"
                        type=""
                        v-model="ruleForm.MaxSimilarity"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="限制条目" prop="LimitNum">
                    <el-input
                        size="small"
                        type=""
                        v-model="ruleForm.LimitNum"
                        placeholder="不能为0，也不能大于200"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <div class="txtC">
                    <el-button
                        size="small"
                        type="primary"
                        class="btn-green"
                        @click="submitForm('ruleForm')"
                        >人脸轨迹</el-button
                    >
                    <el-button
                        class="btn-green--border"
                        size="small"
                        @click="resetForm('ruleForm')"
                        >取 消</el-button
                    >
                </div>
            </el-form>
            <!-- <el-button @click="faceRrajectoryLogin">按钮</el-button> -->
            <!-- <el-col :span="24">
                <el-button
                    size="small"
                    type="primary"
                    class="btn-green"
                    @click="flightPosClk"
                >
                    人脸轨迹
                </el-button>
                <el-button
                    size="small"
                    type="primary"
                    class="btn-green"
                    @click="closeMessgeBtn"
                >
                    取消
                </el-button>
            </el-col> -->
        </el-row>
    </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
export default {
    /*
    tableRowData 当前点击表格的信息
    massageTitle 标题
    */
    props: ["tableRowData", "massageTitle"],
    components: {},
    data() {
        var BeginTime = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("起始时间不能为空"));
            }
            callback();
        };
        var EndTime = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("结束时间不能为空"));
            }
            callback();
        };
        var MinSimilarity = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("最小相似度不能为空"));
            }
            callback();
        };
        var MaxSimilarity = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("最大相似度不能为空"));
            }
            callback();
        };
        var LimitNum = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("条目不能为空"));
            }
            callback();
        };
        return {
            baseUrl: "http://172.16.0.10:8088/VIID/login",
            access_code: "",
            access_token: "",
            loginFlag: false,
            picbuf: {},
            dialogVisible: false,
            fileList: [],
            // 人脸轨迹测试数据
            faceCamList: [
                {
                    SnapTime: "2021-03-17 17:38:21",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-4@35-6B-79_1_big_0f9da3d2-834f-463b-bc59-55e083420b88.jpg?dev=cdvserver&fid=5602-14-1A2E8000A-2222673-62D52",
                    FaceRecID: "",
                    FaceSamevalue: "0.95149827",
                    FacecamCode: "35-6B-79_1",
                    Latitude: "37.803090693278",
                    Longitude: "112.576255857835",
                },
                {
                    SnapTime: "2021-03-17 21:59:55",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-9@35-6B-79_1_big_b391f2e7-5f36-416b-8ca3-401e0cf10ad5.jpg?dev=cdvserver&fid=5682-14-1AA68000A-9047-5285C",
                    FaceRecID: "",
                    FaceSamevalue: "0.38400373",
                    FacecamCode: "35-6B-79_1",
                    Latitude: "37.803090693278",
                    Longitude: "112.576255857835",
                },
                {
                    SnapTime: "2021-03-17 22:34:47",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-9@35-6B-71_1_big_8e38b051-9640-47c4-871d-69a27bab0b8b.jpg?dev=cdvserver&fid=5685-14-1ABE8000A-3156DE-63DC3",
                    FaceRecID: "",
                    FaceSamevalue: "0.38375118",
                    FacecamCode: "35-6B-71_1",
                    Latitude: "",
                    Longitude: "",
                },
                {
                    SnapTime: "2021-03-17 12:06:44",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-6@35-6B-79_1_big_68501568-990f-45ed-8040-f349d1cd2e60.jpg?dev=cdvserver&fid=5497-14-19868000A-2BBE4EA-631A4",
                    FaceRecID: "",
                    FaceSamevalue: "0.36699808",
                    FacecamCode: "35-6B-79_1",
                    Latitude: "37.803090693278",
                    Longitude: "112.576255857835",
                },
                {
                    SnapTime: "2021-03-17 12:18:38",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-5@35-6B-79_1_big_afad53fd-083d-45f2-bece-caf48a4be9d1.jpg?dev=cdvserver&fid=5517-14-198E8000A-115A8D7-66339",
                    FaceRecID: "",
                    FaceSamevalue: "0.36637086",
                    FacecamCode: "35-6B-79_1",
                    Latitude: "37.803090693278",
                    Longitude: "112.576255857835",
                },
                {
                    SnapTime: "2021-03-18 07:51:10",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-18/fs-5@35-6B-6F_1_big_03d71971-52e8-478b-89a4-ccbb9c8b2e79.jpg?dev=cdvserver&fid=5787-14-1B5E8000B-2B7D78-66798",
                    FaceRecID: "",
                    FaceSamevalue: "0.36074725",
                    FacecamCode: "35-6B-6F_1",
                    Latitude: "37.8039634602309",
                    Longitude: "112.576451665654",
                },
                {
                    SnapTime: "2021-03-17 15:34:57",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-2@35-6B-6A_1_big_124fd3a1-d023-413f-abe9-b3032203cdca.jpg?dev=cdvserver&fid=5568-14-1A068000A-158ED5-5F182",
                    FaceRecID: "",
                    FaceSamevalue: "0.3580659",
                    FacecamCode: "35-6B-6A_1",
                    Latitude: "37.8029989157571",
                    Longitude: "112.575477827681",
                },
                {
                    SnapTime: "2021-03-17 12:10:24",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-0@35-6B-79_1_big_307fcafa-38b8-4e87-bde8-ffd6c7748ec8.jpg?dev=cdvserver&fid=5497-14-19868000A-3469E88-6612E",
                    FaceRecID: "",
                    FaceSamevalue: "0.3567694",
                    FacecamCode: "35-6B-79_1",
                    Latitude: "37.803090693278",
                    Longitude: "112.576255857835",
                },
                {
                    SnapTime: "2021-03-17 13:17:30",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-0@35-6B-68_1_big_9485951a-c0ec-4482-8725-af1fcfe00948.jpg?dev=cdvserver&fid=5535-14-19AE8000A-386844-65A5A",
                    FaceRecID: "",
                    FaceSamevalue: "0.35660526",
                    FacecamCode: "35-6B-68_1",
                    Latitude: "37.8036431114725",
                    Longitude: "112.576469897274",
                },
                {
                    SnapTime: "2021-03-17 11:44:20",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-0@35-6B-79_1_big_d3cc4005-4342-4db0-be87-3c0b9a7aa935.jpg?dev=cdvserver&fid=5497-14-19868000A-C281FE-653FC",
                    FaceRecID: "",
                    FaceSamevalue: "0.35270745",
                    FacecamCode: "35-6B-79_1",
                    Latitude: "37.803090693278",
                    Longitude: "112.576255857835",
                },
                {
                    SnapTime: "2021-03-17 17:46:42",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-4@35-6B-79_1_big_14007e4b-1e2f-4d39-9091-27dc3ba7a54c.jpg?dev=cdvserver&fid=5602-14-1A2E8000A-35C3564-66263",
                    FaceRecID: "",
                    FaceSamevalue: "0.35250115",
                    FacecamCode: "35-6B-79_1",
                    Latitude: "37.803090693278",
                    Longitude: "112.576255857835",
                },
                {
                    SnapTime: "2021-03-18 06:14:10",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-18/fs-9@35-6B-68_1_big_4bf9d09f-7653-4c82-8ed1-8b8ba5103629.jpg?dev=cdvserver&fid=5761-14-1B368000B-63C0-6364B",
                    FaceRecID: "",
                    FaceSamevalue: "0.35206342",
                    FacecamCode: "35-6B-68_1",
                    Latitude: "37.8036431114725",
                    Longitude: "112.576469897274",
                },
                {
                    SnapTime: "2021-03-18 06:32:57",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-18/fs-2@35-6B-79_1_big_518b08d6-0eb3-4f22-aae2-e3e57b04eba9.jpg?dev=cdvserver&fid=5762-14-1B3E8000B-25C3C0-68851",
                    FaceRecID: "",
                    FaceSamevalue: "0.35115418",
                    FacecamCode: "35-6B-79_1",
                    Latitude: "37.803090693278",
                    Longitude: "112.576255857835",
                },
                {
                    SnapTime: "2021-03-17 17:02:41",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-9@35-6B-79_1_big_4ca4fadb-40ca-4211-b2d9-22074ce84d26.jpg?dev=cdvserver&fid=5582-14-1A268000A-15AD756-6420F",
                    FaceRecID: "",
                    FaceSamevalue: "0.3507543",
                    FacecamCode: "35-6B-79_1",
                    Latitude: "37.803090693278",
                    Longitude: "112.576255857835",
                },
                {
                    SnapTime: "2021-03-17 12:19:22",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-2@35-6B-5E_1_big_61548926-c97b-4f81-abff-9e96eb939d45.jpg?dev=cdvserver&fid=5517-14-198E8000A-1388E1D-61D17",
                    FaceRecID: "",
                    FaceSamevalue: "0.35026604",
                    FacecamCode: "35-6B-5E_1",
                    Latitude: "37.8033333185942",
                    Longitude: "112.576684862188",
                },
                {
                    SnapTime: "2021-03-17 11:44:59",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-7@35-6B-5E_1_big_85b55bd4-5c34-4f86-b19b-6f29446f2cb1.jpg?dev=cdvserver&fid=5497-14-19868000A-DD91B8-6671E",
                    FaceRecID: "",
                    FaceSamevalue: "0.34994614",
                    FacecamCode: "35-6B-5E_1",
                    Latitude: "37.8033333185942",
                    Longitude: "112.576684862188",
                },
                {
                    SnapTime: "2021-03-17 18:02:35",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-8@35-6B-79_1_big_f5a0c70e-3b3c-46f5-a3bf-39fd764055cf.jpg?dev=cdvserver&fid=5622-14-1A368000A-123177B-617CF",
                    FaceRecID: "",
                    FaceSamevalue: "0.3484139",
                    FacecamCode: "35-6B-79_1",
                    Latitude: "37.803090693278",
                    Longitude: "112.576255857835",
                },
                {
                    SnapTime: "2021-03-17 12:09:49",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-2@35-6B-68_1_big_1a74d6e1-178f-44ee-8941-7dc4a9f3c1f9.jpg?dev=cdvserver&fid=5497-14-19868000A-3242A5D-64847",
                    FaceRecID: "",
                    FaceSamevalue: "0.34829608",
                    FacecamCode: "35-6B-68_1",
                    Latitude: "37.8036431114725",
                    Longitude: "112.576469897274",
                },
                {
                    SnapTime: "2021-03-17 12:06:57",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-1@35-6B-5E_1_big_3f48f7da-47c8-4d8b-9696-3da4d51c671c.jpg?dev=cdvserver&fid=5497-14-19868000A-2C29EB2-66C1D",
                    FaceRecID: "",
                    FaceSamevalue: "0.3477278",
                    FacecamCode: "35-6B-5E_1",
                    Latitude: "37.8033333185942",
                    Longitude: "112.576684862188",
                },
                {
                    SnapTime: "2021-03-17 10:38:11",
                    SnapPicurl:
                        "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-17/fs-1@35-6B-6F_1_big_1639e09f-6305-4dab-bdff-ab44437ab444.jpg?dev=cdvserver&fid=5481-14-196E8000A-D61323-62BB7",
                    FaceRecID: "",
                    FaceSamevalue: "0.34422565",
                    FacecamCode: "35-6B-6F_1",
                    Latitude: "37.8039634602309",
                    Longitude: "112.576451665654",
                },
                // 开始
                // {
                //     SnapTime: "2021-03-09 10:05:41",
                //     SnapPicurl:
                //         "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-09/fs-2@35-6B-5E_1_big_358b5b97-795a-4a3f-96e3-136f4bca6662.jpg?dev=cdvserver&fid=2351-14-A1680002-368533-63BA1",
                //     FaceRecID: "",
                //     FaceSamevalue: "0.98688924",
                //     FacecamCode: "35-6B-5E_1",
                //     Latitude: "37.263",
                //     Longitude: "112.5932",
                // },
                // {
                //     SnapTime: "2021-03-09 10:27:17",
                //     SnapPicurl:
                //         "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-09/fs-5@35-6B-68_1_big_79fc854f-bcba-468f-b98e-b7406c0aa41e.jpg?dev=cdvserver&fid=2323-14-9EE80002-3EE3271-60E43",
                //     FaceRecID: "",
                //     FaceSamevalue: "0.96671623",
                //     FacecamCode: "35-6B-68_1",
                //     Latitude: "37.8036431114725",
                //     Longitude: "112.5436469897274",
                // },
                // {
                //     SnapTime: "2021-03-09 10:34:51",
                //     SnapPicurl:
                //         "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-09/fs-7@35-6B-68_1_big_581d4bb5-fe6c-4217-80cf-1b4d28054d43.jpg?dev=cdvserver&fid=2343-14-9FE80002-7B1019-61018",
                //     FaceRecID: "",
                //     FaceSamevalue: "0.96251804",
                //     FacecamCode: "35-6B-68_1",
                //     Latitude: "37.8036431114725",
                //     Longitude: "112.806469897274",
                // },
                // {
                //     SnapTime: "2021-03-09 10:37:41",
                //     SnapPicurl:
                //         "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-09/fs-6@35-6B-68_1_big_877d5ce7-3108-44e5-b4ce-eced373c8dee.jpg?dev=cdvserver&fid=2343-14-9FE80002-0-60C01",
                //     FaceRecID: "",
                //     FaceSamevalue: "0.95879716",
                //     FacecamCode: "35-6B-68_1",
                //     Latitude: "37.8036431114725",
                //     Longitude: "113.276469897274",
                // },
                // {
                //     SnapTime: "2021-03-09 10:38:10",
                //     SnapPicurl:
                //         "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-09/fs-5@35-6B-68_1_big_ab7e8b68-fd0e-4c39-9be1-8f498d125eda.jpg?dev=cdvserver&fid=2343-14-9FE80002-8811B8-62E69",
                //     FaceRecID: "",
                //     FaceSamevalue: "0.95062923",
                //     FacecamCode: "35-6B-68_1",
                //     Latitude: "37.8036431114725",
                //     Longitude: "114.576469897274",
                // },
                // {
                //     SnapTime: "2021-03-09 11:38:10",
                //     SnapPicurl:
                //         "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-09/fs-5@35-6B-68_1_big_ab7e8b68-fd0e-4c39-9be1-8f498d125eda.jpg?dev=cdvserver&fid=2343-14-9FE80002-8811B8-62E69",
                //     FaceRecID: "",
                //     FaceSamevalue: "0.95062923",
                //     FacecamCode: "35-6B-68_1",
                //     Latitude: "37.8036431114725",
                //     Longitude: "114.645469895244",
                // },
            ],
            formData: [],
            ruleForm: {
                BeginTime: "", // 起始时间
                EndTime: "", // 结束时间
                MinSimilarity: "", // 最小相似度
                MaxSimilarity: "", // 最大相似度
                LimitNum: "", //  限制条目
                imgUrl: "",
            },
            faceServeApi: "",
            rules: {
                BeginTime: [{ validator: BeginTime, trigger: "blur" }],
                EndTime: [{ validator: EndTime, trigger: "blur" }],
                MinSimilarity: [{ validator: MinSimilarity, trigger: "blur" }],
                MaxSimilarity: [{ validator: MaxSimilarity, trigger: "blur" }],
                MaxSimilarity: [{ validator: MaxSimilarity, trigger: "blur" }],
                LimitNum: [{ validator: LimitNum, trigger: "blur" }],
            },
        };
    },
    mounted() {
        this.$nextTick(() => {
            // 判断是开发环境还是线上环境
            if (process.env.NODE_ENV === "development") {
                // 开发环境执行事件
                console.log("开发环境");
                this.faceServeApi = "/faceRrajectoryServeApi";
            } else {
                // 线上打包环境执行事件
                console.log("线上环境");
                this.faceServeApi = myConfig.cameraServeApi;
            }
            // console.log(this.faceServeApi);
            // this.faceRrajectoryLogin();
        });
    },
    watch: {},
    computed: {
        // 获取vuex state的变量
        ...mapState({
            isFaceLareyShow: (state) => state.app.isFaceLareyShow,
        }),
    },
    methods: {
        // 点击时间触发事件
        timeChangeClk(value) {
            // console.log(value);
        },
        // 触发上传图片点击事件
        choiceImg() {
            // document.getElementById("file0").click();
            // console.log(docId);
            this.$refs.filElem.click();
        },
        // 提交表单
        submitForm(formName) {
            // var sortFaceCamList = res.data.Result.FaceCamList;
            // this.faceCamList.sort(this.sortData);
            // this.$mapView.flightPosFun.faceCamList = this.faceCamList; // 测试数据
            // this.flightPosClk();
            this.$refs[formName].validate((valid) => {
                if (this.ruleForm.imgUrl !== "") {
                    if (valid) {
                        this.faceRrajectoryLogin(); // 登录请求token
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                } else {
                    this.$message({
                        message: "请上传图片!",
                        type: "warning",
                    });
                }
            });
        },
        // 重置表单
        resetForm(formName) {
            this.closeMessgeBtn(); // 关闭弹框
            this.$refs[formName].resetFields();
        },
        // 第一步登录获取token
        faceRrajectoryLogin() {
            // console.log("登录人脸轨迹");
            axios
                // .post("http://172.16.0.201/service-wutanyuan/viid/api/login")
                .post(
                    myConfig.faceRrajectoryServeApi +
                        "/service-wutanyuan/viid/api/login"
                )
                .then((res) => {
                    if (res.data.code == 0) {
                        this.access_token = res.data.data.AccessToken;
                        if (this.access_token) {
                            // 第二步获取轨迹数据
                            this.doQueryTrackPic(); // 查询人脸轨迹
                        }
                    }
                })
                .catch((error) => {
                    // console.log(error);
                });
            // const res = await this.$Http.faceRrajectoryLogin();
            // console.log(res);
        },
        // 第二步查询人脸轨迹
        doQueryTrackPic() {
            var instance = axios.create({
                baseURL: this.faceServeApi,
                // baseURL: "",
                headers: {
                    Authorization: this.access_token,
                }, // 请求头
            });
            this.formData = new FormData();
            var data = {
                TimeScale: {
                    BeginTime: this.ruleForm.BeginTime,
                    EndTime: this.ruleForm.EndTime,
                },
                ThriftSearchInfo: {
                    NeedGetFaceFeature: 1,
                    IahrFaceBaseInfo: {
                        FaceFliterInfo: {
                            MinSimilarity: this.ruleForm.MinSimilarity,
                            MaxSimilarity: this.ruleForm.MaxSimilarity,
                        },
                    },
                    LimitNum: this.ruleForm.LimitNum - 0,
                },
            };
            this.formData.append("param", JSON.stringify(data));
            this.formData.append("picbuf", this.ruleForm.imgUrl);
            instance
                .post("/VIID/query/track", this.formData)
                .then((res) => {
                    console.log(res.data);
                    // 这里获取的路径
                    var sortFaceCamList = res.data.Result.FaceCamList;
                    sortFaceCamList.sort(this.sortData);
                    // console.log(sortFaceCamList);
                    this.$mapView.flightPosFun.faceCamList = sortFaceCamList;
                    // this.$mapView.flightPosFun.faceCamList = this.faceCamList; // 测试数据
                    // console.log(res.data.Result.FaceCamList);
                    // 获取轨迹后执行飞行事件
                    this.flightPosClk();
                    this.resetForm("ruleForm"); // 清空表单
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        // 排序
        sortData(a, b) {
            return (
                new Date(a.SnapTime.replace(/-/g, "/")) -
                new Date(b.SnapTime.replace(/-/g, "/"))
            );
        },
        ...mapActions(["SETIsFaceLareyShow"]),
        // 关闭弹框
        closeMessgeBtn() {
            // this.dialogVisible = false;
            this.SETIsFaceLareyShow(false);
            // 清空数据
            this.formData = [];
            this.ruleForm.imgUrl = "";
            $("#img0").attr(
                "src",
                "/page-wutanyuan/img/personImg.8502bb5d.jpg"
            ); // 显示默认图片
        },
        // 图片上传成功执行事件
        successUpload(response, file, fileList) {
            console.log(response, file, fileList);
        },
        // 删除图片执行事件
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        // 点击人脸轨迹按钮
        flightPosClk() {
            this.$mapView.flightPosFun.init();
        },
        // 上传图片
        changeFn(event) {
            var objUrl = this.getObjectURL(event.target.files[0]);
            this.ruleForm.imgUrl = event.target.files[0];
            console.log("objUrl = " + objUrl);
            if (objUrl) {
                $("#img0").attr("src", objUrl);
            }
            this.$refs.filElem.value = null;
        },
        //建立一個可存取到該file的url
        getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {
                // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
    },
};
</script>
<style lang="less" scoped>
.messageBoxCon {
    /deep/.el-dialog {
        width: 400px !important;
        height: 560px;
    }
    /deep/.el-form-item__error {
        padding: 0;
    }
    /deep/.el-input__inner {
        background-color: rgba(255, 255, 255, 0.4);
        border: none;
        color: #fff;
    }
    /deep/.el-form-item__label {
        color: #fff;
    }
    /deep/.el-dialog {
        min-width: 400px !important;
    }
    /deep/.el-form-item {
        margin-bottom: 14px;
    }
    .pass-ruleForm {
        // width: 100%;
        color: #fff;
    }
    /deep/.el-date-editor {
        width: 100%;
    }
    .personelInfo {
        padding: 20px 15px;
        // display: flex;
        img {
            width: 110px;
            height: 140px;
            margin-right: 20px;
            border-radius: 6px;
        }
        span {
            font-size: 13px !important;
            line-height: 24px;
        }
        .txt {
            // flex: 1;
            font-size: 12px;
        }
    }
    #file0 {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }
}
</style>
