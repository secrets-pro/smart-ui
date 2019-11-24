import Checkbox from "./Checkbox.vue";
import CheckboxGroup from "./CheckboxGroup.js";

Checkbox.install = function(Vue) {
  Vue.component(Checkbox.name, Checkbox);
  Vue.component(CheckboxGroup.name, CheckboxGroup);
};
export default Checkbox;
