<template>
  <div class="terminal-list">
    <terminal-control
      v-for="device in devices"
      :key="device.id"
      :device="device"
      :deviceType="deviceType"
    />
  </div>
</template>
<script>
import TerminalControl from './device/TerminalControl.vue'

export default {

  components: {
    TerminalControl
  },

  data: () => {
    return {
      deviceType: 'terminal'
    }
  },

  computed: {
    devices() {
      let devices = this.$store.state.terminals;
      if (devices) {
        devices = devices.sort((a,b) => a.id - b.id);
        return devices;
      } else {
        return [];
      }
    },
  },

  mounted() {
    this.$store.dispatch("getTerminalDevices");
  }
}
</script>
