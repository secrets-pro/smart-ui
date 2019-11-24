export default function renderCol(h, columns, settingCloumns) {
  let child = [];
  for (let cur of columns) {
    if (cur.type) {
      child.push(
        h("col", {
          style: {
            width: "60px"
          }
        })
      );
    } else {
      if (cur.dymic) {
        if (settingCloumns && settingCloumns.includes(cur.key)) {
          let width = cur.width ? cur.width + "px" : "auto"; //100 / columns.length + "%";
          child.push(
            h("col", {
              style: {
                width
              }
            })
          );
        }
      } else {
        let width = cur.width ? cur.width + "px" : "auto"; //100 / columns.length + "%";
        child.push(
          h("col", {
            style: {
              width
            }
          })
        );
      }
    }
  }
  return h("colgroup", child);
}
