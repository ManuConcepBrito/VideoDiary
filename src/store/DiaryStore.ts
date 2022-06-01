import { action, autorun, computed, makeObservable, observable } from 'mobx';
import React from 'react';

export interface Entry {
  date: Date;
  videoURI: string;
  mood?: Mood;
  note?: string;
  tags?: string[];
}

export enum Mood {
  HAPPY = 'Happy',
  NEUTRAL = 'Neutral',
  SAD = 'Sad',
}

export class DiaryStore {
  entries: Entry[] = [];

  constructor() {
    makeObservable(this, {
      entries: observable,
      addEntry: action,
      removeEntry: action,
    });
  }

  addEntry = (entry: Entry) => {
    this.entries.push(entry);
  };

  removeEntry = (entry: Entry) => {
    const filteredEntries = this.entries.filter(
      (item) => item.date !== entry.date
    );
    this.entries = filteredEntries;
  };
}

export const diaryStore = new DiaryStore();

export const DiaryStoreContext = React.createContext(diaryStore);
export const useDiaryStore = () => React.useContext(DiaryStoreContext);
