<script lang="ts" setup>
import type { Note } from '~/interfaces/note.interface';

const noteStore = useNoteStore();
const formData = {
    title: '',
    items: [],
    noteSelection: [],
}
const note = reactive({ ...formData })

const onSave = () => {
    noteStore.setNotes({ ...note, isChecked: false })
    navigateTo({ path: '/' })
}
const onChange = (e: Pick<Note, 'items' | 'noteSelection'>) => {
    Object.assign(note, { ...e, title: note.title })
}
</script>

<template>
    <VRow justify="center" class="h-100">
        <VCol class="d-flex justify-center my-auto">
            <NoteItem>
                <template #text>
                    <NotesItemsEdit :notes="{ items: note.items, noteSelection: note.noteSelection }"
                        @save="onChange" />
                </template>

                <template #title>
                    <VTextField label="Заголовок" @update:model-value="note.title = $event" />
                </template>

                <template #actions>
                    <VBtn variant="flat" color="primary" size="small" text="сохранить" @click="onSave" />

                    <VBtn variant="outlined" color="primary" size="small" text="отмена"
                        @click="navigateTo({ path: '/' })" />
                </template>
            </NoteItem>
        </VCol>
    </VRow>
</template>