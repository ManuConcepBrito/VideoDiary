import { action, autorun, computed, makeObservable, observable } from 'mobx';
import React from 'react';

export interface Entry {
  date: Date;
  mood?: Mood;
  note?: string;
  tags?: string[];
  videoURI?: string;
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
    return true;
  }

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
    });
  }

  get filtered() {
    const filteredData = this.entries.filter((entry) => {
      return contains(entry, this.filter);
    });
    return filteredData;
  }

  changeFilter = (text: string) => {
    this.filter = text.toLowerCase();
  };

  addEntry = (entry: Entry) => {
    this.entries.push(entry);
  };
}

export const diaryStore = new DiaryStore();

export const DiaryStoreContext = React.createContext(diaryStore);
export const useDiaryStore = () => React.useContext(DiaryStoreContext);