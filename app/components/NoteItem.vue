<script lang="ts" setup>
import type { Note } from "~/interfaces/note.interface";

interface Props {
  note?: Note;
}

const props = withDefaults(defineProps<Props>(), { note: { title: '' } });
const { note } = toRefs(props)

const windowWidth = ref(window.innerWidth);
const btnClass = [windowWidth.value > 375 ? 'justify-space-around' : 'justify-space-between']
</script>

<template>
  <VCard border flat max-width="500" class="w-100">
    <VCardTitle style="height: 100px">
      <slot name="title">{{ note.title }}</slot>
    </VCardTitle>

    <VCardText class="d-flex flex-column">
      <slot name="text"/>
    </VCardText>

    <VCardActions class="d-flex flex-wrap" :class="btnClass">
      <slot name="actions" />
    </VCardActions>
  </VCard>
</template>
