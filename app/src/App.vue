<template>
  <div id="app" class="hero">
    <div class="hero-head">
      <app-header class="mt-3 py-1 my-1 px-5"/>
      <alert-tracker class="py-2 px-5"/>
    </div>
    <div class="hero-body">
      <device-control/>
    </div>
    <div class="hero-foot">
      <notificaton-list/>
    </div>
  </div>
</template>

<script>
import AlertTracker from './components/AlertTracker.vue'
import NotificatonList from './components/notification/NotificationList.vue';
import AppHeader from './components/AppHeader.vue';
import DeviceControl from './components/DeviceControl.vue';

export default {
  name: 'Skaben',
  components: {
    AlertTracker,
    AppHeader,
    DeviceControl,
    NotificatonList
  }
}
</script>

<style>

body, html {
  overflow-x: hidden;
  background-color: rgb(83, 83, 83);
  min-height: 100vh;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

 /* Hide scrollbar for Chrome, Safari and Opera */
body::-webkit-scrollbar {
  display: none;
}

</style>
