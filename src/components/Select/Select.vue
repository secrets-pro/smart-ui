<template>
  <div class="sm-select sm-dropdown" v-click-out="clickout">
    <div ref="triggerEle" class="dropdrow-trigger">
      <sm-input
        :placeholder="placeholder"
        :clearable="clearable"
        v-model="currentText"
        ref="input"
        @on-clear="clear"
        @on-focus="focus"
        readonly
      >
        <Icon @click="Iconfocus" type="ios-arrow-up" slot="suffix" :class="{ active }" />
      </sm-input>
    </div>
    <transition name="transition-drop">
      <div class="sm-dropdown-content" ref="content" :class="placement" v-if="active">
        <ul :class="theme" class="sm-dropdown-content-ul no-scroll">
          <slot ref="children">
            <div style="text-align:center;color:#627382;">暂无匹配数据</div>
          </slot>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
// import { getOffset } from "../../utils/index";
import clickout from "../../directives/clickout/index";
import Input from "../Input/Input.vue";
import Icon from "../Icon/Icon.vue";

export default {
  name: "sm-select",
  provide() {
    return {
      SmSelect: this
    };
  },
  components: {
    "sm-input": Input,
    Icon
  },
  directives: {
    "click-out": clickout
  },
  props: {
    placeholder: {
      type: String,
      default() {
        return "请选择";
      }
    },
    clearable: Boolean,
    value: [String, Number],

    placement: {
      type: String,
      default: "left"
    },
    theme: String
  },

  watch: {
    value(n) {
      this.currentValue = n;
      this.currentText = this.findText(n);
    }
  },
  methods: {
    click(value, text) {
      this.clickout();
      if (typeof value === "object") {
        return;
      }
      this.clickDropdown(value, text);
    },
    clickout() {
      this.active = false;
      this.$emit("on-cancel");
    },
    findText(value) {
      let text = "";
      this.$slots.default.some(el => {
        if (el.componentOptions) {
          const propsData = el.componentOptions.propsData;
          if (propsData.value === value) {
            text = propsData.label || el.componentOptions.children[0].text;
            return true;
          }
        }
      });
      return text;
    },
    // 触发change事件
    clickDropdown(value, text) {
      if (this.currentValue != value) {
        this.currentValue = value;
        this.currentText = text;
        this.$emit("input", value, text);
        this.$emit("on-change", value, text);
        //this.dispatch("FormItem", "on-form-change", this.publicValue);
      }
    },
    // 清空数据
    clear() {
      this.clickDropdown(null);
    },
    Iconfocus() {
      this.active = !this.active;
    },
    focus() {
      this.active = true;
    }
  },
  data() {
    return {
      active: false,
      currentText: this.findText(this.value),
      currentValue: this.value
    };
  },
  mounted() {}
};
</script>
