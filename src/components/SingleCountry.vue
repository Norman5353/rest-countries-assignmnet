<template>
  <v-card class="mx-auto pb-5" max-width="300" elevation="6" @click="goToCountry(country)">
    <v-skeleton-loader
      v-if="!isLoaded"
      type="image"
      color="var(--v-theme-on-surface)"
      elevation="24"
      class="align-end text-white img-fluid flagImg h-100"
      height="170"
    ></v-skeleton-loader>

    <v-img
      class="align-end text-white img-fluid flagImg border-b-thin"
      :height="isLoaded?170:0"
      :src="country.flags.png"
      cover
      @load="isLoaded = true"
    ></v-img>

    <v-card-title>{{ country.name.common }}</v-card-title>
    <v-card-text>
      <span class="title">Population</span>
      :
      <span>{{ formatNumbers(country.population) }}</span>
    </v-card-text>
    <v-card-text>
      <span class="title">Region</span>
      :
      <span>{{ country.region }}</span>
    </v-card-text>
    <v-card-text>
      <span class="title">Capital</span>
      :
      <span>{{ country.capital[0] }}</span>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Country } from '@/interfaces/country';

const router = useRouter();
const isLoaded = defineModel<boolean | null>();
const props = defineProps<{ country: Country }>();

const goToCountry = (country: Country) => {
  router.push({ name: 'CountryDetails', params: { name: country.name.common } });
};

function formatNumbers(number: number): string {
  return number.toLocaleString();
}
</script>

<style scoped lang="scss">
.logo:hover {
  will-change: filter;
  filter: drop-shadow(0 0 1em #2196f3aa);
}
:deep().flagImg {
  img {
    object-fit: fill !important;
  }
}

:deep().v-card-text {
  padding: 0 1rem;
  span {
    font-weight: normal;
    opacity: 1 !important;
  }
  .title {
    font-weight: 600;
  }
}
:deep(.v-card-title) {
  font-weight: 600;
}
</style>
