/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
import smui from "@/";
const { DropDown } = smui;
describe("DropDown", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(DropDown);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
