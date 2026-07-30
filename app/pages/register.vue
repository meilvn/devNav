<template>
    <div class="flex justify-center items-center h-screen">
        <UCard class="w-96">
            <UForm @submit.prevent="onSubmit" class="p-6">
                <UFormField label="昵称" name="nickname">
                    <UInput v-model="state.nickname" type="text" placeholder="请输入昵称" size="lg" class="w-full" />
                </UFormField>
                <UFormField label="邮箱" name="email">``
                    <UInput v-model="state.email" type="email" placeholder="请输入邮箱" size="lg" class="w-full" />
                </UFormField>
                <UFormField label="密码" name="password">
                    <UInput v-model="state.password" type="password" placeholder="••••••••" size="lg" class="w-full" />
                </UFormField>
                <UButton block size="xl" color="primary" type="submit" class="cursor-pointer">注册
                </UButton>
            </UForm>
        </UCard>
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
    layout: false,
});
const auth = useAuth();
const toast = useToast();
const state = reactive({
    email: "",
    password: "",
    nickname: "",
});

const onSubmit = async () => {
    const { error } = await auth.signUp.email({
        email: state.email,
        password: state.password,
        name: state.nickname,
    });
    if (error) {
        toast.add({
            title: "注册失败",
            description: error.message || "请检查邮箱和密码是否正确",
            color: "error",
            icon: 'material-symbols:cancel-outline-rounded',
            progress: false,
        });
    } else {
        navigateTo("/");
    }
};
</script>
