import { computed, PropType, defineProps, ExtractPropTypes } from 'vue'
import { assign, formatClasses } from './utils'

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

export const ButtonProps = {
  type: {
    type: String as PropType<ButtonType>,
    default: ButtonType.Default,
  },
  /**
   * type = Link时需要提供href属性
   */
  href: {
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
    type: String as PropType<
      'none' | 'warning' | 'danger' | 0 | 1 | 2 | '0' | '1' | '2'
    >,
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
} as const

export const useClasses = (props: ExtractPropTypes<typeof ButtonProps>) => {
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

  const justText = computed(() =>
    [ButtonType.Text, ButtonType.Link].includes(props.type),
  )

  const fixedClasses = computed(() => {
    return [
      'text-center transition focus:outline-none border shadow-sm',
      props.block ? 'block' : 'inline-block',
    ].filter(Boolean) as string[]
  })

  const defaultClasses = [
    'bg-white border-gray-300',
    'hover:border-primary hover:text-primary',
  ]

  const primaryClasses = [
    'bg-primary border-primary text-white',
    'hover:bg-blue-500 hover:border-blue-500',
    'focus:bg-blue-500 focus:border-blue-500',
  ]

  const linkClasses = [
    'text-primary border-transparent shadow-none bg-transparent',
    'hover:text-blue-500',
  ]

  const textClasses = [
    'border-transparent shadow-none bg-transparent',
    'hover:bg-gray-200',
  ]

  // size
  const defaultSizeClasses = ['px-4 py-1 rounded-sm']
  const largeSizeClasses = ['px-4 py-[6px] rounded-sm']
  const smallSizeClasses = ['px-2 rounded-sm']

  // disabled
  const disabledClasses = computed(() => {
    return [
      'cursor-not-allowed text-gray-900 text-opacity-30',
      justText.value && textClasses[0],
      !justText.value && 'bg-gray-100 border-gray-100',
      props.type === ButtonType.Link && props.href && 'pointer-events-none',
    ].filter(Boolean) as string[]
  })

  const warningClasses = computed(() => {
    switch (props.type) {
      case ButtonType.Default:
      case ButtonType.Link:
      case ButtonType.Text:
        return [
          'border-warning bg-white text-warning ',
          'hover:border-yellow-500 hover:text-yellow-500',
        ]
      case ButtonType.Primary:
        return [
          'border-warning bg-warning text-white ',
          'hover:border-yellow-500 hover:bg-yellow-500',
        ]
    }
  })

  const dangerClasses = computed(() => {
    switch (props.type) {
      case ButtonType.Default:
      case ButtonType.Link:
      case ButtonType.Text:
        return [
          'border-danger bg-white text-danger ',
          'hover:border-red-500 hover:text-red-500',
        ]
      case ButtonType.Primary:
        return [
          'border-danger bg-danger text-white ',
          'hover:border-red-500 hover:bg-red-500',
        ]
    }
  })

  return computed(() => {
    const result = {
      [formatClasses(fixedClasses.value)]: true,
      [formatClasses(defaultSizeClasses)]: props.size == null,
      [formatClasses(largeSizeClasses)]: props.size === ButtonSize.Large,
      [formatClasses(smallSizeClasses)]: props.size === ButtonSize.Small,
    }

    if (props.disabled) {
      return assign(result, {
        [formatClasses(disabledClasses.value)]: props.disabled,
      })
    }

    if (dangerLevel.value !== 0) {
      return assign(result, {
        [formatClasses(warningClasses.value)]: dangerLevel.value === 1,
        [formatClasses(dangerClasses.value)]: dangerLevel.value === 2,
      })
    }

    return assign(result, {
      [formatClasses(defaultClasses)]: props.type === ButtonType.Default,
      [formatClasses(primaryClasses)]: props.type === ButtonType.Primary,
      [formatClasses(linkClasses)]: props.type === ButtonType.Link,
      [formatClasses(textClasses)]: props.type === ButtonType.Text,
    })
  })
}
