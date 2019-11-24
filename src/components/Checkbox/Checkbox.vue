<template>
  <label
    class="checkbox checkbox-wrapper"
    :class="{
      checked: checkStatus,
      indeterminate: checkStatus ? false : indeterminate
    }"
  >
    <input type="checkbox" ref="checkbox" :value="name" :checked="checkStatus" @input="input" />
    <slot />
  </label>
</template>
<script>
export default {
  //inject: ["provide"],
  name: "sm-checkbox",
  props: {
    value: [Boolean, String, Number],
    trueValue: [String, Number],
    falseValue: [String, Number],
    name: String,
    indeterminate: Boolean
  },
  data() {
    return {
      currentValue: this.value,
      checkStatus: this.trueValue ? this.trueValue === this.value : this.value,
      group: false
    };
  },
  watch: {
    value(n) {
      this.currentValue = n;
      this.checkStatus = this.trueValue ? this.trueValue === n : n;
    }
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      let parent = this.$parent;

      if (
        parent &&
        parent.value &&
        (parent.$options._componentTag === "sm-checkbox-group" ||
          parent._provided.boxGroup)
      ) {
        this.group = true;
        let data = parent.value.includes(this.name);
        this.currentValue = data;
        this.checkStatus = this.currentValue;
      }
    },
    input() {
      if (this.trueValue) {
        this.checkStatus = !this.checkStatus;
        this.$emit(
          "input",
          this.checkStatus ? this.trueValue : this.falseValue
        );
        this.$emit(
          "on-change",
          this.checkStatus ? this.trueValue : this.falseValue
        );
      } else {
        this.currentValue = !this.currentValue;
        this.$emit("input", this.currentValue);
        this.$emit("on-change", this.currentValue);
      }

      // if (this.indeterminate) {
      //   this.indeterminate = false;
      // }
      if (this.group) {
        let parent = this.$parent;
        parent.change({
          name: this.name,
          value: this.currentValue
        });
      }
    }
  }
};
</script>
