export default {
  name: "sm-checkbox-group",
  provide() {
    return {
      boxGroup: this
    };
  },
  props: {
    value: Array,
    default() {
      return [];
    }
  },
  watch: {
    value(n, o) {
      if (JSON.stringify(n) !== JSON.stringify(o)) {
        this.updateChild();
      }
    }
  },
  mounted() {
    this.updateChild();
  },
  methods: {
    change(params) {
      let { name, value } = params;
      if (value) {
        if (!this.value.includes(name)) {
          let nv = [...this.value, name];
          this.$emit("input", nv);
        }
      } else {
        let indx = this.value.indexOf(name);
        if (indx > -1) {
          this.value.splice(indx, 1);
          this.$emit("input", this.value);
        }
      }
    },
    updateChild() {
      let children = this.$children;
      children.forEach(el => {
        el.update();
      });
    }
  },
  render(h) {
    let checkboxes = this.$slots.default;

    return h(
      "div",
      {
        class: {
          "checkbox-group": true
        }
      },
      checkboxes
    );
  }
};
