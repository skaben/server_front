<template>
  <div class="device-control">
    <div class="card" aria-id="content">
      <device-header :device="device" :deviceType="deviceType"/>

      <div v-if="controlsVisible" class="card-content">
        <div class="content">
          <b-field class="columns">
            <b-switch
              class="is-small column"
              v-model="powered"
              :value="true">
              питание {{ powered ? 'подключено' : 'отключено' }}
            </b-switch>
            <b-switch
              class="is-small column"
              v-model="blocked"
              :value="true">
              устройство {{ blocked ? 'заблокировано' : 'разблокировано' }}
            </b-switch>
            <b-switch
              class="is-small column"
              v-model="hacked"
              :value="true">
              устройство {{ hacked ? 'взломано' : 'не было взломано' }}
            </b-switch>
            <b-switch
              class="is-small column"
              type="is-danger"
              v-model="override"
              :value="true">
              устройство управляется {{ override ? 'напрямую' : 'событиями сервера' }}
            </b-switch>
          </b-field>
        </div>
      </div>

      <footer class="card-footer">
        <a class="card-footer-item" @click="toggleControls">
          <template>{{ controlsVisible ? 'Скрыть' : 'Показать' }} управление</template>
        </a>
        <a v-if="controlsVisible" class="card-footer-item" @click="sendConfig">
          <template>Сохранить</template>
        </a>
      </footer>
    </div>
  </div>
</template>
<script>
import DeviceHeader from './DeviceHeader.vue'

const stateItems = ['hacked', 'blocked', 'override', 'powered'];

Object.filter = (obj, predicate) =>
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );


export default {

  components: {
    DeviceHeader,
  },

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
      powered: false,
      blocked: false,
      hacked: false,
      override: false,
      controlsVisible: false,
    }
  },

  computed: {
    getConfig() {
      return {
        'powered': this.powered,
        'hacked': this.hacked,
        'blocked': this.blocked,
        'override': this.override
      }
    },
  },

  methods: {
    toggleControls() {
      this.controlsVisible = this.controlsVisible ? false : true;
    },
    setState() {
      stateItems.forEach(key => {
        if (typeof this.device[key] === 'boolean') {
          this[key] = this.device[key];
        }
      });
    },
    sendConfig() {
      this.$store.dispatch('setTerminal', {
        id: this.device.id,
        payload: this.getConfig
      })
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
