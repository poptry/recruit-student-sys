/// <reference types="vite/client" />
declare module '*.vue' {
    import { defineComponent } from 'vue';
    const component: ReturnType<typeof defineComponent>;
    export default component;
  }
  declare module './router' {
    import { VueRouter } from 'vue-router';
    const router: VueRouter;
    export default router;
}
declare module "vuex" {
  export * from "vuex/types/index.d.ts";
  export * from "vuex/types/helpers.d.ts";
  export * from "vuex/types/logger.d.ts";
  export * from "vuex/types/vue.d.ts";
}