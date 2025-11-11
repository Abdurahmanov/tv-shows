import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import FavoriteButton from '@/components/FavoriteButton.vue';
import { useFavoritesStore } from '@/stores/favorites';

vi.mock('@/stores/favorites', () => ({
  useFavoritesStore: vi.fn(),
}));

describe('FavoriteButton', () => {
  let toggleFavoriteMock;
  let isFavoriteMock;

  beforeEach(() => {
    setActivePinia(createPinia());

    toggleFavoriteMock = vi.fn();
    isFavoriteMock = vi.fn();

    useFavoritesStore.mockReturnValue({
      toggleFavorite: toggleFavoriteMock,
      isFavorite: isFavoriteMock,
    });
  });

  it('should render the correct initial text when not a favorite', () => {
    isFavoriteMock.mockReturnValue(false);

    const wrapper = mount(FavoriteButton, {
      props: {
        show: { id: 1 },
      },
    });

    expect(wrapper.text()).toBe('🫶');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the correct initial text when already a favorite', () => {
    isFavoriteMock.mockReturnValue(true);

    const wrapper = mount(FavoriteButton, {
      props: {
        show: { id: 1 },
      },
    });

    expect(wrapper.text()).toBe('❤️');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should call toggleFavorite when clicked', async () => {
    isFavoriteMock.mockReturnValue(false);

    const wrapper = mount(FavoriteButton, {
      props: {
        show: { id: 1 },
      },
    });

    await wrapper.trigger('click');

    expect(toggleFavoriteMock).toHaveBeenCalledWith({ id: 1 });
  });
});
