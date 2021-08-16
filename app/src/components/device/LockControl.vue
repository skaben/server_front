<template>

    <div class="device-control">

      <div class="card" aria-id="content">

        <div class="device-header"
          :class="device.online ? 'has-background-success' : 'has-background-danger-light'">
          <div class="has-text-left px-4">
            <p class="is-uppercase is-size-7">
              <span class="has-text-dark">{{ deviceType }}</span>
              <span class="has-text-black-bis pl-5" v-if="device.override">УСТРОЙСТВО РАБОТАЕТ В ПРЯМОМ РЕЖИМЕ (НЕ РЕАГИРУЕТ НА СМЕНУ СТАТУСА БАЗЫ)</span>
            </p>
          </div>
          <div class="columns my-0 py-0">
              <div
                v-for="(item, index) in baseConfig"
                class="column py-0 has-text-centered"
                :key="index">
                <p class="is-size-6 is-bold">{{ item }}</p>
              </div>
          </div>
          <div
            class="is-centered has-background-grey has-text-light px-1 py-2"
            aria-controls="header">
            <div class="columns my-0 py-1 is-centered is-justify-content-space-between">
              <div
                class="column py-0 has-text-centered"
                v-for="(item, index) in statusList"
                :key="index"
                >
                <p class="is-size-5 is-centered is-justify-content-space-between">{{ item }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="controlsVisible" class="card-content">
          <div class="content">
            <b-field class="columns">
              <b-switch
                class="is-small column"
                v-model="state.closed"
                :value="true">
                замок {{ state.closed ? 'закрыт' : 'открыт' }}
              </b-switch>
              <b-switch
                class="is-small column"
                v-model="state.blocked"
                :value="true">
                устройство {{ state.blocked ? 'заблокировано' : 'разблокировано' }}
              </b-switch>
              <b-switch
                class="is-small column"
                v-model="state.sound"
                :value="true">
                лазерное поле {{ state.sound ? 'со звуком' : 'без звука' }}
              </b-switch>
              <b-switch
                class="is-small column"
                type="is-danger"
                v-model="state.override"
                :value="true">
                устройство управляется {{ state.override ? 'напрямую' : 'событиями сервера' }}
              </b-switch>
            </b-field>
            <b-field grouped>
              <b-field message="Установить таймер открытия замка">
                <b-numberinput
                  v-model="state.timer"
                  type="number"
                  :max=120
                  :min=0
                  :step=1>
                </b-numberinput>
              </b-field>
              <b-field expanded>
                <b-button expanded @click="toggleACL">{{ !aclVisible ? 'Показать' : 'Скрыть' }} управление ACL</b-button>
              </b-field>
            </b-field>
          </div>

          <div v-if="aclVisible">
            <p> {{ this.device.acl }}</p>
          </div>
        </div>


        <footer class="card-footer">
          <a class="card-footer-item" @click="toggleControls">
            <template>{{ controlsVisible ? 'Скрыть' : 'Показать' }} управление</template>
          </a>
          <a class="card-footer-item" :href="adminLink">Перейти в админку</a>
          <a v-if="controlsVisible" class="card-footer-item" @click="sendConfig">
            <template>Сохранить</template>
          </a>
        </footer>
      </div>
    </div>
</template>
<script>

const ROOT_URL = process.env.VUE_APP_ROOT_URL;

Object.filter = (obj, predicate) =>
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );


const shouldBeUpdated = [
  'blocked',
  'sound',
  'timer',
  'closed',
  'override'
]


export default {

  props: {
    device: {
      type: Object,
      default: () => {}
    },
    deviceType: {
      type: String
    }
  },

  data: () => {
    return {
      controlsVisible: false,
      aclVisible: false,
      state: {}
    }
  },

  computed: {
    isSound() { return this.device.sound ? 'звук включен' : 'звук выключен' },
    isBlocked() { return this.device.blocked ? 'устройство заблокировано' : '' },
    isOverrided() { return this.device.override ? 'прямое управление' : '' },
    isClosed() { return this.device.closed ? 'устройство закрыто' : 'устройство открыто' },
    statusList() {
      return [
        this.isSound,
        this.isBlocked,
        this.isClosed,
        this.isOverrided
      ].filter(item => item !== '');
    },
    baseConfig() {
      return [this.device.uid, this.device.info, this.device.ip]
    },
    adminLink() {
      return `${ROOT_URL}/admin/device/lock/${this.device.id}/change/`;
    },
  },

  methods: {
    setState() {
      shouldBeUpdated.forEach(key => {
        this.state[key] = this.device[key];
      });
    },

    sendConfig() {
      this.$store.dispatch('setLock', {
        id: this.device.id,
        payload: this.state
      })
      this.toggleActivated();
    },

    toggleACL() {
      this.aclVisible = this.aclVisible ? false : true;
    },

    toggleControls() {
      this.controlsVisible = this.controlsVisible ? false : true;
    },

    toggleActivated() {
      this.activated = this.activated ? false : true;
    }
  },

  mounted() {
    this.setState();
  }
}
</script>
<style>
  .device-control {
    max-width: 768px;
  }
</style>
