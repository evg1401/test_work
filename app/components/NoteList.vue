<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import type { Note } from "~/interfaces/note.interface";

interface Props {
  notes: Note[];
}

interface Emit {
  (e: "checked", value: { index: number; isChecked: boolean }): void;
  (e: "changeText", value: { index: number; text: string }): void;
  (e: "deleteNote", value: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const { notes } = toRefs(props);
</script>

<template>
  <VRow>
    <VCol v-for="(note, i) in notes" :key="i" xl="3" lg="3" md="3" class="d-flex align-start">
      <NoteItem :note="note" :idx="i">
        <template #text>
          <span class="my-1">Чек-лист:</span>
          <VList :items="note.items" item-title="text" class="list-height" />
        </template>

        <template #actions>
          <VBtn variant="outlined" color="primary" size="small" text="удалить" @click="emit('deleteNote', i)">
            <template #prepend>
              <Icon :width="16" icon="mdi-light:delete" />
            </template>
          </VBtn>

          <VBtn variant="outlined" color="primary" size="small" text="редактировать"
            @click="navigateTo({ name: 'id', params: { id: i } })">
            <template #prepend>
              <Icon :width="16" icon="mdi-light:pencil" />
            </template>
          </VBtn>

          <VBtn variant="outlined" color="primary" size="small" :text="!note.isChecked ? 'выполнить' : 'выполнено'"
            :disabled="note.isChecked" @click="emit('checked', { index: i, isChecked: true })">
            <template #prepend>
              <Icon v-if="note.isChecked" :width="16" icon="mdi-light:check" />
            </template>
          </VBtn>
        </template>
      </NoteItem>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.list-height {
  max-height: 10rem;
}
</style>
