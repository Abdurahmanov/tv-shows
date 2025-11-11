import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useDataStore } from '@/stores/data';
import { ref } from 'vue';
import Search from '@/components/Search.vue';

vi.mock('@/stores/data', () => ({
  useDataStore: vi.fn(),
}));

describe('Search', () => {
  let fetchSearchDataMock;
  let searchDataMock;
  let searchLoadingMock;

  beforeEach(() => {
    setActivePinia(createPinia());

    fetchSearchDataMock = vi.fn();
    searchDataMock = ref([
      { id: 1, name: 'Show 1' },
      { id: 2, name: 'Show 2' },
    ]);
    searchLoadingMock = ref(false);

    useDataStore.mockReturnValue({
      fetchSearchData: fetchSearchDataMock,
      searchData: searchDataMock,
      searchLoading: searchLoadingMock,
    });
  });

  it('should render the search component correctly', () => {
    const wrapper = mount(Search);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display suggestions when searchData is available', async () => {
    const wrapper = mount(Search);

    wrapper.vm.searchValue = 'test';
    await wrapper.vm.$nextTick();

    const suggestions = wrapper.findAll('.suggestion-item');
    expect(suggestions).toHaveLength(2);
    expect(wrapper.element).toMatchSnapshot();
    expect(suggestions[0].text()).toBe('Show 1');
    expect(suggestions[1].text()).toBe('Show 2');
  });
});
