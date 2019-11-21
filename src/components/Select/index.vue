<template>
  <sm-dropdown
    ref="dropdown"
    trigger="custom"
    class="sm-select"
    :styles="{ width: '100%' }"
    @on-click="clickDropdown"
    @on-cancel="cancel"
  >
    <sm-input
      :placeholder="placeholder"
      :clearable="clearable"
      v-model="currentText"
      ref="input"
      @on-clear="clear"
      @on-focus="focus"
      readonly
    >
      <Icon
        @click="Iconfocus"
        type="ios-arrow-up"
        slot="suffix"
        :class="{ active }"
      />
    </sm-input>
    <template slot="content" v-if="options && options.length">
      <sm-dropdown-item
        :name="item[propValue]"
        v-for="(item, index) in options"
        :selected="currentValue === item[propValue]"
        :key="index"
        >{{ item[propText] }}</sm-dropdown-item
      >
    </template>
    <template slot="content" v-else>
      <div style="text-align:center;color:#627382;">暂无匹配数据</div>
    </template>
  </sm-dropdown>
</template>
<script>
import Input from "../Input/Input.vue";
import Icon from "../Icon/Icon.vue";
import DropDown from "../DropDown/DropDown";
import DropDownItem from "../DropDown/DropDownItem";

export default {
  name: "sm-select",
  components: {
    "sm-input": Input,
    Icon,
    "sm-dropdown": DropDown,
    "sm-dropdown-item": DropDownItem
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
    options: Array,
    propValue: {
      type: String,
      default() {
        return "value";
      }
    },
    propText: {
      type: String,
      default() {
        return "text";
      }
    }
  },
  watch: {
    value(n) {
      this.currentValue = n;
      this.currentText = this.findText(n);
    }
  },
  data() {
    return {
      active: false,

      currentText: this.findText(this.value),
      currentValue: this.value
    };
  },
  methods: {
    findText(value) {
      if (this.options && this.options.length) {
        let result = this.options.find(el => el[this.propValue] === value);
        if (result) {
          return result[this.propText];
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    // 触发change事件
    clickDropdown(value, text) {
      if (this.currentValue != value) {
        this.currentValue = value;
        this.currentText = text;
        this.$emit("input", value);
        this.$emit("on-change", value);
        //this.dispatch("FormItem", "on-form-change", this.publicValue);
      }
    },
    // 清空数据
    clear() {
      this.clickDropdown(null);
    },
    Iconfocus() {
      if (!this.active) {
        this.active = true;
        this.$refs.dropdown.show();
      } else {
        this.active = false;
        this.$refs.dropdown.clickout();
      }
    },
    focus() {
      this.active = true;
      this.$refs.dropdown.show();
    },
    cancel() {
      this.active = false;
    }
  }
};
</script>
