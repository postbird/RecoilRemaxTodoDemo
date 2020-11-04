import { atom } from 'recoil';

export const editorAtom = atom({
  key: 'editorAtom',
  default: {
    show: false,
    type: 'ADD', // ADD / MODIFY
    data: null, // 
  }
})