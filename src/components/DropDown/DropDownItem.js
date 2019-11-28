export default {
  inject: ["SmDropdown"],
  name: "sm-dropdown-item",
  props: {
    name: String,
    type: String,
    selected: {
      type: Boolean
    }
  },
  watch: {
    selected(n) {
      this.currentSelected = n;
    }
  },
  data() {
    return {
      currentSelected: this.selected
    };
  },
  render(h) {
    var that = this;
    let slots = [this.$slots.default];
    return h(
      "li",
      {
        class: {
          "sm-dropdown-item": true,
          selected: this.currentSelected,
          type: this.type
        },

        on: {
          click(event) {
            if (!that.type) {
              let text = that.$slots.default[0].text;
              that.SmDropdown.click(that.name, text);
              event.stopPropagation();
            }
          }
        }
      },
      slots
    );
  }
};
