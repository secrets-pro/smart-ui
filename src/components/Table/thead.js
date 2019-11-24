import TableFilter from "../TableOperate/TableFilter.vue";
function renderHead(h, columns, context) {
  let parent = context.$parent;
  let child = [];
  for (let cur of columns) {
    if (cur.type) {
      let ch;
      if (cur.type === "checkbox" && context.selectAll) {
        ch = h("sm-checkbox", {
          props: {
            value: context.checked,
            indeterminate: context.indeterminate
          },
          on: {
            "on-change": value => {
              parent.checkAll(value);
            }
          }
        });
      } else if (cur.type === "index") {
        ch = h("span", "序号");
      }
      child.push(
        h(
          "th",
          {
            class: {
              "sm-th": true
            }
          },
          [ch]
        )
      );
    } else {
      let { textAlign, sortable, dymic, key } = cur;
      let style = {
        textAlign
      };
      let trigger = cur.title;
      if (sortable) {
        trigger = [
          h(
            "TableFilter",
            {
              props: {
                setting: [
                  {
                    name: "up",
                    text: "升序",
                    icon: "arrow_upward"
                  },
                  {
                    name: "down",
                    text: "降序",
                    icon: "arrow_downward"
                  }
                ]
              },
              on: {
                "on-click": name => {
                  context.$emit("on-sort", cur.key, name);
                }
              }
            },
            cur.title
          )
        ];
      }
      if (dymic) {
        if (context.settingCloumns && context.settingCloumns.includes(key)) {
          child.push(
            h(
              "th",
              {
                class: {
                  "sm-th": true
                },
                style
              },
              [h("span", trigger)]
            )
          );
        }
      } else {
        child.push(
          h(
            "th",
            {
              class: {
                "sm-th": true
              },
              style
            },
            [h("span", trigger)]
          )
        );
      }
    }
  }
  return h("thead", child);
}
// export default function render(h, columns, context) {
//   return [renderCol(h, columns, context), renderHead(h, columns, context)];
// }
export default {
  name: "sm-thead",
  props: {
    columns: Array,
    indeterminate: Boolean,
    checked: Boolean,
    settingCloumns: Array
  },
  components: {
    TableFilter
  },
  render(h) {
    return renderHead(h, this.columns, this);
  }
};
