<template>
  <transition name="fade">
    <div :class="classes" v-if="fullscreenVisible">
      <div :class="mainClasses">
        <span :class="dotClasses"></span>
        <div :class="textClasses">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import ScrollbarMixins from "../../utils/mixins-scrollbar";

const prefixCls = "sm-spin";

export default {
  name: "sm-spin",
  mixins: [ScrollbarMixins],
  props: {
    size: {
      type: String,
      default() {
        return "default";
      }
    },
    fix: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showText: false,
      // used for $Spin
      visible: false
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-fix`]: this.fix,
          [`${prefixCls}-show-text`]: this.showText,
          [`${prefixCls}-fullscreen`]: this.fullscreen
        }
      ];
    },
    mainClasses() {
      return `${prefixCls}-main`;
    },
    dotClasses() {
      return `${prefixCls}-dot`;
    },
    textClasses() {
      return `${prefixCls}-text`;
    },
    fullscreenVisible() {
      if (this.fullscreen) {
        return this.visible;
      } else {
        return true;
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.addScrollEffect();
      } else {
        this.removeScrollEffect();
      }
    }
  },
  mounted() {
    this.showText = this.$slots.default !== undefined;
  }
};
</script>
