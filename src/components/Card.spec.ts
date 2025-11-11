import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import Card from '@/components/Card.vue';

describe('Card', () => {
  const show = {
    id: 1,
    name: 'Test Show',
    image: { medium: 'test-image.jpg' },
    rating: { average: 8.5 },
    network: { name: 'Test Network' },
  };

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render a component', () => {
    const wrapper = mount(Card, {
      props: { show },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the show details correctly', () => {
    const wrapper = mount(Card, {
      props: { show },
    });

    expect(wrapper.find('.rating span').text()).toBe('⭐ 8.5');
  });
});
