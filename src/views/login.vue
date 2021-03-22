<template>
    <div class="loginBox">
        <div class="loginLogo">
            <img src="../assets/images/loginLogo.png" alt="" />
        </div>
        <div class="loginForm">
            <el-form
                :model="loginForm"
                status-icon
                :rules="rules"
                ref="loginForm"
                class="loginRuleForm"
            >
                <el-form-item prop="name">
                    <el-input
                        type="name"
                        v-model="loginForm.name"
                        autocomplete="off"
                        placeholder="用户名"
                        prefix-icon="iconfont iconav1"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input
                        type="password"
                        v-model="loginForm.pass"
                        placeholder="密码"
                        prefix-icon="iconfont iconmima"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item prop="code" class="code">
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-input
                                v-model.number="loginForm.code"
                                prefix-icon="iconfont iconcode"
                                placeholder="验证码"
                            ></el-input>
                        </el-col>
                        <el-col :span="8">
                            <img src="../assets/images/code.png" alt="" />
                        </el-col>
                    </el-row>
                </el-form-item>
                <div class="rememberPassword">
                    <el-checkbox v-model="loginForm.checked"
                        >记住密码</el-checkbox
                    >
                </div>
                <el-button
                    class="submitBtn"
                    type="primary"
                    @click="submitForm('loginForm')"
                >
                    登入
                </el-button>
            </el-form>
            <p class="copyright mt_20">
                2020 版权归苍穹数码技术股份有限公司所有
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        var loginName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("内容不能为空"));
            }
            callback();
        };
        var loginPass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            }
            callback();
        };
        return {
            loginForm: {
                name: "",
                pass: "",
                code: "",
                checked: false
            },
            rules: {
                name: [{ validator: loginName, trigger: "blur" }],
                pass: [{ validator: loginPass, trigger: "blur" }]
            }
        };
    },
    mounted() {},
    methods: {
        // 表单提交事件
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    sessionStorage.setItem("userToken", "token");
                    this.$router.push({
                        path: "/"
                    });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
@import "../assets/style/login.less";
</style>
