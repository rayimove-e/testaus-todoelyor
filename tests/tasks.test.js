import { describe, test, expect, beforeEach } from 'vitest';
import {
  loadTasks,
  saveTasks,
  generateId,
  STORAGE_KEY,
} from '../public/tasks.js';

describe('Task storage functions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('loadTasks returns empty array when localStorage is empty', () => {
    const result = loadTasks();

    expect(result).toEqual([]);
  });

  test('saveTasks saves tasks to localStorage', () => {
    const tasks = [{ id: '1', text: 'Study testing', completed: false }];

    saveTasks(tasks);

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    expect(saved).toEqual(tasks);
  });

  test('loadTasks returns saved tasks from localStorage', () => {
    const tasks = [{ id: '1', text: 'Study testing', completed: false }];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

    const result = loadTasks();

    expect(result).toEqual(tasks);
  });

  test('loadTasks returns empty array if saved data is not an array', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ text: 'wrong data' }));

    const result = loadTasks();

    expect(result).toEqual([]);
  });

  test('loadTasks returns empty array if JSON is invalid', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid json');

    const result = loadTasks();

    expect(result).toEqual([]);
  });

  test('generateId returns string starting with t_', () => {
    const id = generateId();

    expect(typeof id).toBe('string');
    expect(id.startsWith('t_')).toBe(true);
  });
});
