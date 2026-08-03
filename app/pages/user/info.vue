<template>
  <UCard class="w-128 mx-auto">
    <UHeader>
      <template #title><span></span></template>
      <h1 class="text-2xl font-bold">用户信息</h1>
    </UHeader>
    <UForm :state="state" @submit.prevent="onSubmit" class="p-6 space-y-5">
      <UFormField label="头像" name="image">
        <UFileUpload
          v-slot="{ open, removeFile }"
          accept="image/*"
          @update:modelValue="onUploadImage"
        >
          <div
            class="flex flex-wrap justify-center align-center items-center gap-3"
          >
            <UAvatar
              size="3xl"
              :src="state.image ? state.image : undefined"
              :icon="isUploading ? 'i-lucide-loader-circle' : 'i-lucide-image'"
            />
            <div class="flex flex-col">
              <UButton
                :label="state.image ? '更换' : '上传'"
                color="primary"
                variant="link"
                @click="open()"
              />  
              <UButton
                v-if="state.image"
                label="删除"
                color="error"
                variant="link"
                @click="removeFile()"
              />
            </div>
          </div>
        </UFileUpload>
      </UFormField>
      <UFormField label="昵称" name="nickname">
        <UInput v-model="state.name" type="text" class="w-full" />
      </UFormField>
      <UFormField label="签名" name="signature">
        <UTextarea v-model="state.signature" type="text" class="w-full" />
      </UFormField>
      <UFormField label="性别" name="gender">
        <URadioGroup
          v-model="state.gender"
          orientation="horizontal"
          variant="list"
          :items="items"
        />
      </UFormField>
      <UFormField label="出生日期" name="birthDate">
        <UInputDate
          v-model="state.birthDate"
          icon="i-lucide-calendar"
          class="w-full"
        />
      </UFormField>
      <UFormField label="邮箱" name="email">
        <UInput v-model="state.email" type="email" disabled class="w-full" />
      </UFormField>

      <UButton type="submit" color="primary" size="xl" class="mr-2">
        保存
      </UButton>
      <UButton type="button" color="neutral" size="xl"> 修改密码 </UButton>
    </UForm>
  </UCard>
</template>
<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";

const auth = useAuth();
const { data: session } = await useAuthSession();
const { showErrorToast, showSuccessToast } = useToastExtras();

const items = ref([
  { label: "男", value: "male" },
  { label: "女", value: "female" },
]);

const state = reactive<{ [key: string]: any }>({
  name: "",
  image: "",
  signature: "",
  gender: "",
  birthDate: null,
  email: "",
});

const isUploading = ref(false);

onMounted(() => {
  const {
    user,
  } = session.value || {};
  if (user) {
    Object.keys(state).forEach((key: string) => {
      if (key === "birthDate") {
        const [year, month, day] = user[key].split("-").map(Number);
        state[key] = shallowRef(new CalendarDate(year, month, day));
      } else {
        state[key] = user[key];
      }
    });
  }
});

const onUploadImage = async (file: File | null | undefined) => {
  if (!file) return;
  try {
    isUploading.value = true;
    const formData = new FormData();
    formData.append("file", file);
    const data = await $fetch("/api/upload/avatar", {
      method: "POST",
      body: formData,
    });
    if (data.tempUrl) {
      state.image = data.tempUrl;
    }
  } catch (err: any) {
    showErrorToast("上传失败", err.data?.message || err.message || "");
  } finally {
    isUploading.value = false;
  }
};

const onSubmit = async () => {
  try {
    const { year, month, day } = state.birthDate;
    const { error } = await auth.updateUser({
      name: state.name,
      image: state.image,
      signature: state.signature,
      gender: state.gender,
      birthDate: `${year}-${month}-${day}`,
    } as any);
    if (error) {
      showErrorToast("更新失败", error.message || "");
      return;
    }
    showSuccessToast("更新成功");
  } catch (err: any) {
    showErrorToast("网络错误", err.message || "");
  }
};
</script>
