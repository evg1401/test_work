<script lang="ts" setup>
import { useNoteStore } from "@/stores/note.store";

const router = useRouter();
const noteStore = useNoteStore();
const { getNotes } = storeToRefs(noteStore);

const currentRouteParams = router.currentRoute.value.params as unknown as {
  id: number;
};

const dialogVisible: Ref<boolean> = ref(false)
const note = ref(getNotes.value[currentRouteParams.id]);

const onSave = () => {
  noteStore.setNoteItem(note.value?.items ?? [], currentRouteParams.id)
  noteStore.setNoteTitle(note.value?.title ?? '', currentRouteParams.id)
  noteStore.setNoteSelection(note.value?.noteSelection ?? [], currentRouteParams.id)
  navigateTo({ path: '/' })
}

const onConfirm = async (confirmed: boolean) => {
  if (confirmed) {
    navigateTo({ path: '/' })
  }
}
</script>

<template>
  <VRow justify="center" class="h-100">
    <VCol v-if="note" cols="12" class="d-flex justify-center my-auto">
      <NoteItem :note="note">
        <template #text>
          <NotesItemsEdit :notes="{ items: note.items, noteSelection: note.noteSelection }"
            @save="note = { ...$event, title: note.title }" />
        </template>

        <template #title>
          <VTextField autofocus :value="note.title" label="Заголовок" @update:model-value="note.title = $event" />
        </template>

        <template #actions>
          <VBtn variant="flat" color="primary" size="small" text="сохранить" @click="onSave" />

          <VBtn variant="outlined" color="primary" size="small" text="отмена" @click="dialogVisible = true" />
        </template>
      </NoteItem>
    </VCol>

    <template v-if="dialogVisible">
      <ConfirmDialog v-model:dialog-visible="dialogVisible" :prop="{
        titleButtomConfirm: 'да',
        titleButtonCancel: 'нет',
        theme: 'warning',
      }" @confirm="onConfirm">
        <template #title>
          Действительно хотите отменить редактирование?
        </template>
        <template #text>
          Отменить?
        </template>
      </ConfirmDialog>
    </template>
  </VRow>
</template>
