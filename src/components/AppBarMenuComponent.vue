<script setup lang="ts">
import { useConfig } from '@/store';

/** Config Store */
const configStore = useConfig();


</script>

<template>
  <!-- Toggle Dark mode -->
  <v-btn
    prepend-icon="mdi-theme-light-dark"
    variant="flat"
    :text="configStore.theme ? 'Dark Mode' : 'Light Mode'"
    @click="configStore.toggleTheme"
  />
</template>
