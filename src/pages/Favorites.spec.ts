import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useFavoritesStore } from '@/stores/favorites';
import Favorites from '@/pages/Favorites.vue';

vi.mock('@/stores/favorites', () => ({
  useFavoritesStore: vi.fn(),
}));

describe('Favorites', () => {
  let favoritesStoreMock;

  beforeEach(() => {
    setActivePinia(createPinia());

    favoritesStoreMock = {
      favorites: [],
    };

    useFavoritesStore.mockReturnValue(favoritesStoreMock);
  });

  it('should render "No favorites yet" when the favorites list is empty', () => {
    const wrapper = shallowMount(Favorites);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render favorite items when the favorites list is populated', () => {
    favoritesStoreMock.favorites = [
      { id: 1, name: 'Favorite Show 1' },
      { id: 2, name: 'Favorite Show 2' },
    ];

    const wrapper = shallowMount(Favorites);

    const cards = wrapper.findAllComponents({ name: 'Card' });
    expect(cards).toHaveLength(2);
    expect(wrapper.element).toMatchSnapshot();
  });
});
