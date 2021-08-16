<template>
  <div class="header level">
    <div class="level-left">
      <p class="title has-text-light">SKABEN KONTROL</p>
    </div>
    <div class="level-right">
      <div
        class="level-item"
        v-for="link in links"
        :key=link[0]
        >
        <a
          target="_blank"
          class="button is-info has-text-light"
          :href="link[1]">
          <span class="header-link">{{ link[0] }}</span>
        </a>
      </div>
      <a
        @click="sendUpdate"
        class="level-item button is-danger header-link">
        Принудительное обновление
      </a>

    </div>
  </div>
</template>
<script>
const ROOT_URL = '127.0.0.1';

export default {
  data: () => {
    return {
      links: [
        ['Мониторинг очередей', `http://${ROOT_URL}:15672`],
        ['Конфигурация', `http://${ROOT_URL}/admin`],
        ['Просмотр API', `http://${ROOT_URL}/api`]
      ]
    }
  },

  methods: {
    sendUpdate() {
      this.$store.dispatch("updateAll");
    },

  },

}
</script>
<style scoped>
  .header-link {
    font-family: monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
</style>