<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import type { Note } from "~/interfaces/note.interface";

interface Props {
    notes: {
        items: { text: string }[];
        noteSelection: number[]
    }
}

interface Emit {
    (e: "save", value: Pick<Note, 'items' | 'noteSelection'>): void;

}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const { notes } = toRefs(props)
const items = ref([...notes.value.items])
const idxEditField: Ref<number | null> = ref(null)

const formData = {
    text: '',
}
const note = reactive({ ...formData })
const noteSelectionLocal = ref([...notes.value.noteSelection])

const clearIdxEditField = () => (idxEditField.value = null)

const onAddNote = () => {
    if (!note.text) return

    items.value[items.value.length] = { text: note.text }

    Object.assign(note, formData)
    emit('save', { items: items.value, noteSelection: noteSelectionLocal.value })
}

const onEditNote = (index: number) => {
    if (!note.text) return

    items.value[index] = { text: note.text }
    Object.assign(note, formData)
    emit('save', { items: items.value, noteSelection: noteSelectionLocal.value })
    clearIdxEditField()
}

const onChangeSelection = (selection: number[]) => {
    emit('save', { items: items.value, noteSelection: selection })
}

const onEditField = (index: number, text: string) => {
    idxEditField.value = index
    note.text = text
}
</script>

<template>
    <VList v-model:selected="noteSelectionLocal" lines="three" select-strategy="leaf"
        @update:selected="onChangeSelection">
        <VListItem v-for="(item, i) in items" :key="i" :title="item.text" :value="i" :ripple="false">
            <template #prepend="{ isSelected }">
                <VListItemAction start>
                    <VCheckboxBtn :model-value="isSelected" />
                </VListItemAction>
            </template>

            <template #append>
                <VBtn variant="outlined" color="primary" size="x-small" @click.stop="onEditField(i, item.text)">
                    <Icon :width="18" icon="mdi-light:pencil" />
                </VBtn>
                <VBtn v-if="idxEditField === i" variant="outlined" color="primary" size="x-small" class="mx-1" @click.stop="onEditNote(i)">
                    <Icon :width="18" icon="mdi-light:check" />
                </VBtn>
            </template>
        </VListItem>
    </VList>

    <div class="d-flex align-center">
        <VTextField v-model:model-value="note.text" label="текст заметки" />
        <VBtn variant="flat" color="primary" text="Добавить" class="mx-2" @click="onAddNote" />
    </div>
</template>