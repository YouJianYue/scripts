<template>
  <div id="app">
    <!--    <img src="./assets/logo.png">-->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="stylus">
::selection {
  background: #000;
  color: #fff;
}

body {
  font-family: 'Microsoft YaHei';
  background: #f6f6f6 !important;
}

#app {
  margin: 0;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>