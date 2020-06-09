<template>
  <section>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
    <div>
      <div>
        <el-button type="primary" @click="getUserInfo">获取用户信息</el-button>
      </div>
      <div>
        <el-input v-model="name" placeholder="用户名"></el-input>
        <el-input
          v-model="password"
          placeholder="密码"
          type="password"
        ></el-input>
        <el-button type="success" @click="addUser">创建用户按钮</el-button>
        <el-button @click="goto">跳转测试</el-button>
      </div>
    </div>
  </section>
</template>
<script>
  import {mapActions} from "vuex";

  export default {
    name: "test",
    data() {
      return {
        name: "",
        password: "",
      };
    },
    methods: {
      ...mapActions("user", {
        getUserInfo: "getUserInfo",
        addUserAct: "addUser",
      }),
      goto() {
        this.$router.push({name: "Home"});
      },
      addUser() {
        this.addUserAct({username: this.name, password: this.password});
      },
    },
  };
</script>
