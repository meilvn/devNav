import Loading from "@/components/common/loading.vue";
import { createApp } from "vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("loading", {
    mounted(el, binding) {
      const container = document.createElement("div");
      el.style.position = "relative";
      el.appendChild(container);

      const app = createApp(Loading, {
        visible: binding.value,
      });
      app.mount(container);
      el._loadingApp = app;
      el._loadingContainer = container;
    },
    updated(el, binding) {
      const instance = el._loadingApp?._instance;
      if (instance && binding.value !== binding.oldValue && instance.exposed.switchLoading) {
        instance.exposed.switchLoading(binding.value);
      }
    },
    unmounted(el) {  // 指令绑定的元素卸载时调用
      const app = el._loadingApp;
      if (app) {
        app.unmount();
      }
      if (el._loadingContainer?.parentNode) {
        el._loadingContainer.parentNode.removeChild(el._loadingContainer);
      }
      el._loadingApp = null;
      el._loadingContainer = null;
    },
  });
});
