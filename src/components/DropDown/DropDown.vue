<template>
  <div class="sm-dropdown" v-click-out="clickout">
    <div ref="triggerEle" class="dropdrow-trigger" @click="press">
      <slot />
    </div>
    <transition name="transition-drop">
      <div
        class="sm-dropdown-content"
        ref="content"
        :style="styles"
        :class="placement"
        v-if="active"
      >
        <ul
          :class="theme"
          class="sm-dropdown-content-ul no-scroll"
          v-if="$slots.content"
        >
          <slot name="content"></slot>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
import { getOffset } from "../../utils/index";
import clickout from "../../directives/clickout/index";

export default {
  name: "sm-dropdown",
  inheritAttrs: false,
  directives: {
    "click-out": clickout
  },
  props: {
    placement: {
      type: String,
      default: "left"
    },
    styles: Object,
    theme: String,
    trigger: {
      type: String,
      default() {
        return "click";
      }
    }
  },
  provide() {
    return {
      SmDropdown: this
    };
  },
  methods: {
    show() {
      this.active = true;
      this.press();
    },
    press() {
      if (this.trigger === "click") {
        this.active = !this.active;
      }
      if (this.active) {
        // 动态计算位置 防止坠入深渊
        this.$nextTick(() => {
          let el = this.$refs.content;
          if (!el) {
            return;
          }
          let h1 = document.body.clientHeight - getOffset(el).boxTop;
          let h2 = el.clientHeight;

          if (h1 < h2) {
            el.style.bottom = 0;
          }
        });
      }
    },
    click(name, text) {
      this.clickout();
      if (typeof name === "object") {
        return;
      }
      this.$emit("on-click", name, text);
    },
    clickout() {
      this.active = false;
      this.$emit("on-cancel");
    }
  },
  data() {
    return {
      active: false
    };
  },
  mounted() {}
};
</script>
