import DropDownItem from "./DropDownItem.js";
import DropDown from "./DropDown.vue";

DropDown.install = function(Vue) {
  Vue.component(DropDown.name, DropDown);
  Vue.component(DropDownItem.name, DropDownItem);
};

export default DropDown;
