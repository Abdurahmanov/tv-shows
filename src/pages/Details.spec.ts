import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useRoute } from 'vue-router';
import { useDataStore } from '@/stores/data';
import Details from '@/pages/Details.vue';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}));

vi.mock('@/stores/data', () => ({
  useDataStore: vi.fn(),
}));

describe('Details', () => {
  let fetchDataByIdMock;
  let routeMock;

  beforeEach(() => {
    setActivePinia(createPinia());

    fetchDataByIdMock = vi.fn();
    routeMock = { params: { id: '1' } };

    useRoute.mockReturnValue(routeMock);
    useDataStore.mockReturnValue({
      fetchDataById: fetchDataByIdMock,
    });
  });

  it('should render page correctly', async () => {
    fetchDataByIdMock.mockResolvedValue({
      name: 'Test Show',
      summary: '<p>Test Summary</p>',
      genres: ['Drama'],
      language: 'English',
      status: 'Running',
      premiered: '2023-01-01',
      rating: { average: 8.5 },
      network: { name: 'Test Network' },
      image: { original: 'test-image.jpg' },
    });

    const wrapper = mount(Details);

    await fetchDataByIdMock(routeMock.params.id);
    await wrapper.vm.$nextTick();

    expect(wrapper.element).toMatchSnapshot();
    expect(fetchDataByIdMock).toHaveBeenCalledWith('1');
  });
});
