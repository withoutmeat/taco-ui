<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import * as BUTTONCONFIG from './ButtonConfig'

export type ButtonSize = 'large' | 'medium' | 'small'
// export type ButtonType = ButtonHTMLAttributes['type']
export type ButtonVariant = 'contained' | 'outlined' | 'text'
export type ButtonColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'danger'

export const ButtonProps = {
  /**
   * 实体/有边框/无边框
   */
  variant: {
    type: String as PropType<ButtonVariant>,
    default: 'contained',
  },
  color: {
    type: String as PropType<ButtonColor>,
    default: 'default',
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium',
  },
  /**
   * 按钮宽度是否等于父元素的宽度
   */
  block: {
    type: Boolean,
    default: false,
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
} as const

// type ExtractedColorKeys = Extract<
//   keyof typeof BUTTONCONFIG,
//   `${ButtonColor}ColorClasses`
// >

export default defineComponent({
  name: 'TButton',
  props: ButtonProps,
  setup(props) {
    const fixedClasses = computed(() => {
      return [
        'text-center transition focus:outline-none ',
        'disabled:cursor-not-allowed disabled:text-gray-900 disabled:text-opacity-30',
        props.variant !== 'text' &&
          'border shadow-sm disabled:bg-gray-100 disabled:border-gray-100',
        props.block && 'w-full',
      ].filter(Boolean) as string[]
    })

    const classes = computed(() => [
      fixedClasses.value,
      BUTTONCONFIG[
        `${
          props.color || 'default'
        }ColorClasses` as `${ButtonColor}ColorClasses`
      ][props.variant || 'contained'],
      BUTTONCONFIG[
        `${
          props.variant || 'contained'
        }VariantClasses` as `${ButtonVariant}VariantClasses`
      ],
      BUTTONCONFIG[
        `${props.size || 'medium'}SizeClasses` as `${ButtonSize}SizeClasses`
      ],
    ])

    return {
      props,
      classes,
    }
  },
})
</script>

<template>
  <button :class="classes" :disabled="props.disabled" @click="props.onClick">
    <slot />
  </button>
</template>
