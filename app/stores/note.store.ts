import { defineStore } from "pinia";

export interface NoteState {
  title: string;
  isChecked: boolean;
  items: { text: string; }[];
  noteSelection: number[]
}

export const useNoteStore = defineStore({
  id: "noteStore",
  state: () =>
  ({
    notes: [],
  } as { notes: NoteState[] }),
  actions: {
    setNoteItem(items: { text: string; }[], index: number) {
      if (this.notes[index]) this.notes[index].items = items;
    },
    setNoteSelection(noteSelection: number[], index: number) {
      if (this.notes[index]) this.notes[index].noteSelection = noteSelection;
    },
    setNoteTitle(title: string, index: number) {
      if (this.notes[index]) this.notes[index].title = title;
    },
    setNoteChecked(isChecked: boolean, index: number) {
      if (this.notes[index]) this.notes[index].isChecked = isChecked;
    },
    setNotes(note: NoteState) {
      this.notes.push(note);
    },
    deleteNote(index: number) {
      this.notes = this.notes.filter((_, i) => i !== index);
    },
  },

  getters: {
    getNotes: (state) => {
      return state.notes;
    },
  },
});
