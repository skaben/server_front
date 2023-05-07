<script setup lang='ts'>
import AppNav from '@/components/layout/AppNav.vue'
</script>

<template lang='pug'>
v-app(theme="dark")
  AppNav
</template>

<style lang='scss' scoped>
.image {
  max-width: 48px;
  border: 2px solid rgba(0,0,0,0.3);
  border-radius: 50%;
}
</style>
