<script lang='ts'>
import skabenLogo from '@/assets/img/logo.svg'
import { defineComponent } from 'vue'
import { RESOURCE_LINKS } from '@/common/constants'

export default defineComponent({
  data: () => ({
    logo: skabenLogo,
    drawer: false,
    rail: true,
    links: [...RESOURCE_LINKS].sort((a, b) => a.name.localeCompare(b.name)),
  }),
})
</script>

<template lang='pug'>
v-layout
  v-navigation-drawer(
    permanent
    :rail='rail'
  )
    v-list(
      density="compact"
      nav
    )
      v-list-item.header-item(
        :link='true'
        :rounded='false'
        :prepend-icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
        title="SKABEN"
        subtitle="web control"
        nav
        @click="rail = !rail"
      )
      v-divider
      v-list-item(
        v-for='resource, index in links'
        :key='index'
        :href='resource.href'
        :rounded='false'
        :prepend-icon="resource.icon"
      ) {{ resource.name }}
</template>

<style lang='scss' scoped>
.v-list-item.header-item :deep(.v-list-item__overlay) {
  opacity: 0;
}
</style>
