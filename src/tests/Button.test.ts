import { mount } from '@vue/test-utils'
import TButton from '../components/Button/Button.vue'

describe('Test Button', () => {
  it('Default slot', () => {
    const wrapper = mount(TButton, {
      slots: {
        default: 'default slot',
      },
    })

    expect(wrapper.text()).toContain('default slot')
  })

  it('Default Button', () => {
    const wrapper = mount(TButton)

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
    const wrapper = mount(TButton, {
      props: {
        type: 'primary',
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
    const wrapper = mount(TButton, {
      props: {
        type: 'link',
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
    const wrapper = mount(TButton, {
      props: {
        type: 'text',
      },
    })

    ;['bg-transparent', 'border-transparent', 'shadow-none'].forEach((cls) => {
      expect(wrapper.classes()).toContain(cls)
    })
  })

  it('Large Button', () => {
    const wrapper = mount(TButton, {
      props: {
        size: 'large',
      },
    })

    ;['px-4', 'py-[6px]'].forEach((cls) => {
      expect(wrapper.classes()).toContain(cls)
    })
  })

  it('Small Button', () => {
    const wrapper = mount(TButton, {
      props: {
        size: 'small',
      },
    })

    expect(wrapper.classes()).toContain('px-2')
    expect(wrapper.element.className.includes('py-')).toBeFalsy()
  })

  it('Warning Button', () => {
    const wrapper = mount(TButton, {
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

    const primary = mount(TButton, {
      props: {
        type: 'primary',
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
    const wrapper = mount(TButton, {
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

    const primary = mount(TButton, {
      props: {
        type: 'primary',
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
    const wrapper = mount(TButton, {
      props: {
        disabled: true,
        type: 'primary',
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

    const linkDisableTButton = mount(TButton, {
      props: {
        disabled: true,
        type: 'link',
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
      expect(linkDisableTButton.classes()).toContain(cls)
    })
  })
})
