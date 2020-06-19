<template></template>
<script>
  import {mapActions} from "vuex";

  export default {
    data() {
      return {
        code: undefined,
        redirect: undefined,
      };
    },
    methods: {
      ...mapActions("user", {
        userLogin: "userLogin",
        getUserInfo: "getUserInfo"
      }),
    },
    watch: {
      $route: {
        handler: function (route) {
          const query = route.query
          this.redirect = query.redirect;
          this.code = query.code;
          // debugger
          if (this.code) {
            this.userLogin({code: this.code}).then(() => {
              if (this.redirect) {
                this.$router.push(this.redirect);
              } else {
                this.$router.push('/');
              }
            });
          } else {
            let href = `${process.env.VUE_APP_SSO}site/sso?url=` + encodeURIComponent(window.location.href);
            window.location.href = href;
          }
        },
        immediate: true
      }
    }
  }
</script>
