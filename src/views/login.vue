<template></template>
<script>
  import {mapActions} from "vuex";

  export default {
    data() {
      return {
        code:undefined,
        redirect:undefined,
      };
    },
    methods: {
      ...mapActions("user", {
        userLogin: "userLogin",
        getUserInfo:"getUserInfo"
      }),
    },
    watch: {
      $route: {
        handler: function(route) {
            const query = route.query
            this.redirect = query.redirect;
            this.code=query.code;
            if(this.code){
              this.userLogin({code:this.code}).then(()=>{
                    if(this.redirect){
                      this.$router.push(redirect);
                    }else{
                      this.$router.push('/');
                    }
              });
            }else{
              window.location.href='http://sso.test.changchangenglish.com/site/sso?url='+encodeURIComponent(window.location.href);
            }
        },
        immediate: true
      }
    }
  }
</script>
