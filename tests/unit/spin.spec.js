/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
// import sinon from "sinon";

import smui from "@/";
const { Spin } = smui;
describe("Spin", () => {
  let wrapper = mount(Spin, {
    attachToDocument: true,
    propsData: {}
  });
  test("props", () => {
    expect(wrapper.vm.visible).toBe(false);
    Spin.show();
    Spin.hide();
  });
});
