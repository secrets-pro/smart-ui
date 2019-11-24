import thead from "./thead";
import tbody from "./tbody";
import colgroup from "./colgroup";

export default {
  name: "sm-table-body",
  props: {
    fixed: Boolean,
    columns: Array,
    height: String,
    data: Array,
    selectAll: Boolean,
    settingCloumns: Array
  },
  data() {
    return {
      currentData: JSON.parse(JSON.stringify(this.data)),
      indeterminate: false,
      checkedAll: false
    };
  },
  methods: {
    checkAll(value) {
      this.currentData.forEach(element => {
        element.checked = value;
      });
      this.checkedAll = value;
      this.indeterminate = false;
      if (value) {
        this.$emit("on-choosed-item", true);
      } else {
        this.$emit("on-choosed-item", false);
      }
    },
    changeItem() {
      let all = this.currentData.length;
      let checked = this.currentData.filter(el => el.checked).length;
      if (checked === 0) {
        this.indeterminate = false;
        this.checkedAll = false;
      } else if (all != checked) {
        this.indeterminate = true;
        this.checkedAll = false;
      } else if (all === checked) {
        this.indeterminate = false;
        this.checkedAll = true;
      } else {
        this.indeterminate = false;
      }
      if (this.indeterminate || this.checkedAll) {
        this.$emit("on-choosed-item", true);
      } else {
        this.$emit("on-choosed-item", false);
      }
    },
    getChecked() {
      return this.currentData.filter(el => el.checked).map(el => el._index);
    },
    transform() {
      this.currentData = this.currentData.map((ele, index) => {
        return {
          ...ele,
          _index: index,
          checked: false
        };
      });
    }
  },
  watch: {
    data(n) {
      //console.log("watch", n);
      this.currentData = JSON.parse(JSON.stringify(n));
      this.transform();
    }
  },
  created() {
    // console.log("created", this.data);

    this.transform();
  },
  components: {
    "sm-tbody": tbody,
    "sm-thead": thead
  },
  mounted() {
    //console.log("mounted", this.data);
  },
  render(h) {
    // console.log("render", this.currentData);
    let theadContent = h("sm-thead", {
      props: {
        columns: this.columns,
        indeterminate: this.indeterminate,
        checked: this.checkedAll,
        settingCloumns: this.settingCloumns,
        selectAll: this.selectAll
      },
      on: {
        "on-sort": (key, type) => {
          this.currentData = this.currentData.sort((el1, el2) => {
            return type === "up"
              ? el1[key] < el2[key]
                ? -1
                : 1
              : el1[key] > el2[key]
              ? -1
              : 1;
          });
        }
      }
    });
    let bodyContent = h("sm-tbody", {
      props: {
        columns: this.columns,
        data: this.currentData,
        height: this.height,
        settingCloumns: this.settingCloumns
      }
    });
    let content = [
      colgroup(h, this.columns, this.settingCloumns),
      theadContent,
      bodyContent
    ];
    // if (this.$slots.default) {
    //   content.push(tfoot(h, this.$slots.default));
    // }
    return h(
      "table",
      {
        class: { "sm-table": true, fixed: this.fixed },
        on: {
          "check-all": () => {
            this.checkAll();
          }
        }
      },
      content
    );
  }
};
