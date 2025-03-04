<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import MainLayout from "@/views/layouts/Main.vue";
import LoginPage from "@/components/authentication/LoginPage.vue";
const route = useRoute();
const layout = computed(() => {
  return route.meta.layout === "AuthLayout" ? LoginPage : MainLayout;
});

</script>
