<template>
  <svg @click="click" viewBox="0 0 24 24">
    <path
      fill-rule="evenodd"
      d="M13.4142136,12 L19.0710678,17.6568542 L17.6568542,19.0710678 L12,13.4142136 L6.34314575,19.0710678 L4.92893219,17.6568542 L10.5857864,12 L4.92893219,6.34314575 L6.34314575,4.92893219 L12,10.5857864 L17.6568542,4.92893219 L19.0710678,6.34314575 L13.4142136,12 Z"
      fill="currentColor"
    ></path>
  </svg>
</template>
<script>
export default {
  name: "clear",
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>
