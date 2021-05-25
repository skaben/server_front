<template>

  <div class="device-header"
    :class="device.online ? 'has-background-success' : 'has-background-danger-light'">
    <div class="has-text-left px-4">
      <p class="is-uppercase is-size-7">
        <span class="has-text-dark">{{ deviceType }}</span>
        <span class="has-text-black-bis pl-5" v-if="device.override">УСТРОЙСТВО РАБОТАЕТ В ПРЯМОМ РЕЖИМЕ (НЕ РЕАГИРУЕТ НА СМЕНУ СТАТУСА БАЗЫ)</span>
      </p>
    </div>
    <div
      class="is-centered has-background-grey has-text-light px-1 py-2"
      aria-controls="header">
      <div class="columns my-0 py-0">
          <div
            v-for="(item, index) in baseConfig"
            class="column py-0 has-text-centered"
            :key="index">
            <p class="is-size-6 is-bold">{{ item }}</p>
          </div>
      </div>
      <div class="columns my-0 py-1 is-centered is-justify-content-space-between">
        <div
          class="column py-0 has-text-centered"
          v-for="(item, index) in statusList"
          :key="index"
          >
          <p class="help is-centered is-justify-content-space-between">{{ item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    device: {
      type: Object,
      default: () => {}
    },
    deviceType: {
      type: String,
      required: true
    }
  },

  computed: {
    isPowered() {
      if (this.device.powered) {
        return 'питание подключено';
      } else if (this.device.powered === false) {
        return 'питание не подключено';
      } else {
        return '';
      }
    },
    isBlocked() {
      return this.device.blocked ? 'устройство заблокировано' : '';
    },
    isHacked() {
      return this.device.hacked ? 'устройство взломано' : '';
    },
    isOverrided() {
      return this.device.override ? 'прямое управление' : '';
    },
    isClosed() {
      if (this.device.closed) {
        return 'устройство закрыто';
      } else if (this.device.closed === false) {
        return 'устройство открыто';
      } else {
        return '';
      }
    },
    isSound() {
      if (this.device.sound) {
        return 'звук включен';
      } else if (this.device.closed === '') {
        return 'звук выключен';
      } else {
        return '';
      }
    },
    statusList() {
      return [
        this.isPowered,
        this.isBlocked,
        this.isHacked,
        this.isSound,
        this.isClosed,
        ].filter(item => item !== '');
    },
    baseConfig() {
      return [this.device.uid, this.device.info, this.device.ip]
    }
  },
}
</script>
<style scoped>
</style>
