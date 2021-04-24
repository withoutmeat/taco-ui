import { mount } from '@vue/test-utils'
import { ButtonSize, ButtonType } from './Button.feature'
import DButton from './Button.vue'
// The component to test
const MessageComponent = {
  template: '<p>{{ msg }}</p>',
  props: ['msg'],
}

describe('Test Button', () => {
  it('Default slot', () => {
    const wrapper = mount(DButton, {
      slots: {
        default: 'default slot',
      },
    })

    expect(wrapper.text()).toContain('default slot')
  })

  it('Default Button', () => {
    const wrapper = mount(DButton)

    expect(wrapper.element.tagName).toBe('BUTTON')

    const classes = [
      'text-center',
      'transition',
      'focus:outline-none',
      'border',
      'shadow-sm',
      'inline-block',
      'px-4',
      'py-1',
      'rounded-sm',
      'bg-white',
      'border-gray-300',
      'hover:border-primary',
      'hover:text-primary',
    ]

    classes.forEach((cls) => {
      expect(wrapper.classes(cls)).toBe(true)
    })
  })

  it('Primary Button', () => {
    const wrapper = mount(DButton, {
      props: {
        type: ButtonType.Primary,
      },
    })

    ;[
      'bg-primary',
      'border-primary',
      'text-white',
      'hover:bg-blue-500',
      'hover:border-blue-500',
      'focus:bg-blue-500',
      'focus:border-blue-500',
    ].forEach((cls) => {
      expect(wrapper.classes()).toContain(cls)
    })
  })

  it('Link Button', () => {
    const wrapper = mount(DButton, {
      props: {
        type: ButtonType.Link,
        href: 'test',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    ;[
      'text-primary',
      'bg-transparent',
      'border-transparent',
      'shadow-none',
    ].forEach((cls) => {
      expect(wrapper.classes()).toContain(cls)
    })
  })

  it('Text Button', () => {
    const wrapper = mount(DButton, {
      props: {
        type: ButtonType.Text,
      },
    })

    ;['bg-transparent', 'border-transparent', 'shadow-none'].forEach((cls) => {
      expect(wrapper.classes()).toContain(cls)
    })
  })

  it('Large Button', () => {
    const wrapper = mount(DButton, {
      props: {
        size: ButtonSize.Large,
      },
    })

    ;['px-4', 'py-[6px]'].forEach((cls) => {
      expect(wrapper.classes()).toContain(cls)
    })
  })

  it('Small Button', () => {
    const wrapper = mount(DButton, {
      props: {
        size: ButtonSize.Small,
      },
    })

    expect(wrapper.classes()).toContain('px-2')
    expect(wrapper.element.className.includes('py-')).toBeFalsy()
  })

  it('Warning Button', () => {
    const wrapper = mount(DButton, {
      props: {
        dangerLevel: 'warning',
      },
    })

    ;[
      'border-warning',
      'text-warning',
      'hover:border-yellow-500',
      'hover:text-yellow-500',
    ].forEach((cls) => {
      expect(wrapper.classes()).toContain(cls)
    })

    const primary = mount(DButton, {
      props: {
        type: ButtonType.Primary,
        dangerLevel: 'warning',
      },
    })

    ;[
      'border-warning',
      'text-white',
      'hover:border-yellow-500',
      'hover:bg-yellow-500',
    ].forEach((cls) => {
      expect(primary.classes()).toContain(cls)
    })
  })

  it('Danger Button', () => {
    const wrapper = mount(DButton, {
      props: {
        dangerLevel: 'danger',
      },
    })

    ;[
      'border-danger',
      'text-danger',
      'hover:border-red-500',
      'hover:text-red-500',
    ].forEach((cls) => {
      expect(wrapper.classes()).toContain(cls)
    })

    const primary = mount(DButton, {
      props: {
        type: ButtonType.Primary,
        dangerLevel: 'danger',
      },
    })

    ;[
      'border-danger',
      'text-white',
      'hover:border-red-500',
      'hover:bg-red-500',
    ].forEach((cls) => {
      expect(primary.classes()).toContain(cls)
    })
  })

  it('Disabled Button', () => {
    const wrapper = mount(DButton, {
      props: {
        disabled: true,
        type: ButtonType.Primary,
      },
    })

    ;[
      'cursor-not-allowed',
      'text-gray-900',
      'text-opacity-30',
      'bg-gray-100',
      'border-gray-100',
    ].forEach((cls) => {
      expect(wrapper.classes()).toContain(cls)
    })

    const linkDisabledButton = mount(DButton, {
      props: {
        disabled: true,
        type: ButtonType.Link,
      },
    })

    ;[
      'cursor-not-allowed',
      'text-gray-900',
      'text-opacity-30',
      'border-transparent',
      'shadow-none',
      'bg-transparent',
    ].forEach((cls) => {
      expect(linkDisabledButton.classes()).toContain(cls)
    })
  })
})
