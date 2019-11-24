export default function renderFoot(h, slotFoot) {
  return h("tfoot", [h("div", { class: "sm-table-foot" }, slotFoot)]);
}
