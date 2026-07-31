export const useToastExtras = () => {
    const toast = useToast();

    const showErrorToast = (title: string, description: string, options?: any) => {
        toast.add({
            title,
            description,
            color: "error",
            icon: 'material-symbols:cancel',
            progress: false,
            ...options,
        });
    }

    const showSuccessToast = (title: string, description: string, options?: any) => {
        toast.add({
            title,
            description,
            color: "success",
            icon: 'ep:success-filled',
            progress: false,
            ...options,
        });
    }

    const showWarningToast = (title: string, description: string, options?: any) => {
        toast.add({
            title,
            description,
            color: "warning",
            icon: 'mingcute:warning-fill',
            progress: false,
            ...options,
        });
    }

    const showInfoToast = (title: string, description: string, options?: any) => {
        toast.add({
            title,
            description,
            color: "info",
            icon: 'material-symbols:info',
            progress: false,
            ...options,
        });
    }

    return {
        showErrorToast,
        showSuccessToast,
        showWarningToast,
        showInfoToast,
    }
}