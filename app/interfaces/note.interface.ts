export interface Note {
  title: string;
  items: { text: string; }[];
  isChecked: boolean;
  noteSelection: number[]
}
