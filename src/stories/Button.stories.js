import { ButtonType } from '../components/Button.feature'
import MyButton from '../components/Button.vue'

export default {
  title: 'Example/Button',
  component: MyButton,
  argTypes: {
    type: {
      options: [ButtonType.Primary, ButtonType.Default, ButtonType.Link],
      control: {
        type: 'select',
      },
    },
    size: {
      options: ['lg', 'sm'],
      control: { type: 'select' },
    },
    onClick: {},
  },
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<my-button v-bind="args">@taco-ui/Button</my-button>',
})

export const Primary = Template.bind({})
Primary.args = {
  type: ButtonType.Primary,
}

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
