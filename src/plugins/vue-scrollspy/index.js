import ScrollSpyNav from "./ScrollSpyNav";
import throttle from "lodash/throttle";
const assert = require("assert").strict;

const install = (Vue, option) => {
  let opt = {
    offset: 0.25,
    throttle: 500,
    maxLevel: 3
  };
  Object.assign(opt, option);

  Vue.component("scrollspy-nav", ScrollSpyNav);

  Vue.directive("scrollspy", {
    bind(el, binding) {
      assert(el.scrollspy === undefined);
      el.scrollspy = {
        scrollHandler: throttle(() => {
          let t = el.scrollspy;
          if (t && t.headers && t.headers.length > 0) {
            /*eslint no-constant-condition: "off"*/
            while (1) {
              let preY = null,
                postY = null;
              if (t.scrolli - 1 >= 0)
                preY = document
                  .getElementById(t.headers[t.scrolli - 1].id)
                  .getBoundingClientRect().top;
              if (t.scrolli + 1 < t.headers.length)
                postY = document
                  .getElementById(t.headers[t.scrolli + 1].id)
                  .getBoundingClientRect().top;

              const h =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight;

              if (preY && preY >= h * opt.offset) t.scrolli -= 1;
              else if (postY && postY <= h * opt.offset) t.scrolli += 1;
              else break;
            }
            binding.value({
              headers: t.headers,
              scrolli: t.scrolli
            });
            // if (t.scrolli >= 0) console.log(t.headers[t.scrolli].id);
          }
        }, opt.throttle),
        headers: [],
        scrolli: -1
      };
      window.addEventListener("scroll", el.scrollspy.scrollHandler);
    },
    unbind(el) {
      window.removeEventListener("scroll", el.scrollspy.scrollHandler);
      el.scrollspy = undefined;
    },
    componentUpdated(el, binding) {
      el.scrollspy.headers = [];
      const hdr = [...el.querySelectorAll("h1, h2, h3, h4, h5, h6")];
      let minlv = 10;
      hdr.forEach(e => {
        minlv = Math.min(minlv, parseInt(e.tagName[1], 10));
      });
      hdr.forEach(e => {
        assert(e.id, "id not found on element");
        const lv = parseInt(e.tagName[1], 10) - minlv;
        if (lv < opt.maxLevel)
          el.scrollspy.headers.push({
            level: lv,
            id: e.id,
            to: "#" + e.id,
            name: e.innerText
          });
      });
      el.scrollspy.scrolli = -1;
      binding.value({
        headers: el.scrollspy.headers,
        scrolli: el.scrollspy.scrolli
      });
    }
  });
};
export default install;
