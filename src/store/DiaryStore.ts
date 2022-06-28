import { action, computed, makeObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export interface Entry {
  dateString: string;
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
  filteredEntries: Entry[] = [];
  tags: string[] = [];
  filteredTags: string[] = [];

  constructor() {
    makeObservable(this, {
      entries: observable,
      filteredEntries: observable,
      filteredTags: observable,
      tags: observable,
      addEntry: action,
      removeEntry: action,
      sortedEntries: computed,
      getFilteredEntries: action,
      getFilteredTags: action,
    });

    makePersistable(this, {
      name: 'DiaryStore',
      properties: ['entries', 'filteredEntries', 'tags'],
      storage: AsyncStorage,
    });
  }

  addEntry = (entry: Entry) => {
    this.entries.push(entry);
    entry.tags?.map((tag) => {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
    });
    this.filteredEntries = this.sortedEntries;
  };

  removeEntry = (entry: Entry) => {
    const filteredEntries = this.entries.filter(
      (item) => item.dateString !== entry.dateString
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

  getFilteredTags = (filter: string) => {
    // get tags to display in autocomplete
    if (filter === '') {
      this.filteredTags = [];
    } else {
      this.filteredTags = this.tags.filter((tag) =>
        tag.toLowerCase().includes(filter.toLowerCase().trim())
      );
    }
  };

  get sortedEntries() {
    if (this.entries.length === 1) {
      return this.entries;
    } else {
      return this.entries
        .slice()
        .sort(
          (a, b) =>
            new Date(b.dateString).getTime() - new Date(a.dateString).getTime()
        );
    }
  }
}

const containsDate = ({ dateString }: Entry, query: string) => {
  // find a better way to do this
  // right now for example if the tag is "a" it will show all the entries because every weekday has an "a"
  const date = new Date(dateString);
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
    let filteredTags = tags?.filter((tag) => tag.includes(tagQuery));
    if (filteredTags?.length === 0) {
      return false;
    } else {
      return true;
    }
  }
};
export const diaryStore = new DiaryStore();

export const DiaryStoreContext = React.createContext(diaryStore);
export const useDiaryStore = () => React.useContext(DiaryStoreContext);
