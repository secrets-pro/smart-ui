/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
// import sinon from "sinon";

import smui from "@/";
const { Checkbox } = smui;
describe("Checkbox", () => {
  let wrapper = mount(Checkbox, {
    propsData: {
      value: true
    }
  });
  test("props", () => {
    expect(wrapper.props().value).toBe(true);
    expect(wrapper.vm.checkStatus).toBe(true);
    wrapper.setProps({
      value: false
    });
    expect(wrapper.vm.currentValue).toBe(false);
    expect(wrapper.vm.checkStatus).toBe(false);
  });
});
