<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="mb-8 text-3xl font-bold">Photos</h1>
    <div
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <PhotoCard v-for="photo in photos" :key="photo.id" :photo="photo" />
    </div>
    <div v-if="isLoading" class="mt-8 text-center">
      <ProgressSpinner />
      <p class="mt-4 text-gray-600">Loading more photos...</p>
    </div>
    <div v-if="!hasMorePages" class="mt-8 text-center text-gray-600">
      No more photos to load.
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

import PhotoCard from "~/components/PhotoCard.vue";
import { useKeycloak } from "~/composables/useKeycloak";
import type { PaginationStat } from "~/types/api/pagination-stat";
import type { Photo } from "~/types/api/photo";

interface Context {
  data: Photo[];
  pagination: PaginationStat;
}

const photos = ref<Photo[]>([]);
const page = ref(1);
const isLoading = ref(false);
const hasMorePages = ref(true);

const { keycloak } = useKeycloak();

const fetchPhotos = async () => {
  if (isLoading.value || !hasMorePages.value) return;

  isLoading.value = true;
  try {
    const token = keycloak?.token;
    if (!token) {
      console.error("No access token available");
      return;
    }

    const response = await fetch(
      `https://react-together-api.cophr.net/photos?page=${page.value}&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const { data, pagination } = (await response.json()) as Context;

    if (!data || !Array.isArray(data)) {
      console.error("Unexpected API response format");
      return;
    }

    photos.value.push(...data);
    page.value++;
    hasMorePages.value = page.value <= pagination.last;
  } catch (error) {
    console.error("Error fetching photos:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleScroll = () => {
  const bottomOfWindow =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  if (!bottomOfWindow) return;

  fetchPhotos();
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  fetchPhotos();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
