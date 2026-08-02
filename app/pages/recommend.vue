<template>
  <div class="flex bg-canvas-bg">
    <!-- 提交推荐页面，表单形式，参数对其schema中的navigation -->
    <UCard class="w-96 mx-auto">
      <UForm :state="state" :schema="schema" class="p-6 space-y-5">
        <UFormField label="标题" name="title">
          <UInput v-model="state.title" type="text" class="w-full" />
        </UFormField>
        <UFormField label="描述" name="description">
          <UTextarea v-model="state.description" type="text" class="w-full" />
        </UFormField>
        <UFormField label="分类" name="category_id">
          <USelect
            v-model="state.category_id"
            :items="categoryOptions"
            class="w-full"
          />
        </UFormField>
        <UFormField label="标签" name="tags">
          <UInputTags v-model="state.tags" type="text" class="w-full" />
        </UFormField>
        <UFormField label="URL" name="url">
          <UInput v-model="state.url" type="text" class="w-full" />
        </UFormField>
        <UButton type="submit" color="primary" size="xl" @click="handleSubmit">
          提交
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>
<script setup lang="ts">
import { z } from "zod";
const { showSuccessToast, showErrorToast } = useToastExtras();
const categories: any = useCategory();

const state = reactive({
  title: "",
  description: "",
  category_id: undefined,
  tags: [],
  url: "",
});

const categoryOptions = computed(() => {
  return categories.value.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));
});

const schema = z.object({
  title: z.string().min(1, "标题不能为空"),
  description: z.string().min(1, "描述不能为空"),
  category_id: z.number().min(1, "分类不能为空"),
  tags: z.array(z.string()).min(1, "标签不能为空"),
  url: z.string().min(1, "URL不能为空").url("URL格式错误"),
});

const handleSubmit = async () => {
  try {
    await $fetch("/api/navigations/submit", {
      method: "POST",
      body: {
        ...state,
        tags: state.tags.join(","),
      },
    });
    showSuccessToast("提交成功", "感谢您的参与，我们会尽快审核您的推荐");
    navigateTo("/");
  } catch (error: any) {
    showErrorToast("提交失败", error.data?.message || error.message);
  }
};
</script>
