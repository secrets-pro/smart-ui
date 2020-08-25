const svgs = require("./svg");
var fs = require("fs");
const names = [];
function generageSvgs() {
  const svgArrag = svgs.split("[split]");
  var reg = /[^\=\"\"]+(?=\")/g;
  for (let s of svgArrag) {
    s = s.trim();
    if (s) {
      let id = s.match(reg)[0];
      names.push(`<i class="leo leo-${id}"></i>`);
      write(id, s);
    }
  }
  write("0svg", JSON.stringify(names));
}

function write(id, content) {
  fs.writeFile(`./svgs/${id}.svg`, content, function(error) {
    if (error) {
    } else {
    }
  });
}
generageSvgs();
