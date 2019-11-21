import component from "./Input.vue";
component.install = function(Vue) {
  Vue.component(component.name, component);
};
export default component;
