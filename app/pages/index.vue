<script lang="ts" setup>
import { useNoteStore } from "@/stores/note.store";

const noteStore = useNoteStore();

const { getNotes } = storeToRefs(noteStore);

const dialogVisible: Ref<boolean> = ref(false)
const noteIndex: Ref<number | undefined> = ref()

const onDeleteNote = (index: number) => {
  noteIndex.value = index
  dialogVisible.value = true
}

const onConfirm = async (confirmed: boolean) => {
  if (confirmed && typeof noteIndex.value !== 'undefined') {
    noteStore.deleteNote(noteIndex.value)
  }

  noteIndex.value = undefined
}
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <div class="my-3">
          <VBtn variant="flat" color="primary" 
            @click="navigateTo({ name: 'create' })"
          >
            Добавть заметку
          </VBtn>
        </div>
        <VDivider />
      </VCol>
      <VCol cols="12">
        <NoteList 
          :notes="getNotes" 
          @checked="noteStore.setNoteChecked($event.isChecked, $event.index)"
          @delete-note="onDeleteNote" 
        />
      </VCol>
    </VRow>

    <template v-if="dialogVisible">
      <ConfirmDialog 
        v-model:dialog-visible="dialogVisible" 
        :prop="{
        titleButtomConfirm: 'да',
        titleButtonCancel: 'нет',
        theme: 'warning',
        }" 
        @confirm="onConfirm"
      >
        <template #title>
          Удаление заметки
        </template>
        <template #text>
          Удалить?
        </template>
      </ConfirmDialog>
    </template>
  </VContainer>
</template>
