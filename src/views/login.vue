<template>
  <section :class="$style.login">
    <div class="login-left">
      <img :src="loginMain" class="login-img-main"/>
    </div>
    <div class="login-right flexCenterV">
      <img :src="headImage" class="loginLogo"/>
      <h1 class="title">课程中台</h1>
      <el-form
        :model="user"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="width: 320px;"
      >
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="登录名">
            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i
            ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" type="password" placeholder="密码">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i
            ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="w100"
            type="warning"
            @click="submitForm('ruleForm')"
          >{{ login }}
          </el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>
<script>
  import {mapActions} from "vuex";
  import loginMain from "@/assets/image/login/login-main.png";
  import headImage from "@/assets/image/login/head.png";

  export default {
    data() {
      return {
        username: "用户名",
        passwordName: "密码",
        title: "用户登录",
        login: "登录",
        loginMain,
        headImage,
        user: {
          username: "",
          password: "",
        },
        rules: {
          username: [
            {
              required: true,
              message: "用户名不能为空",
              trigger: ["blur", "change"],
            },
          ],
          password: [
            {
              required: true,
              message: "请输入密码",
              trigger: ["blur", "change"],
            },
          ],
        },
      };
    },
    methods: {
      ...mapActions("user", {
        userLogin: "userLogin",
      }),
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let d = await this.userLogin(this.user);
            setTimeout(() => {
              this.$router.push({name: "home1"});
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    mounted() {
      document.addEventListener("keyup", enterE.bind(this));
    },
    beforeDestroy() {
      document.removeEventListener("keyup", enterE.bind(this));
    },
  };

  function enterE(e) {
    if (e.keyCode == 13) {
      this.submitForm("ruleForm");
    }
  }
</script>
<style lang="scss" module>
  .login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  .myTitle {
    margin-bottom: 10px;
  }
</style>
<style lang="scss">
  .login-left {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 60%;
    background: linear-gradient(180deg, #fae3bb 0%, #fbcb71 100%);
  }

  .login-img-main {
    max-height: 68%;
    max-width: 57%;
  }

  .login-right {
    flex: 1;
    background-color: #fff;
    .el-form-item__content {
      margin-left: 0 !important;
    }
    .loginLogo {
      display: block;
      margin: 0 auto 20px;
      width: 318px;
    }
    .title {
      margin-bottom: 64px;
      height: 24px;
      line-height: 24px;
      color: #925023;
      font-size: 24px;
      font-weight: 500;
      text-align: center;
    }
  }
</style>
