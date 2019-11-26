import TableOperate from "./TableOperate.vue";
import TableFilter from "./TableFilter.vue";

TableOperate.install = function(Vue) {
  Vue.component(TableOperate.name, TableOperate);
  Vue.component(TableFilter.name, TableFilter);
};
export default TableOperate;
