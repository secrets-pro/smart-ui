import { oneOf } from "../../utils";

export default {
  name: "sm-status",
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return oneOf(["success", "error", "warning"], value);
      }
    }
  },
  render(h) {
    return h("i", {
      class: {
        "sm-status": true,
        [this.type]: !!this.type
      }
    });
  }
};
