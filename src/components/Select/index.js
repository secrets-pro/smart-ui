import Select from "./Select.vue";
import Option from "./Option.js";

Select.install = function(Vue) {
  Vue.component(Select.name, Select);
  Vue.component(Option.name, Option);
};
export default Select;
