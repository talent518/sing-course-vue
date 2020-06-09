<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in list" :key="item.name">
      <el-link v-if="item.path" type="primary" @click="goto(item.path)">{{
        item.name
        }}
      </el-link>
      <span v-else>{{ item.name }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
  export default {
    name: "myBreadcrumb",
    props: {
      list: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    methods: {
      goto(path) {
        this.$router.push(path);
      },
    },
  };
</script>
