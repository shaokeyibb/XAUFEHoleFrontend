<template>
  <div class="main-editor-container">
    <v-textarea
        outlined
        :label="label"
        :model-value="modelValue"
        @update:modelValue="(val)=>$emit('update:modelValue', val)"
        :auto-grow="true"
        :autofocus="true"
        hint="编辑器支持 Markdown 语法"
        :clearable="true"
        :loading="loading"
        :disabled="disabled"
        :error="error"
        :error-messages="errorMessage"
    ></v-textarea>
  </div>
  <v-spacer class="my-3"></v-spacer>
  <div class="main-editor-preview-container">
    <v-card variant="outlined">
      <v-card-item>
        <v-card-subtitle>预览</v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <div class="main-editor-preview">
          <vue-showdown id="preview" :markdown="modelValue"></vue-showdown>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: "今天又遇到了什么烦心事？"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])

</script>

<style scoped>
.main-editor-preview-container {
  display: flex;
  flex-direction: column;
}

/*.main-editor-preview >>> img {*/
/*  max-width: 100%;*/
/*  max-height: 100%;*/
/*}*/
</style>
