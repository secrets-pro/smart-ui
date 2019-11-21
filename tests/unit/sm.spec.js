/* eslint-disable no-undef */
// import { mount } from "@vue/test-utils";
import smui from "@/";
import Vue from "vue";
describe("sm-ui", () => {
  test("esm install", () => {
    Vue.use(smui);
    let vm = new Vue({
      render(h) {
        return h("sm-icon", {
          props: {
            type: "ios-add"
          }
        });
      }
    });
    expect(vm instanceof Vue).toBe(true);
  });
});
