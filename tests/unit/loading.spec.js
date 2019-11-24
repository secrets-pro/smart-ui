/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
// import sinon from "sinon";

import smui from "@/";
const { Loading } = smui;
describe("Loading", () => {
  let wrapper = mount(Loading, {});
  test("props", () => {
    expect(wrapper.vm.size).toBe(40);
  });
});
