export default {
  name: "sm-option",
  inject: ["SmSelect"],
  props: {
    value: [String, Number],
    label: String
  },
  render(h) {
    var that = this;
    const currentSelected = this.$parent.value === this.value;
    let slots = [this.label || this.$slots.default];
    const classes = {
      "sm-dropdown-item": true,
      selected: currentSelected
    };
    return h(
      "li",
      {
        class: classes,

        on: {
          click(event) {
            let text = that.label || that.$slots.default[0].text;
            that.SmSelect.click(that.value, text);
            event.stopPropagation();
          }
        }
      },
      slots
    );
  }
};
