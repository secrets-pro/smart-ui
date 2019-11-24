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

export function getScrollEventTarget(element) {
  let currentNode = element;
  while (
    currentNode &&
    currentNode.tagName !== "HTML" &&
    currentNode.nodeType === 1
  ) {
    const overflowY = window.getComputedStyle(currentNode).overflowY;
    if (overflowY === "scroll" || overflowY === "auto") {
      return currentNode;
    }
    currentNode = currentNode.parentNode;
  }
  return window;
}

export function getScrollTop(element) {
  if (element === window) {
    return Math.max(
      window.pageYOffset || 0,
      document.documentElement.scrollTop
    );
  } else {
    return element.scrollTop;
  }
}

export function transitionEnd(el, fun) {
  const arr = [
    "msTransitionEnd",
    "mozTransitionEnd",
    "oTransitionEnd",
    "webkitTransitionEnd",
    "transitionend"
  ];
  const handler = {
    handleEvent() {
      arr.forEach(function(eventName) {
        el.removeEventListener(eventName, handler, false);
      });
      fun.apply(el, arguments);
    }
  };
  arr.forEach(function(eventName) {
    el.addEventListener(eventName, handler, false);
  });
}

export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1)
    throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

export function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || "").split(" ");

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += " " + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(" ");
  var curClass = " " + el.className + " ";

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(" " + clsName + " ", " ");
      }
    }
  }
  if (!el.classList) {
    el.className = curClass ? curClass.trim() : curClass;
  }
}
/* istanbul ignore next */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();

export const types = [
  "primary",
  "success",
  "danger",
  "second",
  "info",
  "warning",
  "text",
  "error",
  "dark",
  "default"
];

export const btndelay = 1000; //按钮延时

export function oneOf(array, obj) {
  if (Array.isArray(array)) {
    return array.indexOf(obj) > -1;
  }
  return false;
}
// 根据type 返回是否是自定义的颜色
export function setBgClass(type) {
  let valid = oneOf(types, type);
  if (valid) {
    return {
      type: 1,
      value: {
        [`bg-${type}`]: true
      }
    };
  } else {
    return {
      type: 0,
      value: {
        "background-color": type
      }
    };
  }
}
export function setBtnBgClass(type) {
  let valid = oneOf(types, type);
  if (valid) {
    return {
      type: 1,
      value: {
        [`button-${type}`]: true
      }
    };
  } else {
    return {
      type: 0,
      value: {
        "background-color": type,
        border: "1px solid " + type
      }
    };
  }
}
export function getStyle(category, type) {
  let result = setBgClass(type);
  if (result.type === category) {
    return result.value;
  }
  return "";
}
export function getBtnStyle(category, type) {
  let result = setBtnBgClass(type);
  if (result.type === category) {
    return result.value;
  }
  return "";
}
export function offset(curEle) {
  var totalLeft = null,
    totalTop = null,
    par = curEle.offsetParent;
  //首先加自己本身的左偏移和上偏移
  totalLeft += curEle.offsetLeft;
  totalTop += curEle.offsetTop;
  //只要没有找到body，我们就把父级参照物的边框和偏移也进行累加
  while (par) {
    if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
      //累加父级参照物的边框
      totalLeft += par.clientLeft;
      totalTop += par.clientTop;
    }

    //累加父级参照物本身的偏移
    totalLeft += par.offsetLeft;
    totalTop += par.offsetTop;
    par = par.offsetParent;
  }

  return {
    left: totalLeft,
    top: totalTop
  };
}

// 格式化json输出
export function jsonFormat(json, type) {
  if (typeof json === "object") {
    return JSON.stringify(json, null, type === "tab" ? "\t" : 4);
  }
  return json;
}
//向上找组件
export function lookParent(context, tagName) {
  let parent = context.$parent;
  while (parent && parent.$options._componentTag !== tagName) {
    parent = parent.$parent;
  }
  return parent;
}

export function formatUrl(url, params) {
  if (params) {
    for (let k in params) {
      url = url.replace(new RegExp("\\{" + k + "\\}", "g"), params[k]);
    }
  }
  return url;
}
export function hexToRgba(hex, opacity) {
  var RGBA =
    "rgba(" +
    parseInt("0x" + hex.slice(1, 3)) +
    "," +
    parseInt("0x" + hex.slice(3, 5)) +
    "," +
    parseInt("0x" + hex.slice(5, 7)) +
    "," +
    opacity +
    ")";
  let result = {
    red: parseInt("0x" + hex.slice(1, 3)),
    green: parseInt("0x" + hex.slice(3, 5)),
    blue: parseInt("0x" + hex.slice(5, 7)),
    rgba: RGBA
  };
  return result;
}

export function isEmpty(obj) {
  if (!obj) {
    return true;
  }
}
let cached;
export function getScrollBarSize(fresh) {
  if (fresh || cached === undefined) {
    const inner = document.createElement("div");
    inner.style.width = "100%";
    inner.style.height = "200px";

    const outer = document.createElement("div");
    const outerStyle = outer.style;

    outerStyle.position = "absolute";
    outerStyle.top = 0;
    outerStyle.left = 0;
    outerStyle.pointerEvents = "none";
    outerStyle.visibility = "hidden";
    outerStyle.width = "200px";
    outerStyle.height = "150px";
    outerStyle.overflow = "hidden";

    outer.appendChild(inner);

    document.body.appendChild(outer);

    const widthContained = inner.offsetWidth;
    outer.style.overflow = "scroll";
    let widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    cached = widthContained - widthScroll;
  }
  return cached;
}
