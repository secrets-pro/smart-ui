import DropDown from "./components/DropDown";
import Input from "./components/Input";
import Select from "./components/Select";
import Icon from "./components/Icon";

const components = {
  DropDown,
  Input,
  Select,
  Icon
};
function install(Vue) {
  Object.keys(components).forEach(key => {
    components[key].install && components[key].install(Vue);
  });
}
if (window && window.Vue) install(window.Vue);
export default {
  ...components,
  install
};
