<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-4 text-center">文件上传</h1>
    <input
      type="file"
      class="border p-2 mb-4 w-full rounded-md bg-white"
      @change="onFileSelected"
    />
    <div v-if="isUploading" class="text-blue-500 text-lg font-semibold mb-2">
      正在上传...
    </div>
    <div
      v-if="uploadProgress > 0 && uploadProgress < 100"
      class="text-green-500 text-lg font-semibold mb-2"
    >
      上传进度：{{ uploadProgress }}%
    </div>
    <button
      class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full"
      v-if="selectedFile &&!isUploading"
      @click="startUpload"
    >
      上传文件
    </button>
    <div v-if="uploadSuccess" class="text-green-500 text-lg font-semibold mb-2">
      文件上传成功！
    </div>
    <div v-if="uploadError" class="text-red-500 text-lg font-semibold mb-2">
      文件上传失败！
    </div>
    <div v-if="uploadSuccessList.length > 0">
      <h2 class="text-2xl font-bold mt-8 mb-4">上传成功列表</h2>
      <ul class="list-disc pl-8">
        <li v-for="file in uploadSuccessList" :key="file">{{ file }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Role = 'admin' | 'user' | 'guest';
type Action = 'create' | 'edit' | 'delete' | 'view';

// 文件上传相关状态
const selectedFile = ref<File | null>(null);
const isUploading = ref(false);
const uploadProgress = ref(0);
const uploadSuccess = ref(false);
const uploadError = ref(false);
const uploadSuccessList = ref<string[]>([]);

const onFileSelected = (event: any) => {
  selectedFile.value = event.target.files[0];
};

const startUpload = async () => {
  if (!selectedFile.value) return;

  isUploading.value = true;
  uploadSuccess.value = false;
  uploadError.value = false;

  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        uploadProgress.value = percentCompleted;
      },
    });

    if (response.ok) {
      uploadSuccess.value = true;
      uploadSuccessList.value.push(selectedFile.value.name);
    } else {
      uploadError.value = true;
    }
  } catch (error) {
    uploadError.value = true;
  } finally {
    isUploading.value = false;
    selectedFile.value = null;
  }
};
</script>

<style scoped>
/* 可以添加一些自定义的 Tailwind CSS 类来进一步美化样式 */
</style>