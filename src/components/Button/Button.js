import { getBtnStyle } from "../../utils/index";
import Icon from "../Icon/Icon.vue";
import ripple from "../../directives/ripple";
export default {
  //inject: ["ButtonGroup"],
  name: "sm-button",
  directives: {
    ripple
  },
  props: {
    type: {
      type: String,
      default() {
        return "default";
      }
    },
    label: Boolean,
    long: Boolean,
    circle: Boolean,
    icon: String,
    aftericon: String,
    to: String,
    size: String,
    disabled: Boolean,
    confirm: Boolean
  },
  watch: {
    disabled(n) {
      this.currentDisabled = n;
    }
  },
  data() {
    return {
      currentDisabled: this.disabled
    };
  },
  methods: {
    getBtnStyle,
    getClass(slots) {
      let classes = {
        button: true,
        "long-button": this.long,
        circle: this.circle,
        [`button-${this.size}`]: this.size,
        [`button-label-${this.type}`]: this.label,
        "button-icon": this.icon || this.aftericon ? slots.length > 1 : false
      };
      let result = {};
      if (!this.label) {
        result = this.getBtnStyle(1, this.type);
      }

      return Object.assign(classes, result);
    }
  },
  components: {
    "sm-icon": Icon
  },
  render(h) {
    let childrens = [];
    if (this.icon) {
      childrens.push(
        h("sm-icon", {
          props: { type: this.icon },
          class: "beforeicon"
        })
      );
    }
    this.$slots.default && childrens.push(h("span", this.$slots.default));
    if (this.aftericon) {
      childrens.push(
        h("sm-icon", {
          props: { type: this.aftericon },
          class: "aftericon"
        })
      );
    }
    let that = this;
    return h(
      "button",
      {
        class: this.getClass(childrens),
        attrs: {
          type: "button",
          disabled: this.currentDisabled
        },
        style: this.getBtnStyle(0, this.type),
        directives: [{ name: "ripple" }],
        on: {
          click(e) {
            if (that.to) {
              that.$router.push({ path: that.to });
              return;
            }
            if (that.confirm) {
              that.currentDisabled = true;
              setTimeout(() => {
                that.currentDisabled = false;
              }, 2000);
            }
            that.$emit("on-click", e);
          }
        }
      },
      childrens
    );
  }
};
