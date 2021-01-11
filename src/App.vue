<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
    export default {
        name: 'app',
        created () {
            document.title = "SERO";
        }
    }
</script>

<style>
  @import './assets/styles/index.css';
</style>