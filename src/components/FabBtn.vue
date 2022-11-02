<template>
  <v-btn class="fab" :icon="icon" :color="color+80" :size="size" @click="handleClick">
    <slot></slot>
  </v-btn>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
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
  },
  position: {
    type: Object,
    required: false,
    default: {
      bottom: "16px",
      right: "16px"
    }
  },
})

const bottom = computed(() => props.position.bottom)
const right = computed(() => props.position.right)

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.fab {
  position: fixed;
  bottom: v-bind(bottom);
  right: v-bind(right);
  z-index: 9999;
}
</style>
