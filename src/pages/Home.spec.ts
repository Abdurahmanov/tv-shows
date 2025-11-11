import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { ref } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import { useDataStore } from '@/stores/data';
import Home from '@/pages/Home.vue';

vi.mock('@/stores/data', () => ({
  useDataStore: vi.fn(),
}));

describe('Home', () => {
  let dataStoreMock;

  beforeEach(() => {
    setActivePinia(createPinia());

    dataStoreMock = {
      data: ref({
        Drama: [{ id: 1, name: 'Drama Show 1' }],
        Comedy: [{ id: 2, name: 'Comedy Show 1' }],
      }),
      loading: ref(true),
      fetchData: vi.fn(),
    };

    useDataStore.mockReturnValue(dataStoreMock);
  });

  it('should render "Loading..." when data is loading', () => {
    const wrapper = shallowMount(Home);

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.text()).toContain('Loading...');
  });

  it('should render genres and shows when data is available', () => {
    dataStoreMock.loading = false;

    const wrapper = shallowMount(Home);

    const genreBlocks = wrapper.findAll('.genre-block');
    expect(genreBlocks).toHaveLength(2);

    expect(wrapper.element).toMatchSnapshot();
  });
});
