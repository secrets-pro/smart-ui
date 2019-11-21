<template>
  <div class="sm-input-wrapper">
    <span class="input-suffix" v-if="$slots.suffix">
      <slot name="suffix" />
    </span>
    <input
      ref="input"
      :readonly="readonly"
      :value="currentValue"
      :class="{ 'sm-input': true, 'width-suffix': !!$slots.suffix }"
      @input="input"
      @focus="focus"
    />
  </div>
</template>
<script>
export default {
  name: "sm-input",
  props: {
    value: [String, Number],
    readonly: Boolean
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    value(n) {
      this.currentValue = n;
    }
  },
  methods: {
    focus() {
      this.$emit("on-focus");
    },
    input() {
      this.$emit("input", this.$refs.input.value);
    }
  }
};
</script>
