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
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    value(n, o) {
      this.currentValue = n;
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
        if (!this.currentValue.includes(name)) {
          let nv = [...this.currentValue, name];
          this.currentValue = nv;
          this.$emit("input", nv);
        }
      } else {
        let indx = this.currentValue.indexOf(name);
        if (indx > -1) {
          this.currentValue.splice(indx, 1);
          this.$emit("input", this.currentValue);
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
