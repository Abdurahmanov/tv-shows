import { describe, it, vi, expect } from 'vitest';
import { debounce } from '@/utils/debounce';

describe('debounce', () => {
  it('should delay the execution of the function', async () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(mockFn).not.toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 250));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should reset the timer if called again within the wait time', async () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn();
    await new Promise((resolve) => setTimeout(resolve, 100));
    debouncedFn();
    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(mockFn).not.toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
