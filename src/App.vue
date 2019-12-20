<template>
  <div id="app">
    <!-- <router-view /> -->
    <van-nav-bar
      :title="title"
      left-arrow
      fixed 
      @click-left="$router.go(-1)"
      :leftArrow="!$route.query.from"
    />
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  computed:{
    title(){
      return this.$route.meta.title
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 46px;
  color: #2c3e50;
}
.van-button{
  height: 45px;
  font-size: 16px;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
