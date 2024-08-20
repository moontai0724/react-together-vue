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
    <div ref="loadMoreTrigger" class="h-1 w-full"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";

import PhotoCard from "~/components/PhotoCard.vue";
import api from "~/services/api";
import type { Photo } from "~/types/api/photo";

const photos = ref<Photo[]>([]);
const page = ref(1);
const isLoading = ref(false);
const hasMorePages = ref(true);

const loadMoreTrigger = ref<HTMLElement | null>(null);

const observer = new IntersectionObserver(
  (entries) => {
    console.log(entries);
    if (entries[0].isIntersecting && !isLoading.value) {
      fetchPhotos();
    }
  },
  { threshold: 0.1 },
);

const observeLoadMoreTrigger = () => {
  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }

  return observer;
};

const fetchPhotos = async () => {
  if (isLoading.value || !hasMorePages.value) return;

  isLoading.value = true;
  try {
    const { data, pagination } = await api.photos.list({
      page: page.value,
      size: 1,
    });

    if (!data || !Array.isArray(data)) {
      console.error("Unexpected API response format");
      return;
    }

    photos.value.push(...data);
    page.value++;
    hasMorePages.value = page.value <= pagination.last;

    // Check if we need to load more photos immediately
    if (hasMorePages.value && isLoadMoreTriggerVisible()) {
      setTimeout(fetchPhotos, 100); // Small delay to allow DOM update
    }
  } catch (error) {
    console.error("Error fetching photos:", error);
  } finally {
    isLoading.value = false;
  }
};

const isLoadMoreTriggerVisible = () => {
  if (!loadMoreTrigger.value) return false;
  const rect = loadMoreTrigger.value.getBoundingClientRect();
  return rect.top <= window.innerHeight;
};

onMounted(() => {
  const observer = observeLoadMoreTrigger();
  fetchPhotos();

  onUnmounted(() => {
    observer.disconnect();
  });
});

// Watch for changes in the photos array
watch(photos, () => {
  if (hasMorePages.value && isLoadMoreTriggerVisible()) {
    fetchPhotos();
  }
});
</script>
