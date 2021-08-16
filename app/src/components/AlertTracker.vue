<template>
  <div class="alert-tracker">

    <div>
        <b-progress
            :value="alertCounter.value"
            :max="maxAlertValue"
            :type="alertBar"
            show-value
            size="is-large"
            format="percent"
            class="progress-square"
            >
            <transition name="fade" mode="out-in">
              <span class="is-uppercase" :key="alertCounter.value">
                <span>{{ alertCounter.value }} / {{ maxAlertValue }}</span> : {{ currentInfo }}</span>
            </transition>
        </b-progress>
    </div>

    <div class="level mt-4">

      <div class="level-left">
        <p class="has-text-light is-family-monospace is-size-7">{{ lastChangeInfo }}</p>
      </div>

      <div class="level-right">

        <div class="level-item">
          <p v-if="alertCounter.value > 0" class="label pr-4 pt-1 has-text-light">Установить счетчик тревоги вручную:</p>
          <b-field v-if="alertCounter.value > 0">
            <b-numberinput
              expanded
              min-step="1"
              min="1"
              v-model="counterInnerValue"
              :max="maxAlertValue"
              :controls=false
              :placeholder="alertCounter.value"
              :editable="alertCounter.value > 0"
              />
              <p class="control">
                <b-button label="Сохранить" @click="setCounterValue"/>
              </p>
          </b-field>
        </div>

        <div class="level-item">
          <b-dropdown
            aria-role="list"
            position="is-bottom-left"
            :triggers="['contextmenu']"
            @change="setCurrent">
            <template #trigger="{ active }">
              <b-button
                  label="Выбор уровня из списка"
                  type="is-primary"
                  :icon-right="active ? 'menu-up' : 'menu-down'" />
            </template>

            <b-dropdown-item
              aria-role="listitem"
              :value="a.id"
              v-for="a in alert"
              :key=a.id
              >

              <b-icon
                pack="fas"
                icon="home"
                size="is-small"
                v-bind:style="{'color': a.fg_color}">
              </b-icon>

              [{{ a.name.toUpperCase() }}]
              {{ a.info }}

            </b-dropdown-item>

          </b-dropdown>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
const bad_status =  {
        'name': 'UNKNOWN',
        'info': 'Актуальный статус не найден, проверьте базу',
      };

export default {

  data: () => {
    return {
      selectedAlert: {},
      counterInnerValue: 0,
    }
  },

  computed: {
    alert() {
      let alert = this.$store.state.alertState;
      if (alert) {
        alert = alert.sort((a,b) => a.order - b.order);
        return alert;
      } else {
        return [];
      }
    },

    alertCounter() {
      const counter = this.$store.state.alertCounter;
      if (!counter) {
        return {'value': 0, 'comment': ''};
      } else {
        return counter;
      }
    },

    isCurrent() {
      return this.alert.filter(alert => alert.current)[0] || {};
    },

    maxAlertValue() {
      if (!this.alert) return 100;
      const playable = this.alert.slice(1, -1);
      return Math.max.apply(Math, playable.map(a => a.threshold));
    },

    alertBar() {
      const counter = this.alertCounter.value;
      if (counter >= this.maxAlertValue) {
        return "is-danger";
      } else if (counter >= this.maxAlertValue * 0.5) {
        return "is-warning";
      } else if (1 > counter < this.maxAlertValue * 0.5) {
        return "is-success";
      } else {
        return "is-info";
      }
    },

    currentInfo() {
      const {name, info} = this.isCurrent || bad_status;
      return `${name} [${info}]`;
    },

    lastChangeInfo() {
      let comment = '';
      if (this.alertCounter && this.alertCounter.comment) {
        comment = this.alertCounter.comment.slice(0,128);
      }
      return `last change: ${comment}`;
    },

  },

  methods: {
    setCurrent(alertId) {
      if (alertId !== this.isCurrent.id ) {
        this.$store.dispatch("setAlertState", {id: alertId});
      }
    },
    setCounterValue() {
      const value = this.counterInnerValue;
      if (value === 0) return;
      if (value > this.maxAlertValue) return;
      if (value !== this.alertCounter.value) {
        this.$store.dispatch("setAlertCounter", {value: value});
      }
    }
  },

  mounted() {
    this.$store.dispatch("getAlertState");
    this.$store.dispatch("getAlertCounter");
  }
}
</script>
<style>
  .progress-square progress {
    border-radius: 0 !important;
  }

  .progress.is-large {
    height: 2rem !important;
  }

  .progress-value {
    padding: 5px;
  }
</style>
