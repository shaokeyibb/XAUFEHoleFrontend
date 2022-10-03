<template>
  <div class="tag-selector">
    <v-combobox
        :model-value="modelValue"
        @update:modelValue="handleModelValueChange"
        :items="tags"
        label="添加标签"
        :hint="'最大可添加 '+maxTags+' 个标签，如果下拉框中没有您想要的标签，则您可以手动输入一个，并通过按下 Enter 键以确认输入'"
        persistent-hint
        hide-selected
        multiple
        chips
        :disabled="disabled"
    ></v-combobox>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Array,
    default: []
  },
  maxTags: {
    type: Number,
    default: 2
  },
  tags: {
    type: Array,
    default: []
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:modelValue'])

function handleModelValueChange(newVal) {
  emits('update:modelValue', newVal.slice(0, props.maxTags))
}
</script>

<style scoped>

</style>
