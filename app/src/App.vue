<template>
  <div id="app" class="hero">
    <div class="hero-head">
      <app-header class="mt-3 py-1 my-1 px-5"/>
      <alert-tracker class="py-2 px-5"/>
    </div>
    <div class="hero-body">
      <div class="columns">
        <div class="column">
          <lock-list/>
        </div>
        <div class="column">
          <terminal-list/>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <notification-list/>
    </div>
  </div>
</template>

<script>
import AlertTracker from './components/AlertTracker.vue'
import NotificationList from './components/notification/NotificationList.vue';
import AppHeader from './components/AppHeader.vue';
import TerminalList from './components/TerminalList.vue';
import LockList from './components/LockList.vue';

export default {
  name: 'Skaben',
  components: {
    AlertTracker,
    AppHeader,
    NotificationList,
    TerminalList,
    LockList
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

.device-control {
  border: 1px solid black;
}

</style>
