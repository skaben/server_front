<template>
  <div class="alert-tracker">

    <b-dropdown aria-role="list" @change="setCurrent">
      <template #trigger="{ active }">
        <b-button
            :label="currentInfo"
            type="is-primary"
            :icon-right="active ? 'menu-up' : 'menu-down'" />
      </template>

      <b-dropdown-item aria-role="listitem" :value="a.id"
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
</template>

<script>
const bad_status =  {
        'name': 'UNKNOWN',
        'info': 'Актуальный статус не найден, проверьте базу'
      };

export default {

  data: () => {
    return {
      selectedAlert: {},
    }
  },

  computed: {
    alert() {
      let alert = this.$store.state.alert;
      if (alert) {
        alert = alert.sort((a,b) => a.order - b.order);
        return alert;
      } else {
        return [];
      }
    },
    currentInfo() {
      const {name, info} = this.isCurrent || bad_status;
      return `Текущий уровень: ${name} [${info}]`;
    },
    isCurrent() {
      return this.alert.filter(alert => alert.current)[0] || {};
    }
  },

  methods: {
    setCurrent(alertId) {
      this.$store.dispatch("setAlert", {id: alertId});
    }
  },

  mounted() {
    this.$store.dispatch("getAlert");
  }
}
</script>
<style>
  .alert-tracker {
    background: grey;
  }
</style>
