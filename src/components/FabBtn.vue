<template>
  <v-btn class="fab" :icon="icon" :color="color+80" :size="size" @click="handleClick"></v-btn>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: false,
    default: "mdi-plus"
  },
  color: {
    type: String,
    required: false,
    default: "primary"
  },
  size: {
    type: String,
    required: false,
    default: "normal"
  }
})
const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.fab {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 9999;
}
</style>
