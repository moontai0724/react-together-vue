<template>
  <div
    class="relative w-full overflow-hidden rounded-md"
    :style="aspectRatioStyle"
  >
    <img
      :src="defaultSrc"
      :srcset="srcset"
      :alt="altText"
      class="absolute h-full w-full object-cover"
    />
  </div>
</template>

<script setup lang="ts">
import type { Photo } from "~/types/api/photo";

const thumbnailSize = ref<string>("Thumbnail");

const { photo } = defineProps<{
  photo: Photo;
}>();

const defaultSrc = computed(() => {
  const thumbnail = photo.flickrPhotoSizes.find(
    (size) => size.label === thumbnailSize.value,
  );
  return thumbnail?.source || "";
});

const srcset = computed(() => {
  return photo.flickrPhotoSizes
    .map((size) => `${size.source} ${size.width}w`)
    .join(", ");
});

const altText = computed(() => {
  return photo.fileName;
});

const aspectRatioStyle = computed(() => {
  const originalSize = photo.flickrPhotoSizes.find(
    (size) => size.label === "Original",
  );
  if (originalSize) {
    const aspectRatio = (originalSize.height / originalSize.width) * 100;
    return { paddingBottom: `${aspectRatio}%` };
  }
  return { paddingBottom: "100%" }; // Fallback to square if original size not found
});
</script>
