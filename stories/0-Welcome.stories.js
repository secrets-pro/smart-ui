export default {
  title: "Welcome"
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: "<div> <h1>Welcome</h1></div>"
});
export const Welcome = Template.bind({});
