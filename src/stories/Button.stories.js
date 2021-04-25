import { ButtonType } from '../components/Button.feature'
import MyButton from '../components/Button.vue'

export default {
  title: 'Example/Button',
  component: MyButton,
  argTypes: {
    variant: {
      options: ['contained', 'outlined', 'text'],
      control: { type: 'select' },
    },
    color: {
      options: ['default', 'primary', 'secondary', 'warning', 'danger'],
      control: { type: 'select' },
    },
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'select' },
    },
    block: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
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
  color: ButtonType.Primary,
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
