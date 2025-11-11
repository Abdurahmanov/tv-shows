import { onMounted, onUnmounted, type Ref } from 'vue';

export const useClickOutside = (
  elementRef: Ref<HTMLElement | null>,
  callback: () => void,
  isFocused: Ref,
) => {
  const handleClick = (event: MouseEvent) => {
    if (isFocused.value && elementRef.value && !elementRef.value?.contains(event.target as Node)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClick);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClick);
  });
};
