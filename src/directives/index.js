/**
 *  自定义指令
 *  */
import Ripple from "./ripple/index";
import clickout from "./clickout/index";
import scroll from "./scroll/index";

const directives = [Ripple, clickout, scroll];
export default {
  install(Vue) {
    directives.forEach(el => {
      Vue.directive(el.name, el);
    });
  }
};
