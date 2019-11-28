<template>
  <!-- <img class="image-icons" :src="icon" :style="styles" /> -->
  <span class="image-icons" :style="styles"></span>
</template>
<script>
import info from "../../assets/svg/info.svg";
import success from "../../assets/svg/success.svg";
import error from "../../assets/svg/error.svg";
import warn from "../../assets/svg/warn.svg";
import back from "../../assets/svg/back.svg";

export default {
  name: "sm-img-icon",
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default() {
        return "24";
      }
    }
  },
  data() {
    return {
      types: {
        info,
        success,
        error,
        warn,
        back
      }
    };
  },
  computed: {
    styles() {
      return {
        height: this.size + "px",
        width: this.size + "px",
        background: "url(" + this.types[this.name] + ")",
        backgroundSize: "100% 100%"
      };
    }
  }
};
</script>
<style scoped>
.image-icons {
  vertical-align: middle;
  display: inline-block;
  background-color: #324558;
}
</style>
