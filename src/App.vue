<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
/* eslint-disable */
import Loader from '@/components/Loader.vue';
export default {
  components: {
    Loader
  },
}
</script>
<style>
    @import '../node_modules/bulma/css/bulma.css';
    @import '../node_modules/font-awesome/css/font-awesome.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
