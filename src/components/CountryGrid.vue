<template>
  <v-container class="fill-height">
    <v-row no-gutters class="d-flex flex-row align-items-center justify-content-between">
      <v-col cols="12" sm="4" md="4">
        <v-text-field
          v-model="searchQuery"
          :items="countries"
          placeholder="Country Name"
          label="Search for a country"
          prepend-inner-icon="mdi-magnify"
          item-props
          :item-value="(country: Country) => country.name?.common || ''"
          :item-title="(country: Country) => country.name?.common || ''"
          menu-icon="mdi-chevron-down"
          variant="solo"
          :clearable="true"
        />
      </v-col>

      <v-col cols="12" sm="4" md="3">
        <v-select
          v-model="selectedRegion"
          :items="regions"
          label="Filter by Region"
          placeholder="Select a region"
          :loading="loadings.getCountries"
          :disabled="loadings.getCountries"
          :error-messages="errorMessages"
          menu-icon="mdi-chevron-down"
          variant="solo"
          :clearable="true"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <v-select
          v-model="selectedSortOption"
          :items="sortOptions"
          label="Sort By"
          placeholder="Select Option"
          :loading="loadings.getCountries"
          :disabled="loadings.getCountries"
          :error-messages="errorMessages"
          menu-icon="mdi-chevron-down"
          variant="solo"
          :clearable="true"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="fill-height">
    <v-row no-gutters>
      <v-col
        v-for="country in filteredCountries"
        :key="country.name.common"
        cols="12"
        md="4"
        lg="3"
        sm="6"
        xl="2"
        class="mb-10 pa-2"
      >
        <v-lazy :min-height="170" :options="{ threshold: 0.7 }" transition="fab-transition">
          <SingleCountry
          v-model:isLoaded="isLoaded[country.name.common]"
          :country="country"
          ></SingleCountry>
        </v-lazy>
      </v-col>

      <!-- Empty state -->
      <v-col
        v-if="filteredCountries.length === 0 && !loadings.getCountries"
        class="justify-center d-flex"
        cols="12"
      >
        <strong class="text-center mt-5 fw-bold">No results found for your search criteria.</strong>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Fuse from 'fuse.js';
import apiService from '@/apiService.js';
import SingleCountry from '@/components/SingleCountry.vue';

import type { Country } from '@/interfaces/country';

interface SortOption {
  title: string;
  value: 'population' | 'name';
}

/* Variables */
const countries = ref<Country[]>([]);
const regions = ref<string[]>([]);
const sortOptions = ref<SortOption[]>([
  { title: 'Population', value: 'population' },
  { title: 'Country Name', value: 'name' }
]);

const selectedSortOption = ref<'population' | 'name' | null>(null);
const loadings = reactive<{ getCountries?: boolean }>({ getCountries: false });
const errorMessages = ref<string[]>([]);
const selectedRegion = ref<string | null>(null);
const searchQuery = ref<string | null>(null);
const isLoaded = ref<Record<string, boolean>>({});
const router = useRouter();
const route = useRoute();

const fuseOptions = {
  keys: ['name.common'],
  threshold: 0.4,
  minMatchCharLength: 1,
  shouldSort: true
};
let fuse: Fuse<Country>;

/** Helper Function to Format Population */
const formatNumbers = (value: number): string => {
  return value.toLocaleString();
};

/** Computed Property for Filtered and Sorted Countries */
const filteredCountries = computed(() => {
  if (!fuse) return countries.value;

  // Fuzzy search on searchQuery
  const searchResults = searchQuery.value
    ? fuse.search(searchQuery.value).map(result => result.item)
    : countries.value;

  // Filter by regions
  let result = searchResults.filter(country => {
    return !selectedRegion.value || country.region === selectedRegion.value;
  });

  // Sort by selectedSortOption
  if (selectedSortOption.value) {
    result.sort((a, b) => {
      if (selectedSortOption.value === 'population') {
        return (b.population ?? 0) - (a.population ?? 0);
      } else if (selectedSortOption.value === 'name') {
        return (a.name.common ?? '').localeCompare(b.name.common ?? '');
      }
      return 0;
    });
  }

  return result;
});

const getCountries = async () => {
  loadings.getCountries = true;
  try {
    const response = await apiService.getCountries();
    countries.value = response.data;
    regions.value = Array.from(new Set(countries.value.map(item => item.region))).filter(Boolean);

    // Initialize Fuse.js with countries data
    fuse = new Fuse(countries.value, fuseOptions);

    countries.value.forEach(country => {
      isLoaded.value[country.name.common] = false;
    });
  } catch (error) {
    errorMessages.value.push('Failed to load country data');
    console.error(error);
  } finally {
    loadings.getCountries = false;
  }
};

const updateQueryParams = () => {
  router.replace({
    query: {
      region: selectedRegion.value || undefined,
      sort: selectedSortOption.value || undefined,
      search: searchQuery.value || undefined
    }
  });
};

watch([selectedRegion, selectedSortOption, searchQuery], updateQueryParams);

onMounted(() => {
  // Initialize queries
  const { region, sort, search } = route.query;
  selectedRegion.value = (region as string) || null;
  selectedSortOption.value = sort as 'population' | 'name' | null;
  searchQuery.value = (search as string) || null;
  getCountries();
});
</script>

<style scoped lang="scss">

.justify-content-between {
  justify-content: space-between;
}
</style>
