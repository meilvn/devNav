<template>
  <div v-if="showLoading" class="loading-overlay">
    <div class="loading-spinner">
      <!-- 一个简单的 SVG 旋转动画 -->
      <svg viewBox="0 0 50 50" width="40" height="40">
        <circle cx="25" cy="25" r="20" fill="none" stroke="#409eff" stroke-width="4" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ visible: boolean }>()

const showLoading = ref(props.visible);

const switchLoading = (visible: boolean) => {
  showLoading.value = visible;
}

defineExpose({
  switchLoading,
})
</script>

<style scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  pointer-events: none; /* 避免遮罩干扰点击，可根据需要修改 */
}
.loading-spinner svg {
  animation: rotate 1s linear infinite;
  transform-origin: center;
}
.loading-spinner circle {
  stroke-dasharray: 126;
  stroke-dashoffset: 126;
  animation: dash 1.5s ease-in-out infinite;
}
@keyframes rotate {
  100% { transform: rotate(360deg); }
}
@keyframes dash {
  0% { stroke-dashoffset: 126; }
  50% { stroke-dashoffset: 31.5; }
  100% { stroke-dashoffset: 126; }
}
</style>