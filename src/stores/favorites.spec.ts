import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useFavoritesStore } from './favorites';

describe('useFavoritesStore', () => {
  let store: ReturnType<typeof useFavoritesStore>;
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    store = useFavoritesStore();
  });

  it('should add a show to favorites if it does not exist', () => {
    const show = { id: 1, name: 'Show 1', image: null, rating: null, network: null };
    store.toggleFavorite(show);

    expect(store.favorites).toEqual([show]);
    expect(localStorage.setItem).toHaveBeenCalledWith('tv_favorites', JSON.stringify([show]));
  });

  it('should remove a show from favorites if it already exists', () => {
    const show = { id: 1, name: 'Show 1', image: null, rating: null, network: null };
    store.toggleFavorite(show); // Add
    store.toggleFavorite(show); // Remove

    expect(store.favorites).toEqual([]);
    expect(localStorage.setItem).toHaveBeenCalledWith('tv_favorites', JSON.stringify([]));
  });

  it('should return true if a show is in favorites', () => {
    const show = { id: 1, name: 'Show 1', image: null, rating: null, network: null };
    store.toggleFavorite(show);

    expect(store.isFavorite('1')).toBeTruthy();
  });

  it('should return false if a show is not in favorites', () => {
    expect(store.isFavorite('1')).toBeFalsy();
  });
});
