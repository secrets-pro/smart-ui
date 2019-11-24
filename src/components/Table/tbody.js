function renderStyle(styles) {
  if (!styles) {
    return {};
  }
  if (typeof styles === "function") {
    let re = styles();
    return re;
  } else if (typeof styles === "object") {
    return styles;
  } else {
    return {};
  }
}
export default {
  name: "sm-tbody",
  props: {
    columns: Array,
    data: Array,
    height: String,
    settingCloumns: Array
  },
  render(h) {
    let parent = this.$parent;
    let children = this.data.map((el, index) => {
      let tds = [];
      this.columns.forEach(col => {
        let result;
        let type = col.type;
        if (col.render) {
          col.render.bind(this);
          let prams = JSON.parse(JSON.stringify(col));
          prams.row = el;
          result = col.render(h, prams);
        } else if (type) {
          if (type == "checkbox") {
            result = h("sm-checkbox", {
              props: {
                value: el.checked
              },
              on: {
                "on-change": checked => {
                  el.checked = checked;
                  parent && parent.changeItem(index, checked);
                }
              }
            });
          } else if (type === "index") {
            result = h("span", index + 1);
          }
        } else {
          if (col.ellipsis) {
            result = h(
              "div",
              {
                class: "ellipsis"
              },
              [
                h("Tooltip", {
                  content: el[col.key] || "-"
                })
              ]
            );
          } else {
            result = el[col.key] || "-";
          }
        }
        let { textAlign, dymic, key, className, styles } = col;

        if (dymic) {
          if (this.settingCloumns && this.settingCloumns.includes(key)) {
            tds.push(
              h(
                "td",

                {
                  style: Object.assign({ textAlign }, renderStyle(styles))
                },
                [result]
              )
            );
          }
        } else {
          tds.push(
            h(
              "td",

              {
                class: [className],

                style: Object.assign({ textAlign }, renderStyle(styles))
              },
              [result]
            )
          );
        }
      });
      return h("tr", tds);
    });

    return h(
      "tbody",
      {
        style: {
          maxHeight: this.height
        }
      },
      children
    );
  }
};
