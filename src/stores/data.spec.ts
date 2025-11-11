import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useDataStore } from './data';

describe('useDataStore', () => {
  let store: ReturnType<typeof useDataStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useDataStore();
    vi.restoreAllMocks();
  });

  it('should fetch and group data by genre', async () => {
    const mockShows = [
      { id: 1, name: 'Show 1', genres: ['Drama'], rating: { average: 8.5 } },
      { id: 2, name: 'Show 2', genres: ['Drama', 'Action'], rating: { average: 9.0 } },
    ];
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockShows,
    } as any);

    await store.fetchData();

    expect(store.data).toEqual({
      Drama: [
        { id: 2, name: 'Show 2', genres: ['Drama', 'Action'], rating: { average: 9.0 } },
        { id: 1, name: 'Show 1', genres: ['Drama'], rating: { average: 8.5 } },
      ],
      Action: [{ id: 2, name: 'Show 2', genres: ['Drama', 'Action'], rating: { average: 9.0 } }],
    });
    expect(store.error).toBeNull();
    expect(store.loading).toBe(false);
  });

  it('should handle errors when fetching data', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    } as any);

    await store.fetchData();

    expect(store.data).toBeNull();
    expect(store.error).toBe('Error: Not Found');
    expect(store.loading).toBe(false);
  });

  it('should fetch data by ID', async () => {
    const mockShow = { id: 1, name: 'Show 1' };
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockShow,
    } as any);

    const result = await store.fetchDataById('1');

    expect(result).toEqual(mockShow);
    expect(store.error).toBeNull();
  });

  it('should handle errors when fetching data by ID', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    } as any);

    const result = await store.fetchDataById('1');

    expect(result).toBeNull();
    expect(store.error).toBe('Error: Not Found');
  });

  it('should fetch search data', async () => {
    const mockResults = [
      { show: { id: 1, name: 'Show 1', image: null, rating: null, network: null, genres: [] } },
    ];
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockResults,
    } as any);

    await store.fetchSearchData('query');

    expect(store.searchData).toEqual([
      { id: 1, name: 'Show 1', image: null, rating: null, network: null, genres: [] },
    ]);
    expect(store.searchError).toBeNull();
    expect(store.searchLoading).toBe(false);
  });

  it('should handle errors when fetching search data', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    } as any);

    await store.fetchSearchData('query');

    expect(store.searchData).toBeNull();
    expect(store.searchError).toBe('Error: Not Found');
    expect(store.searchLoading).toBe(false);
  });
});
