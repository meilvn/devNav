<template>
  <UInput
    v-model="inputValue"
    :placeholder="placeholder"
    :type="show ? 'text' : 'password'"
    :ui="{ trailing: 'pe-1' }"
    class="w-full"
    size="lg"
  >
    <template #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :aria-label="show ? 'Hide password' : 'Show password'"
        :aria-pressed="show"
        aria-controls="password"
        @click="show = !show"
      />
    </template>
  </UInput>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "请输入密码",
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = useVModel(props, "modelValue", emit);

const show = ref(false);
</script>
