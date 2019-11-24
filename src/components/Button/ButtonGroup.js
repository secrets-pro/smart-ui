export default {
  name: "sm-button-group",
  provide() {
    return {
      ButtonGroup: this
    };
  },
  render(h) {
    return h(
      "div",
      {
        class: "button-group"
      },
      this.$slots.default
    );
  }
};
