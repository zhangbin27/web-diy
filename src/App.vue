<template lang="pug">
  #app(:class="['theme-'+theme]")
    router-view
</template>

<script>
  // z todo 导出配置功能
  export default {
    name: 'App',
    data () {
      return {
        theme: window.localStorage.getItem('theme') || 'default'
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }
</style>
