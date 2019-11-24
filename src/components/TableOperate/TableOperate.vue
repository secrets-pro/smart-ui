<template>
  <sm-dropdown placement="left" :styles="{ minWidth: '140px' }" @on-click="chooseItem">
    <sm-icon type="more_vert" v-if="!buttonText && !!setting.some(this.filter)" />
    <sm-button type="default" v-if="buttonText">{{ buttonText }}</sm-button>
    <template slot="content">
      <sm-dropdown-item
        :name="item.name"
        :type="item.type"
        v-for="(item, index) in setting.filter(this.filter)"
        :key="index"
      >
        <sm-icon :type="item.icon" v-if="item.icon" />
        {{ item.text }}
      </sm-dropdown-item>
    </template>
  </sm-dropdown>
</template>
<script>
import Icon from "../Icon/Icon.vue";
import DropDown from "../DropDown/DropDown.vue";
import DropDownItem from "../DropDown/DropDownItem.js";
export default {
  name: "sm-table-operate",
  components: {
    "sm-icon": Icon,
    "sm-dropdown": DropDown,
    "sm-dropdown-item": DropDownItem
  },
  props: {
    setting: Array,
    buttonText: String
  },
  data() {
    return {};
  },
  methods: {
    chooseItem(name) {
      this.$emit("on-click", name);
    },
    filter(el) {
      if (!el || !el.name) {
        return false;
      }
      if (!el.auth) {
        return true;
      }
      return this.$auth(...el.auth);
    }
  }
};
</script>
