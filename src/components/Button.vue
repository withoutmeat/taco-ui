<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'

import { formatClasses, assign } from './utils'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Link = 'link',
  Text = 'text',
}

export default defineComponent({
  name: 'Button',
  props: {
    btnType: {
      type: String as PropType<ButtonType>,
      default: ButtonType.Default,
    },
    /**
     * btnType = Link时需要提供link属性
     */
    link: {
      type: String,
    },
    /**
     * 按钮宽度是否等于父元素的宽度
     */
    block: {
      type: Boolean,
      default: false,
    },
    /**
     * 提醒等级
     */
    dangerLevel: {
      type: String as PropType<'none' | 'warning' | 'danger' | 0 | 1 | 2 | '0' | '1' | '2'>,
      default: 'none',
    },
    size: {
      type: String as PropType<ButtonSize>,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function as PropType<(ev: MouseEvent) => void>,
    },
  },
  setup(props) {
    const dangerLevel = computed(() => {
      switch (props.dangerLevel) {
        case 'warning':
        case 1:
        case '1':
          return 1
        case 'danger':
        case '2':
          return 2
        default:
          return 0
      }
    })

    const fixedClasses = ['border', 'text-center', 'shadow-sm', 'transition', 'focus:outline-none']

    const defaultClasses = [
      'bg-white',
      'border-gray-300',
      'hover:border-primary',
      'hover:text-primary',
    ]

    const primaryClasses = [
      'bg-primary',
      'border-primary',
      'text-white',
      'hover:bg-blue-500',
      'hover:border-blue-500',
      'focus:bg-blue-500',
      'focus:border-blue-500',
    ]

    const linkClasses = ['text-primary', 'hover:text-blue-500', '', '']

    const textClasses = ['border-none', 'hover:bg-gray-200']

    // size
    const defaultSizeClasses = ['px-4', 'py-1', ' rounded-sm']
    const largeSizeClasses = ['px-4', 'py-[6px]', 'rounded-sm']
    const smallSizeClasses = ['px-2', 'rounded-sm']

    // disabled
    const disabledClasses = [
      'cursor-not-allowed',
      'text-gray-900',
      'text-opacity-30',
      'bg-gray-100',
      'border-gray-100',
    ]

    const classes = computed(() => {
      const result = {
        [formatClasses(fixedClasses)]: true,
        [formatClasses(defaultSizeClasses)]: props.size == null,
        [formatClasses(largeSizeClasses)]: props.size === ButtonSize.Large,
        [formatClasses(smallSizeClasses)]: props.size === ButtonSize.Small,
      }

      if (props.disabled) {
        return assign(result, {
          [formatClasses(disabledClasses)]: props.disabled,
        })
      }

      if (dangerLevel.value !== 0) {
        return assign(result, {
          'bg-white text-warning border-warning hover:text-yellow-500 hover:border-yellow-500':
            dangerLevel.value === 1 && props.btnType === ButtonType.Default,
          'bg-warning text-white border-warning hover:bg-yellow-500 hover:border-yellow-500':
            dangerLevel.value === 1 && props.btnType === ButtonType.Primary,
          'bg-white text-danger border-danger hover:text-red-500 hover:border-red-500':
            dangerLevel.value === 2 && props.btnType === ButtonType.Default,
          'bg-danger text-white border-danger hover:bg-red-500 hover:border-red-500':
            dangerLevel.value === 2 && props.btnType === ButtonType.Primary,
        })
      }

      return assign(result, {
        [formatClasses(defaultClasses)]: props.btnType === ButtonType.Default,
        [formatClasses(primaryClasses)]: props.btnType === ButtonType.Primary,
        [formatClasses(linkClasses)]: props.btnType === ButtonType.Link,
        [formatClasses(textClasses)]: props.btnType === ButtonType.Text,
      })
    })

    return {
      ButtonSize,
      ButtonType,
      props,
      dangerLevel,
      classes,
    }
  },
})
</script>

<template>
  <a v-if="props.btnType === ButtonType.Link && props.link" :href="props.link">
    <slot />
  </a>
  <button v-else :class="classes" :disabled="props.disabled" @click="props.onClick">
    <slot />
    <div class="border-none"></div>
  </button>
</template>
