<template>
  <div class="lock-list">
    <p class="label has-text-black-bis">Управление замками:</p>
    <lock-control
      class="my-3"
      v-for="device in devices"
      :key="device.id"
      :device="device"
      :deviceType="deviceType"
    />
  </div>
</template>
<script>
import LockControl from './device/LockControl.vue'

export default {

  components: {
    LockControl
  },

  data: () => {
    return {
      deviceType: 'lock'
    }
  },

  computed: {
    devices() {
      let devices = this.$store.state.locks;
      if (devices) {
        devices = devices.sort((a,b) => a.id - b.id);
        return devices;
      } else {
        return [];
      }
    },
  },

  mounted() {
    this.$store.dispatch("getLockDevices");
  }
}
</script>
