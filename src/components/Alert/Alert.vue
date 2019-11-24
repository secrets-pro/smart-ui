<template>
  <div class="sm-alert" :class="'sm-alert-' + type">
    <span class="sm-alert-icon">
      <sm-img-icon :name="type" size="18"></sm-img-icon>
    </span>
    <div class="sm-alert-content">
      <slot>&nbsp;</slot>
    </div>
  </div>
</template>
<script>
import ImageIcon from "../Icon/ImageIcon.vue";
export default {
  name: "sm-alert",
  components: {
    "sm-img-icon": ImageIcon
  },
  props: {
    type: {
      type: String,
      default() {
        return "info";
      }
    }
  }
};
</script>
