import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from '@/components/Header.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('Header', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render the header component correctly', () => {
    const wrapper = mount(Header);

    expect(wrapper.element).toMatchSnapshot();
  });
});
