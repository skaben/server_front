<template>
  <div id="app">
    <alert-tracker/>
  </div>
</template>

<script>
import AlertTracker from './components/AlertTracker.vue'

export default {
  name: 'Skaben',
  components: {
    AlertTracker,
  }
}
</script>

<style>
body, html {
  overflow-x: hidden;
  background-color: darkgrey;
  min-height: 100vh;
  min-width: 100vw;
}
</style>
