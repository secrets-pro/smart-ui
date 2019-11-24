<template>
  <sm-dropdown placement="center" @on-click="chooseItem" :styles="{ width: '160px' }">
    <slot />
    <sm-icon type="expand_more" />
    <template slot="content">
      <sm-dropdown-item :name="item.name" v-for="(item, index) in setting" :key="index">
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
  name: "sm-table-filter",
  props: {
    setting: Array
  },
  data() {
    return {};
  },
  methods: {
    chooseItem(name) {
      this.$emit("on-click", name);
    }
  },
  components: {
    "sm-icon": Icon,
    "sm-dropdown": DropDown,
    "sm-dropdown-item": DropDownItem
  }
};
</script>
<style lang="less" scoped>
.sm-dropdown-content-ul {
  min-width: 100px;
}
</style>
