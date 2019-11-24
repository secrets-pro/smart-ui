import Button from "./Button";
import ButtonGroup from "./ButtonGroup";

Button.install = function(Vue) {
  Vue.component(Button.name, Button);
  Vue.component(ButtonGroup.name, ButtonGroup);
};

export default Button;
