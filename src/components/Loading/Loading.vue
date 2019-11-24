<template>
  <svg
    :style="styles"
    class="spinner spinner--"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      class="path"
      fill="none"
      stroke-width="4"
      stroke-linecap="round"
      cx="33"
      cy="33"
      r="30"
    />
  </svg>
</template>
<script>
export default {
  name: "sm-loading",
  props: {
    size: {
      default: 40
    }
  },
  computed: {
    styles() {
      return {
        width: this.size + "px",
        height: this.size + "px"
      };
    }
  }
};
</script>
<style lang="less" scoped>
.spinner {
  animation: -rotator 1.4s linear infinite;
}
.spinner * {
  line-height: 0;
  box-sizing: border-box;
}

@keyframes -rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
.path {
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: -dash 1.4s ease-in-out infinite, -colors 5.6s ease-in-out infinite;
}

@keyframes -colors {
  0% {
    stroke: #35495e;
  }
  25% {
    stroke: #de3e35;
  }
  50% {
    stroke: #f7c223;
  }
  75% {
    stroke: #41b883;
  }
  100% {
    stroke: #35495e;
  }
}
@keyframes -dash {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
}
</style>
