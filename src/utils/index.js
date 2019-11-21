export function getOffset(el) {
  if (!el) {
    return {};
  }
  const box = el.getBoundingClientRect();
  const body = document.body;
  const clientTop = el.clientTop || body.clientTop || 0;
  const clientLeft = el.clientLeft || body.clientLeft || 0;
  const scrollTop = window.pageYOffset || el.scrollTop;
  const scrollLeft = window.pageXOffset || el.scrollLeft;

  return {
    boxTop: box.top,
    top: box.top + scrollTop - clientTop,
    left: box.left + scrollLeft - clientLeft
  };
}
