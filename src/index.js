import DropDown from "./components/DropDown";
import Input from "./components/Input";
import Select from "./components/Select";
import Icon from "./components/Icon";
import Button from "./components/Button";
import Table from "./components/Table";
import TableOperate from "./components/TableOperate";
import TableSearch from "./components/TableSearch";
import Checkbox from "./components/Checkbox";
import StatusIcon from "./components/StatusIcon";
import Alert from "./components/Alert";
import Breadcrumb from "./components/Breadcrumb";
import Label from "./components/Label";
import Loading from "./components/Loading";
import Pagination from "./components/Pagination";
import Spin from "./components/Spin";

import directives from "./directives";
const components = {
  Alert,
  Breadcrumb,
  Button,
  DropDown,
  Input,
  Select,
  Icon,
  Label,
  Pagination,
  Loading,
  Checkbox,
  Table,
  TableSearch,
  TableOperate,
  StatusIcon,
  Spin
};
function install(Vue) {
  Vue.use(directives);
  Object.keys(components).forEach(key => {
    components[key].install && components[key].install(Vue);
  });
}
if (window && window.Vue) install(window.Vue);
export default {
  ...components,
  install
};
