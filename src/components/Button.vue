<script lang="ts">
import { defineComponent } from 'vue'
import {
  ButtonProps,
  ButtonSize,
  ButtonType,
  useClasses,
} from './Button.feature'

export default defineComponent({
  name: 'Button',
  props: ButtonProps,
  setup(props) {
    return {
      ButtonSize,
      ButtonType,
      props,
      classes: useClasses(props),
    }
  },
})
</script>

<template>
  <a
    :class="classes"
    v-if="props.type === ButtonType.Link && props.href"
    :href="props.href"
  >
    <slot />
  </a>
  <button
    v-else
    :class="classes"
    :disabled="props.disabled"
    @click="props.onClick"
  >
    <slot />
  </button>
</template>
