import { action, autorun, computed, makeObservable, observable } from 'mobx';
import React from 'react';

export interface Entry {
  date: Date;
  videoURI: string;
  mood?: Mood;
  note?: string;
  tags?: string[];
}
export interface Tag {
  text: string;
  id: number;
}

export enum Mood {
  HAPPY = 'Happy',
  NEUTRAL = 'Neutral',
  SAD = 'Sad',
}

export class DiaryStore {
  entries: Entry[] = [];
  filteredEntries: Entry[] = [];
  // use tagSet cause lookup is O(1) but tags object bc RN Flatlist are stupid
  tagsSet = new Set();
  tags: Tag[] = [];

  constructor() {
    makeObservable(this, {
      entries: observable,
      filteredEntries: observable,
      tagsSet: observable,
      tags: observable,
      addEntry: action,
      removeEntry: action,
      sortedEntries: computed,
      getFilteredEntries: action,
    });
  }

  addEntry = (entry: Entry) => {
    this.entries.push(entry);
    const { tags } = entry;
    tags?.forEach((tag, index) => {
      if (!this.tagsSet.has(tag)) {
        this.tagsSet.add(tag);
        let id = this.tags.length;
        this.tags.push({ text: tag, id: id });
        console.log(this.tags);
      }
    });
    this.filteredEntries = this.sortedEntries;
  };

  removeEntry = (entry: Entry) => {
    const filteredEntries = this.entries.filter(
      (item) => item.date !== entry.date
    );
    this.entries = filteredEntries;
    this.filteredEntries = this.sortedEntries;
  };

  getFilteredEntries = (filter: string) => {
    const sortedEntries = this.sortedEntries;

    if (filter === '') {
      this.filteredEntries = sortedEntries;
    } else {
      this.filteredEntries = sortedEntries.filter((entry) => {
        return containsDate(entry, filter) || containsTag(entry, filter);
      });
    }
  };

  get sortedEntries() {
    if (this.entries.length === 1) {
      return this.entries;
    } else {
      return this.entries
        .slice()
        .sort((a, b) => b.date.getTime() - a.date.getTime());
    }
  }
}

const containsDate = ({ date }: Entry, query: string) => {
  if (
    date
      .toLocaleString('default', { month: 'long' })
      .toLowerCase()
      .includes(query) ||
    date
      .toLocaleString('default', { weekday: 'long' })
      .toLowerCase()
      .includes(query) ||
    date.getDate().toString().includes(query)
  ) {
    return true;
  }

  return false;
};

const containsTag = ({ tags }: Entry, tagQuery: string) => {
  // when there is not tag in the entry don't include them in the results
  if (tags?.length === 0) {
    return false;
  } else {
    let filteredTags = tags.filter((tag) => tag.includes(tagQuery));
    if (filteredTags.length === 0) {
      return false;
    } else {
      return true;
    }
  }
};
export const diaryStore = new DiaryStore();

export const DiaryStoreContext = React.createContext(diaryStore);
export const useDiaryStore = () => React.useContext(DiaryStoreContext);
