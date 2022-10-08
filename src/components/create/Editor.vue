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
  <v-dialog v-model="showImageUploader">
    <v-card>
      <v-card-text>
        <v-file-input
            v-model="uploadImages"
            :disabled="isUploading"
            :loading="isUploading"
            accept="image/*"
            label="选择一张图片"
            prepend-icon="mdi-image"
            show-size
            counter="counter"
            :error="uploadError"
            :error-messages="uploadErrorMessage"
        ></v-file-input>
      </v-card-text>
      <v-card-actions class="flex flex-column">
        <v-btn :color="primary" block="block" @click="uploadImage" :disabled="uploadImages[0]===undefined">上传</v-btn>
        <v-btn style="padding: 0;margin: 0" :color="primary" block="block"
               @click="$emit('update:showImageUploader',false)">关闭
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from "vue";
import {fetchX} from "../../service/frontend.ts";
import {backendApiUrl} from "../../configurations/config.ts";
import {primary} from "../../themes/color.js";

const props = defineProps({
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
  },
  showImageUploader: {
    type: Boolean,
    default: false,
    required: false
  }
})

const emit = defineEmits(['update:modelValue', 'update:showImageUploader'])

const isUploading = ref(false)
const uploadImages = ref([])
const uploadError = ref(false)
const uploadErrorMessage = ref("")

function uploadImage() {
  uploadError.value = false
  uploadErrorMessage.value = ""

  isUploading.value = true

  const formData = new FormData();
  formData.append('file', uploadImages.value[0]);

  fetchX(backendApiUrl + "/image/upload", {
    method: "POST",
    body: formData
  })
      .then(response => response.json())
      .then(json => {
        if (!json.success && json.code !== "image_repeated") {
          throw Error()
        }
        if (json.code === "image_repeated") {
          emit('update:modelValue', props.modelValue + `![](${json.message.split("at: ")[1].trim()})`)
        } else {
          emit('update:modelValue', props.modelValue + `![${json.data.storename}](${json.data.url})`)
        }
        uploadImages.value = []
        emit('update:showImageUploader', false)
      })
      .catch((err) => {
        console.log(err)
        uploadError.value = true
        uploadErrorMessage.value = "上传失败"
      })
      .finally(() => {
        isUploading.value = false
      })
}

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
