import MyButton from "@/components/Button";

import { action } from "@storybook/addon-actions";
import ButtonMd from "@/components/Button/README.md";
// import vueDocs from "vue-docgen-api";
// vueDocs.parse("./Button.js").then((ci) => {
//   console.log(ci);
// });
export default {
  title: "Example/Button",
  component: MyButton,
  parameters: {
    notes: ButtonMd
  },
  argTypes: {
    ripple: {
      description: "波纹特效",
      defaultValue: false,
      control: { type: "boolean" }
    },
    circle: {
      description: "圆角",
      type: { name: "boolean", required: false, default: "false" },
      defaultValue: false,
      control: { type: "boolean" }
    },
    long: {
      description: "长按钮",
      type: { name: "boolean", required: false, default: "false" },
      defaultValue: false,
      control: { type: "boolean" }
    },
    type: {
      description: "按钮类型",
      type: { name: "string", required: true, default: "default" },
      defaultValue: "default",
      control: {
        type: "select",
        options: ["default", "primary", "success", "dark", "link"]
      }
    },
    size: {
      description: "大小规格",
      type: { name: "string", required: true },
      defaultValue: "normal",
      default: "normal",
      control: {
        type: "select",
        options: ["mini", "normal"]
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyButton },
  template: `<my-button @on-click="onClick" v-bind="$props" >Button</my-button>`,
  methods: { onClick: action("clicked") }
});

export const primary = Template.bind({});
primary.args = {
  type: "primary"
};

export const event = Template.bind({});
event.args = {
  type: "success"
};
