<template lang="pug">
  #app(:class="['theme-'+theme]")
    router-view(@refresh="refresh")
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        theme: window.localStorage.getItem('theme') || 'default'
      }
    },
    methods: {
      refresh () {
        this.theme = window.localStorage.getItem('theme')
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
