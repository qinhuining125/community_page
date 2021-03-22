<template>
    <el-dialog
        class="messageBoxCon"
        :visible="dialogVisible"
        :modal="false"
        width="25%"
        :close-on-click-modal="false"
        @close="closeMessgeBtn"
    >
        <span slot="title" class="el-dialog__title"
            ><i class="el-icon-edit mr_10"></i>修改密码</span
        >
        <div class="personelInfo">
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="auto"
                class="pass-ruleForm pd_20"
            >
                <!-- <el-form-item label="登录名" prop="name">
                    <el-input size="small" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="旧密码" prop="oldPass">
                    <el-input
                        size="small"
                        type="password"
                        v-model="ruleForm.oldPass"
                        autocomplete="off"
                    ></el-input>
                </el-form-item> -->
                <el-form-item label="新密码" prop="pass">
                    <el-input
                        size="small"
                        type="password"
                        v-model="ruleForm.pass"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input
                        size="small"
                        type="password"
                        v-model="ruleForm.checkPass"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <div class="txtC">
                    <el-button
                        size="small"
                        type="primary"
                        class="btn-green"
                        @click="submitForm('ruleForm')"
                        >修 改</el-button
                    >
                    <el-button
                        class="btn-green--border"
                        size="small"
                        @click="resetForm('ruleForm')"
                        >取 消</el-button
                    >
                </div>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    props: ["dialogVisible"],
    components: {},
    data() {
        var name = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("名字不能为空"));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error("请输入数字值"));
                } else {
                    if (value < 18) {
                        callback(new Error("必须年满18岁"));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };

        var oldPass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输旧密码"));
            }
            callback();
        };
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateField("checkPass");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            password: "admin123",
            // dialogVisible: true,
            ruleForm: {
                oldPass: "",
                pass: "",
                checkPass: "",
                name: "",
            },
            rules: {
                oldPass: [{ validator: oldPass, trigger: "blur" }],
                pass: [{ validator: validatePass, trigger: "blur" }],
                checkPass: [{ validator: validatePass2, trigger: "blur" }],
                name: [{ validator: name, trigger: "blur" }],
            },
        };
    },
    mounted() {},
    watch: {},
    computed: {
        // 获取vuex state的变量
        ...mapState({
            // isMessageBoxShow: (state) => state.app.isMessageBoxShow,
        }),
    },
    methods: {
        ...mapActions(["SETIsMessageBoxShow"]),
        // 修改密码接口
        async changePassword(password) {
            const res = await this.$Http.resetPwd({ password: password }, true);
            console.log(res);
            if (res.code === 0) {
                this.$message({
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: "修改成功，请重新登录",
                    type: "success",
                });
                setTimeout(() => {
                    this.loginLink();
                }, 1000);
            } else {
                this.$message.error(res.msg);
            }
        },
        // 退出登录返回登录页面重新登录
        loginLink() {
            console.log("跳转登录");
            window.open(
                // "http://113.57.176.77:8585/service-wutanyuan/logout",
                myConfig.backgroundAddress + "/service-wutanyuan/logout",
                "_self"
            );
        },
        // 关闭弹框
        closeMessgeBtn() {
            this.$emit("closeMessgeBtn");
            this.resetForm("ruleForm"); // 清空表单
            // this.dialogVisible = !this.dialogVisible;
        },
        // 修改密码提交按钮事件
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 请求修改密码接口
                    this.changePassword(this.ruleForm.checkPass);
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 取消
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
};
</script>
<style lang="less" scoped>
.messageBoxCon {
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
        width: 100%;
        color: #fff;
    }
    .personelInfo {
        display: flex;
        img {
            width: 70px;
            height: 80px;
            margin-right: 10px;
        }
        span {
            font-size: 13px !important;
            line-height: 24px;
        }
        .txt {
            flex: 1;
            font-size: 12px;
        }
    }
}
</style>
