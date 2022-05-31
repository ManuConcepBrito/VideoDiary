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

const contains = ({ date }: Entry, query: string) => {
  if (
    date.toLocaleString('default', { month: 'long' }).includes(query) ||
    date.toLocaleString('default', { weekday: 'long' }).includes(query) ||
    date.getDate.toString().includes(query)
  ) {
    console.log('true');
    return true;
  }

  console.log('false');
  return false;
};

export class DiaryStore {
  entries: Entry[] = [];
  filter = '';

  constructor() {
    makeObservable(this, {
      entries: observable,
      filtered: computed,
      addEntry: action,
      changeFilter: action,
      removeEntry: action,
    });
  }

  get filtered() {
    const filteredData = this.entries.filter((entry) => {
      return contains(entry, this.filter);
    });
    const sortedData = filteredData.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
    return sortedData;
  }

  changeFilter = (text: string) => {
    this.filter = text.toLowerCase();
  };

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
