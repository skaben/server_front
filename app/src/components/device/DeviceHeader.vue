<template>

  <div class="device-header">
    <div class="has-text-left px-4 has-background-grey-darker">
      <p class="is-uppercase is-size-7">
        <span class="has-text-light">{{ deviceType }}</span>
        <span class="has-text-danger pl-5" v-if="device.override">УСТРОЙСТВО РАБОТАЕТ В ПРЯМОМ РЕЖИМЕ (НЕ РЕАГИРУЕТ НА СМЕНУ СТАТУСА БАЗЫ)</span>
      </p>
    </div>
    <div
      class="is-centered has-background-grey has-text-light px-1 py-2"
      aria-controls="header">
      <div class="columns my-0 py-0">
          <div
            class="column py-0 has-text-centered"
            v-for="(item, index) in baseConfig"
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
      return this.device.powered ? 'питание подключено' : 'питание не подключено';
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
    statusList() {
      return [this.isPowered, this.isBlocked, this.isHacked].filter(item => item !== '');
    },
    baseConfig() {
      return [this.device.uid, this.device.info, this.device.ip]
    }
  }

}
</script>
<style scoped>
</style>
